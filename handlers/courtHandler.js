// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray } = require('../lib/utils')
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

const { getArmyCost, dwonSizeArmy } = require('../models/army')

const { getCharacterById, getCourtByDwellingId } = require('../persistance').queries
const { personalityDealsWith, compabilityCheck, getChanceOfDowngrade } = require('../models/personality')
const m = require('../models/court')

const handleIncomeExpenses = async (dwelling) => {
    dwelling.happiness = Math.round(((( 100 / dwelling.taxRate ) * m.getGuardHappinessModifyer(dwelling.guards)) * dwelling.citizenTaxable ) * 100) / 100 

    let isOverSpending = false
    const costBaseMaintenanceGuards = Math.floor(dwelling.citizens * GUARD_COST_MAINTENANCE)
    const costGuards = Math.floor(costBaseMaintenanceGuards * GUARD_COST_MULTIPLYER * m.dwellingQualityMultiplyer(dwelling.guards))
    const costWalls= Math.floor((( dwelling.citizens * WALLS_COST_MULTIPLYER) + WALLS_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.walls))
    const costGate = Math.floor((( dwelling.citizens * GATE_COST_MULTIPLYER) + GATE_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.gate))
    const costMoat = Math.floor((( dwelling.citizens * MOAT_COST_MULTIPLYER) + MAOT_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.moats))

    let collectedTax = Math.floor( ( dwelling.citizens * dwelling.citizenTaxable ) * (dwelling.taxRate * 0.01) )
    const monthlyIncome = collectedTax // + trade
    // guards
    if (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costGuards) {
            collectedTax -= costGuards
        }
        else {
            collectedTax = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.guards = m.downgradeCondition(dwelling.guards) }
            else {
                isOverSpending = true
            }
        }
    }
    // walls
    if (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costWalls) {
            collectedTax -= costWalls
        }
        else {
            collectedTax = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.walls = m.downgradeCondition(dwelling.walls) }
            else {
                isOverSpending = true
            }
        }
    }
    // gate
    if (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costGate) {
            collectedTax -= costGate
        }
        else {
            collectedTax = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.gate = m.downgradeCondition(dwelling.gate) }
            else {
                isOverSpending = true
            }
        }
    }
    // moat
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costMoat) {
            collectedTax -= costMoat
        }
        else {
            collectedTax = 0
            if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) { dwelling.moats = m.downgradeCondition(dwelling.moats) }
            else {
                isOverSpending = true
            }
        }
    }

    // army
    const cost = getArmyCost(dwelling.army)
    if (collectedTax > cost) {
        collectedTax -= cost
    } else {
        collectedTax = 0
        if (chance(getChanceOfDowngrade(dwelling.court.ruler.personality))) 
        { 
            dwonSizeArmy(dwelling.army)
        } else {
            isOverSpending = true
        }
    }
    
    if (isOverSpending) {

    }


    dwelling.gold += collectedTax
    

}


module.exports = {
    handleIncomeExpenses
}