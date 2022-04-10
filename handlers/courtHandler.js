// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_COMMANDS,
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_OVERSPENDING_ACTION,
    ENUM_DWELLING_PRODUCTION_TYPE
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
    MAOT_COST_MAINTENANCE
} = require('../generic/statics')

const { getArmyCost, downSizeArmy } = require('../models/army')
const { checkOldAgeHealth } = require('../models/character')
const { getChanceOfDowngrade, dealWithOverSpending } = require('../models/personality')
const m = require('../models/court')

const {
    executeCommands
} = require('../persistance/commandQueue')
const { isWithinBudget } = require('../models/ruler')

const handleFood = async (dwelling) => {
    const foodProduced = m.foodFromProduction(dwelling)
    dwelling.food += foodProduced
    dwelling.food -= dwelling.citizens
    if (dwelling.food <= 0) {
        dwelling.food = 0
        dwelling.citizens -= ((dwelling.citizens * 0.01) * getRandomNumberInRange(1, 3))
    }
}

const handleIncome = async (dwelling) => {
    let income = 0
    dwelling.happiness = Math.round(((( 100 / dwelling.taxRate ) * m.getGuardHappinessModifyer(dwelling.guards)) * dwelling.citizenTaxable ) * 100) / 100 
    income = Math.floor( ( dwelling.citizens * dwelling.citizenTaxable ) * (dwelling.taxRate * 0.01) )
    income += m.incomeFromProduction(dwelling)
    dwelling.gold += income
}


const handleExpenses = async (dwelling) => {
    let isOverSpending = false
    let expense = 0
    const costBaseMaintenanceGuards = Math.floor(dwelling.citizens * GUARD_COST_MAINTENANCE)
    const costGuards = Math.floor(costBaseMaintenanceGuards * GUARD_COST_MULTIPLYER * m.dwellingQualityMultiplyer(dwelling.guards))
    const costWalls= Math.floor((( dwelling.citizens * WALLS_COST_MULTIPLYER) + WALLS_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.walls))
    const costGate = Math.floor((( dwelling.citizens * GATE_COST_MULTIPLYER) + GATE_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.gate))
    const costMoat = Math.floor((( dwelling.citizens * MOAT_COST_MULTIPLYER) + MAOT_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.moats))
    for (loan of dwelling.court.loans) {
        expense -= m.payLoans(dwelling, loan)
    }
    // guards
    if (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE) {
        if (expense >= costGuards) {
            expense -= costGuards
        }
        else {
            expense = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.guards = m.downgradeCondition(dwelling.guards) }
            else {
                isOverSpending = true
            }
        }
    }
    // walls
    if (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE) {
        if (expense >= costWalls) {
            expense -= costWalls
        }
        else {
            expense = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.walls = m.downgradeCondition(dwelling.walls) }
            else {
                isOverSpending = true
            }
        }
    }
    // gate
    if (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE) {
        if (expense >= costGate) {
            expense -= costGate
        }
        else {
            expense = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.gate = m.downgradeCondition(dwelling.gate) }
            else {
                isOverSpending = true
            }
        }
    }
    // moat
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE) {
        if (expense >= costMoat) {
            expense -= costMoat
        }
        else {
            expense = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.moats = m.downgradeCondition(dwelling.moats) }
            else {
                isOverSpending = true
            }
        }
    }

    // army
    const cost = getArmyCost(dwelling.army)
    if (expense > cost) {
        expense -= cost
    } else {
        expense = 0
        if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) 
        { 
            downSizeArmy(dwelling.army)
        } else {
            isOverSpending = true
        }
    }

    // overspending action
    if (isOverSpending) {
        const overspendingAction = dealWithOverSpending(dwelling.court.ruler.personality)
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY) { 

        }
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.INCREASE_TAX) { 
            dwelling.taxRate += getRandomNumberInRange(1,3)
        }
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN) { 
            const loan = m.takeLoan(
                dwelling.court.id,
                dwelling.court.rulerId,
                'MERCHANTS',
                dwelling
            )
            dwelling.court.loans.push(loan)
            dwelling.gold += loan.amount
        }
        if (overspendingAction == ENUM_OVERSPENDING_ACTION.RELIGIOUS_FUNDS) { 
            const loan = m.takeLoan(
                dwelling.court.id,
                dwelling.court.rulerId,
                'CHURCH',
                dwelling
            )
            dwelling.court.loans.push(loan)
            dwelling.gold += loan.amount
        }
        
    }
    dwelling.gold -= expense
}


const handleCourtOldAges = async (dwelling, currentDate) => {
    const commands = []
    try {
        const deceased = []
        const leaderDied = checkOldAgeHealth(dwelling.court.ruler, currentDate)
        for (let a of dwelling.court.advisors) {
            if (checkOldAgeHealth(a.character, currentDate)) {
                deceased.push(a.character.id)
                commands.push({ command: ENUM_COMMANDS.DELETECHARACTER, data: a.character.id })
            }
        }
    
        if (leaderDied) {
            commands.push({ command: ENUM_COMMANDS.DELETECHARACTER, data: dwelling.court.ruler.id })
            await m.replaceRuler(dwelling, currentDate)
        }
        if (deceased.count > 0) {
            const alive = dwelling.court.advisors.filter(a => a.isAlive == true)
            const died = dwelling.court.advisors.filter(a => a.isAlive == false)
            for (let deceacedAdvisor of died) {
                await m.replaceAdvisors(dwelling, deceacedAdvisor, alive, currentDate)
            }
            dwelling.court.advisors = alive
        }
        await executeCommands(commands)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'handleCourtOldAges'
        err.message = e.message                                                                                                                      
        logError(err)
    }
    
}

const handleBudget = (dwelling) => {

    if (isWithinBudget(dwelling)) {
        m.getOverBudgetAction(dwelling)
    }
    else {
        m.getUnderBudgetAction(dwelling)
    }

    

}


module.exports = {
    handleBudget,
    handleCourtOldAges,
    handleIncome,
    handleExpenses,
    handleFood
}