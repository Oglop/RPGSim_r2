// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_COMMANDS,
    ENUM_GENDER,
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_DWELLING_SIZE
} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray, 
    generateID} = require('../lib/utils')
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

const {
    executeCommands
} = require('../persistance/aggregates/sequences')


const { getCharacterById, getCourtByDwellingId } = require('../persistance').queries
const { tryToUnderstandEachOther } = require('./language')
const { personalityDealsWith, compabilityCheck, getChanceOfDowngrade } = require('./personality')
const m = require('../models/court')
const { getRandomReligion } = require('../generic/religions')
const { getAgeSimple } = require('../lib/time')

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


const getTitleByDwellingSize = (size) => {
    switch (size) {
        case ENUM_DWELLING_SIZE.VILLAGE: return get('character-ruler-title-village');
        case ENUM_DWELLING_SIZE.TOWN: return get('character-ruler-title-town');
        case ENUM_DWELLING_SIZE.CITY: return get('character-ruler-title-city');
        case ENUM_DWELLING_SIZE.CAPITAL: return get('character-ruler-title-capital');
    }
}


const replaceAdvisors = async (dwelling, deceased, advisors, currentDate) => {
    let age = 0
    let family
    let coatOfArms
    let religion
    if (chance(50) && getAgeSimple(currentDate, deceased.birthDate) > 50 ) {
        age = getRandomNumberInRange(16, 30)
        family = deceased.family
        religion = deceased.religion
    } else {
        age = getRandomNumberInRange(16, 30)
        family = deceased.family
        religion = getRandomReligion()
    }

    const character = bCharacter.build({
        age,
        gender: (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE,
        race,
        job: ENUM_JOB_NAMES.noble,
        father: '',
        mother: '',
        enforceMinimumSum: false,
        date: currentDate,
        religion,
        title: get('character-ruler-title-lord'),
        family,
        coatOfArms
    })

    const advisor = copyObject(objects.advisor)
    advisor.id = generateID()
    advisor.character = newAdvisor
    advisor.courtId = dwelling.court.id

    //insertAdvisor(advisor)
    //insertCharacter(character)
    executeCommands([
        { command: ENUM_COMMANDS.INSERTADVISOR, data: advisor },
        { command: ENUM_COMMANDS.INSERTCHARACTER, data: character }
    ])


    advisors.push(character)
}


const replaceRuler = async (dwelling, currentDate) => {
    const advisors = dwelling.court.advisors.filter(a => a.isAlive == true)
    let newRuler;
    const oldRulerId = dwelling.court.rulerId
    if (advisors.length) {
        character = getRandomElementFromArray(advisors)
        executeCommands([
            { command: ENUM_COMMANDS.DELETEADVISOR, data: newRuler.id }
        ])
    }
    else {
        character = bCharacter.build({
            age: getRandomNumberInRange(18, 60),
            gender: (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE,
            race,
            job: ENUM_JOB_NAMES.noble,
            father: '',
            mother: '',
            enforceMinimumSum: false,
            date: currentDate,
            religion: (!randomReligion) ? religion : getRandomReligion(),
            title: m.getTitleByDwellingSize(dwelling.size)
        })
    }

    dwelling.court.rulerId = character.id
    dwelling.court.ruler = character

    
    executeCommands([
        { command: ENUM_COMMANDS.DELETECHARACTER, data: oldRulerId },
        //{ command: ENUM_COMMANDS.INSERTADVISOR, data: advisor },
        { command: ENUM_COMMANDS.INSERTCHARACTER, data: character },
        { command: ENUM_COMMANDS.UPDATERULERINCOURT, data: court },
    ])
}




module.exports = {
    getTitleByDwellingSize,
    replaceAdvisors,
    replaceRuler,
    consultAdvisor,
    upgradeCondition,
    downgradeCondition,
    dwellingQualityMultiplyer,
    getGuardHappinessModifyer
}
