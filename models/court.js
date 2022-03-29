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

// STANDARD IMPORTS

const { getCharacterById, getCourtByDwellingId } = require('../database').queries
const { tryToUnderstandEachOther } = require('./language')
const { personalityDealsWith, compabilityCheck, getChanceOfDowngrade } = require('./personality')

const upgradeCondition = (condition) => {
    switch (condition) {
        case ENUM_DWELLING_CONDITIONS.NONE: return ENUM_DWELLING_CONDITIONS.POOR;
        case ENUM_DWELLING_CONDITIONS.RUINED: return ENUM_DWELLING_CONDITIONS.POOR;
        case ENUM_DWELLING_CONDITIONS.POOR: return ENUM_DWELLING_CONDITIONS.GOOD;
        case ENUM_DWELLING_CONDITIONS.GOOD: return ENUM_DWELLING_CONDITIONS.PERFECT;
    }
}

const downgradeCondition = (condition) => {
    switch (condition) {
        case ENUM_DWELLING_CONDITIONS.RUINED: return ENUM_DWELLING_CONDITIONS.NONE;
        case ENUM_DWELLING_CONDITIONS.POOR: return ENUM_DWELLING_CONDITIONS.RUINED;
        case ENUM_DWELLING_CONDITIONS.GOOD: return ENUM_DWELLING_CONDITIONS.POOR;
        case ENUM_DWELLING_CONDITIONS.PERFECT: return ENUM_DWELLING_CONDITIONS.GOOD;
    }
}


const dwellingQualityMultiplyer = (quality) => {
    switch (quality) {
        case ENUM_DWELLING_CONDITIONS.NONE : return CONDITION_NONE_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.RUINED : return CONDITION_RUINED_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.POOR : return CONDITION_POOR_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.GOOD : return CONDITION_GOOD_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.PERFECT : return CONDITION_PERFECT_MULTIPLYER;
    }
}

const taxesAndExpenses = async (dwelling) => {
    
    const court = await getCourtByDwellingId(dwelling.id)
    const ruler = await getCharacterById(court.rulerId)
    const costBaseMaintenanceGuards = Math.floor(dwelling.citizens * GUARD_COST_MAINTENANCE)
    const costGuards = Math.floor(costBaseMaintenanceGuards * GUARD_COST_MULTIPLYER * dwellingQualityMultiplyer(dwelling.guards))
    const costWalls= Math.floor((( dwelling.citizens * WALLS_COST_MULTIPLYER) + WALLS_COST_MAINTENANCE ) * dwellingQualityMultiplyer(dwelling.walls))
    const costGate = Math.floor((( dwelling.citizens * GATE_COST_MULTIPLYER) + GATE_COST_MAINTENANCE ) * dwellingQualityMultiplyer(dwelling.gate))
    const costMoat = Math.floor((( dwelling.citizens * MOAT_COST_MULTIPLYER) + MAOT_COST_MAINTENANCE ) * dwellingQualityMultiplyer(dwelling.moats))

    let collectedTax = Math.floor( ( dwelling.citizens * dwelling.citizenTaxable ) * (dwelling.taxRate * 0.01) )
    // guards
    if (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costGuards) {
            collectedTax -= costGuards
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.guards = downgradeCondition(dwelling.guards) }
        }
    }
    // walls
    if (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costWalls) {
            collectedTax -= costWalls
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.walls = downgradeCondition(dwelling.walls) }
        }
    }
    // gate
    if (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costGate) {
            collectedTax -= costGate
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.gate = downgradeCondition(dwelling.gate) }
        }
    }
    // moat
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE) {
        if (collectedTax >= costMoat) {
            collectedTax -= costMoat
        }
        else {
            if (chance(getChanceOfDowngrade(ruler.personality))) { dwelling.moats = downgradeCondition(dwelling.moats) }
        }
    }

    
    
    



}

const consultAdvisor = async (dwelling) => {
    try {
        const advisorId = getRandomElementFromArray(dwelling.advisors)
        const ruler = await getCharacterById(dwelling.ruler.id)
        const advisor = await getCharacterById(advisorId)
        const advisoryResult = compabilityCheck( ruler, advisor )
        const result = (advisoryResult <= 0) ? ENUM_PERSONALITY_DEALS_RESULT.BAD : 
                        (advisoryResult >= 3) ? ENUM_PERSONALITY_DEALS_RESULT.GOOD : 
                                                ENUM_PERSONALITY_DEALS_RESULT.NORMAL
        return result
    }
    catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'consultAdvisor'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    consultAdvisor,
    taxesAndExpenses,
    upgradeCondition,
    downgradeCondition
}
