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
    CONDITION_NONE_MULTIPLYER,
    CONDITION_RUINED_MULTIPLYER,
    CONDITION_POOR_MULTIPLYER,
    CONDITION_GOOD_MULTIPLYER,
    CONDITION_PERFECT_MULTIPLYER,
    GUARD_HAPPINESS_MOD_NONE,
    GUARD_HAPPINESS_MOD_RUINED,
    GUARD_HAPPINESS_MOD_POOR,
    GUARD_HAPPINESS_MOD_GOOD,
    GUARD_HAPPINESS_MOD_PERFECT, 
} = require('../generic/statics')

// STANDARD IMPORTS

const { getCharacterById, getCourtByDwellingId } = require('../persistance').queries
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

/**
 * returns number value for multiplying citizen happiness
 * @param {ENUM_DWELLING_CONDITIONS} guard 
 */
const getGuardHappinessModifyer = (guard) => {
    switch (guard) {
        case ENUM_DWELLING_CONDITIONS.NONE : return GUARD_HAPPINESS_MOD_NONE;
        case ENUM_DWELLING_CONDITIONS.RUINED : return GUARD_HAPPINESS_MOD_RUINED;
        case ENUM_DWELLING_CONDITIONS.POOR : return GUARD_HAPPINESS_MOD_POOR;
        case ENUM_DWELLING_CONDITIONS.GOOD : return GUARD_HAPPINESS_MOD_GOOD;
        case ENUM_DWELLING_CONDITIONS.PERFECT : return GUARD_HAPPINESS_MOD_PERFECT;
    }
}

module.exports = {
    consultAdvisor,
    upgradeCondition,
    downgradeCondition,
    dwellingQualityMultiplyer,
    getGuardHappinessModifyer
}
