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

const { getCharacterById, getCourtByDwellingId } = require('../persistance').queries
const { tryToUnderstandEachOther } = require('../models/language')
const { personalityDealsWith, compabilityCheck, getChanceOfDowngrade } = require('../models/personality')
const m = require('../models/court')

const taxesAndExpenses = async (dwelling) => {
    
    const court = await getCourtByDwellingId(dwelling.id)
    const ruler = await getCharacterById(court.rulerId)
    const costBaseMaintenanceGuards = Math.floor(dwelling.citizens * GUARD_COST_MAINTENANCE)
    const costGuards = Math.floor(costBaseMaintenanceGuards * GUARD_COST_MULTIPLYER * m.dwellingQualityMultiplyer(dwelling.guards))
    const costWalls= Math.floor((( dwelling.citizens * WALLS_COST_MULTIPLYER) + WALLS_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.walls))
    const costGate = Math.floor((( dwelling.citizens * GATE_COST_MULTIPLYER) + GATE_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.gate))
    const costMoat = Math.floor((( dwelling.citizens * MOAT_COST_MULTIPLYER) + MAOT_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.moats))

    let collectedTax = Math.floor( ( dwelling.citizens * dwelling.citizenTaxable ) * (dwelling.taxRate * 0.01) )
    // guards
    if (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costGuards) {
            collectedTax -= costGuards
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.guards = m.downgradeCondition(dwelling.guards) }
        }
    }
    // walls
    if (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costWalls) {
            collectedTax -= costWalls
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.walls = m.downgradeCondition(dwelling.walls) }
        }
    }
    // gate
    if (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costGate) {
            collectedTax -= costGate
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.gate = m.downgradeCondition(dwelling.gate) }
        }
    }
    // moat
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costMoat) {
            collectedTax -= costMoat
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.moats = m.downgradeCondition(dwelling.moats) }
        }
    }

    // army
    
    
    



}


module.exports = {
    taxesAndExpenses
}