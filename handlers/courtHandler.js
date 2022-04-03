// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_OVERSPENDING_ACTION
} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray, 
    generateID} = require('../lib/utils')
const {
    GUARD_COST_MULTIPLYER,
    GATE_COST_MULTIPLYER,
    WALLS_COST_MULTIPLYER,
    MOAT_COST_MULTIPLYER,
    GUARD_COST_MAINTENANCE,
    WALLS_COST_MAINTENANCE,
    GATE_COST_MAINTENANCE,
    MAOT_COST_MAINTENANCE,
    CONDITION_NONE_MULTIPLYER,
    CONDITION_RUINED_MULTIPLYER,
    CONDITION_POOR_MULTIPLYER,
    CONDITION_GOOD_MULTIPLYER,
    CONDITION_PERFECT_MULTIPLYER
} = require('../generic/statics')

const { getArmyCost, downSizeArmy } = require('../models/army')

const { getCharacterById, getCourtByDwellingId } = require('../persistance').queries
const { personalityDealsWith, compabilityCheck, getChanceOfDowngrade, dealWithOverSpending } = require('../models/personality')
const m = require('../models/court')

const takeLoan = (courtId, rulerId, from, dwelling, balance) => {
    const l = copyObject(objects.loan)
    l.id = generateID()
    l.courtId = courtId
    l.rulerId = rulerId
    l.amount = Math.floor(  )
    l.from = from

    return l
}

const handleIncomeExpenses = async (dwelling) => {
    dwelling.happiness = Math.round(((( 100 / dwelling.taxRate ) * m.getGuardHappinessModifyer(dwelling.guards)) * dwelling.citizenTaxable ) * 100) / 100 

    let isOverSpending = false
    const costBaseMaintenanceGuards = Math.floor(dwelling.citizens * GUARD_COST_MAINTENANCE)
    const costGuards = Math.floor(costBaseMaintenanceGuards * GUARD_COST_MULTIPLYER * m.dwellingQualityMultiplyer(dwelling.guards))
    const costWalls= Math.floor((( dwelling.citizens * WALLS_COST_MULTIPLYER) + WALLS_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.walls))
    const costGate = Math.floor((( dwelling.citizens * GATE_COST_MULTIPLYER) + GATE_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.gate))
    const costMoat = Math.floor((( dwelling.citizens * MOAT_COST_MULTIPLYER) + MAOT_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.moats))

    let balance = Math.floor( ( dwelling.citizens * dwelling.citizenTaxable ) * (dwelling.taxRate * 0.01) )
    const monthlyIncome = balance // + trade
    // guards
    if (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE) {
        if (balance >= costGuards) {
            balance -= costGuards
        }
        else {
            balance = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.guards = m.downgradeCondition(dwelling.guards) }
            else {
                isOverSpending = true
            }
        }
    }
    // walls
    if (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE) {
        if (balance >= costWalls) {
            balance -= costWalls
        }
        else {
            balance = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.walls = m.downgradeCondition(dwelling.walls) }
            else {
                isOverSpending = true
            }
        }
    }
    // gate
    if (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE) {
        if (balance >= costGate) {
            balance -= costGate
        }
        else {
            balance = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.gate = m.downgradeCondition(dwelling.gate) }
            else {
                isOverSpending = true
            }
        }
    }
    // moat
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE) {
        if (balance >= costMoat) {
            balance -= costMoat
        }
        else {
            balance = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.moats = m.downgradeCondition(dwelling.moats) }
            else {
                isOverSpending = true
            }
        }
    }

    // army
    const cost = getArmyCost(dwelling.army)
    if (balance > cost) {
        balance -= cost
    } else {
        balance = 0
        if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) 
        { 
            downSizeArmy(dwelling.army)
        } else {
            isOverSpending = true
        }
    }
    
    if (isOverSpending) {
        const overspendingAction = dealWithOverSpending(dwelling.court.ruler.personality)
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY) { 

        }
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.INCREASE_TAX) { 
            dwelling.taxRate += getRandomNumberInRange(1,3)
        }
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN) { 
            const loan = takeLoan(
                dwelling.court.id,
                dwelling.court.rulerId,
                'MERCHANTS',
                dwelling
            )
            dwelling.court.loans.push(loan)
            dwelling.gold += loan.amount
        }
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.RELIGIOUS_FUNDS) { 
            const loan = takeLoan(
                dwelling.court.id,
                dwelling.court.rulerId,
                'CHURCH',
                dwelling
            )
            dwelling.court.loans.push(loan)
            dwelling.gold += loan.amount
        }
        
    }


    dwelling.gold += balance
}


module.exports = {
    handleIncomeExpenses,
    takeLoan
}