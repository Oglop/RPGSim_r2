const objects = require('../generic/objects')
const skillsBuilder = require('./skill')
const languageBuilder = require('./languages')
const personalityBuilder = require('./personality')
const bCoatOfArms = require('./coatOfArms')
const { getFamilyName } = require('../generic/names')
const { 
    copyObject, 
    generateID, 
    chance, 
    getRandomNumberInRange,
    capitalizeFirstLetter,
    isVowel
} = require('../lib/utils')
const { getPersonName } = require('../generic/names')
const { ENUM_CHARACTER_TRAITS, ENUM_GENDER, ENUM_JOB_NAMES, ENUM_RACE_NAMES, ENUM_LANGUAGES, ENUM_PERSONALITIES } = require('../generic/enums')
const { STAT_MAXIMUM_VALUE, STAT_MINIMUM_VALUE, STATS_MINIMUM_SUM, STAT_HEALTH_BASE, STAT_HEALTH_INCREASE, STAT_STAMINA_BASE, STAT_STAMINA_INCREASE } = require('../generic/statics')
const { getBirthDate } = require('../lib/time')
const { logError } = require('../data/errorFile')
const { getRandomReligion } = require('../generic/religions')
const { getDescriptionByPersonality } = require('../models/personality')
const { get } = require('../localization')
const { getBirthDateDescription } = require('../lib/time')

/**
 * edit character stats by race
 * @param {Object} c 
 */
const setRaceTrait = (c) => {
    let traits = {}
    switch (c.race) {
        case ENUM_RACE_NAMES.human: traits = copyObject(objects.traits.human); break;
        case ENUM_RACE_NAMES.darkElf: traits = copyObject(objects.traits.darkElf); break;
        case ENUM_RACE_NAMES.dwarf: traits = copyObject(objects.traits.dwarf); break;
        case ENUM_RACE_NAMES.halfElf: traits = copyObject(objects.traits.halfElf); break;
        case ENUM_RACE_NAMES.halfling: traits = copyObject(objects.traits.halfling); break;
        case ENUM_RACE_NAMES.highElf: traits = copyObject(objects.traits.highElf); break;
        case ENUM_RACE_NAMES.woodElf: traits = copyObject(objects.traits.woodElf); break;
    }
    c.stats.str += traits.str
    c.stats.agi += traits.agi
    c.stats.vit += traits.vit
    c.stats.int += traits.int
    c.stats.wis += traits.wis
    c.stats.luc += traits.luc
    c.stats.cha += traits.cha
}

/**
 * Set max health and stamina
 * 
 * @param {Object} c of Characher
 */
const setHealthAndStamina = (c) => {
    c.maxHealth = STAT_HEALTH_BASE + (STAT_HEALTH_INCREASE * c.stats.vit)
    c.maxStamina = STAT_STAMINA_BASE + (STAT_STAMINA_INCREASE * c.stats.int)
    c.health = c.maxHealth
    c.stamina = c.maxStamina
}


/**
 * return a random
 * @returns ENUM_RACE_NAMES
 */
const getRandomRace = () => {
    const i = getRandomNumberInRange(0, 11)
    switch (i) {
        case 0: return ENUM_RACE_NAMES.human
        case 1: return ENUM_RACE_NAMES.darkElf
        case 2: return ENUM_RACE_NAMES.dwarf
        case 3: return ENUM_RACE_NAMES.halfElf
        case 4: return ENUM_RACE_NAMES.halfling
        case 5: return ENUM_RACE_NAMES.highElf
        case 6: return ENUM_RACE_NAMES.woodElf
        case 7: return ENUM_RACE_NAMES.highElf
        case 8: return ENUM_RACE_NAMES.dwarf
        case 9: return ENUM_RACE_NAMES.human
        case 10: return ENUM_RACE_NAMES.human
        case 11: return ENUM_RACE_NAMES.human
    }
}

/**
 * Returns random job by Enum
 * @returns ENUM_JOB_NAMES
 */
const getRandomJob = () => {
    const i = getRandomNumberInRange(0, 9)
    switch (i) {
        case 0: return ENUM_JOB_NAMES.cleric
        case 1: return ENUM_JOB_NAMES.fighter
        case 2: return ENUM_JOB_NAMES.knight
        case 3: return ENUM_JOB_NAMES.monk
        case 4: return ENUM_JOB_NAMES.noble
        case 5: return ENUM_JOB_NAMES.peseant
        case 6: return ENUM_JOB_NAMES.ranger
        case 7: return ENUM_JOB_NAMES.rouge
        case 8: return ENUM_JOB_NAMES.thief
        case 9: return ENUM_JOB_NAMES.wizard
    }
}

/**
 * 
 * @param {object} s 
 * @returns {int} sum
 */
const checkStatSum = s => {
    return s.agi + s.str + s.vit + s.int + s.wis + s.luc + s.cha
};

/**
 * Roll sats
 * @param {bool} enforceMinimumSum
 * @returns {Object} object of stats
 */
const rollStats = (enforceMinimumSum) => {
    const s = copyObject(objects.stats)
    let i = 0
    while (i < STATS_MINIMUM_SUM) {
        s.str = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        s.vit = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        s.agi = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        s.wis = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        s.int = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        s.cha = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        s.luc = getRandomNumberInRange(STAT_MINIMUM_VALUE, STAT_MAXIMUM_VALUE)
        i = (enforceMinimumSum) ? checkStatSum(s) : STATS_MINIMUM_SUM
    }
    return s
}

const getTrait = () => {
    const i = getRandomNumberInRange(0, 15)
    switch (i) {
        case 0: return ENUM_CHARACTER_TRAITS.ABOMINATION;
        case 1: return ENUM_CHARACTER_TRAITS.ADVENTURER;
        case 2: return ENUM_CHARACTER_TRAITS.CURSED;
        case 3: return ENUM_CHARACTER_TRAITS.DARK_PAST;
        case 4: return ENUM_CHARACTER_TRAITS.ESCAPED_SLAVE;
        case 5: return ENUM_CHARACTER_TRAITS.FISHER;
        case 6: return ENUM_CHARACTER_TRAITS.FORMER_NOBLE;
        case 7: return ENUM_CHARACTER_TRAITS.TRAVLER;
        case 8: return ENUM_CHARACTER_TRAITS.VETERAN;
        case 9: return ENUM_CHARACTER_TRAITS.SPIRIT_TALKER;
        case 10: return ENUM_CHARACTER_TRAITS.STICKY_FINGERS;
        case 11: return ENUM_CHARACTER_TRAITS.ALCOHOLIC;
        case 12: return ENUM_CHARACTER_TRAITS.GAMBLER;
        case 13: return ENUM_CHARACTER_TRAITS.SHIELDED;
        case 14: return ENUM_CHARACTER_TRAITS.RIDER;
        case 15: return ENUM_CHARACTER_TRAITS.OCCULTIST;
        case 16: return ENUM_CHARACTER_TRAITS.COOL_HEADED;
    }
}


/**
 * 
 * @param {Object} c 
 */
const validateBuild = (c) => {
    if (c.race == undefined) { throw new Error('Missing value race') }
    if (c.gender == undefined) { throw new Error('Missing value gender') }
    if (c.age == undefined) { throw new Error('Missing value age') }
    if (c.languages.length == 0) { throw new Error('Missing value language') }
    if (c.skills.length == 0) { throw new Error('Missing value skills') }

}

const getCharacterDescription = (name, race, gender, options = {}) => {
    const religion = (options.religion) ? options.religion : undefined
    const pronoun = (gender == ENUM_GENDER.FEMALE) ? get('system-word-she') : get('system-word-he')
    let hair = ''
    let body = ''
    let eyes = ''
    let i = getRandomNumberInRange(0, 8)
    switch(i) {
        case 0: hair = get('character-haircolor-auburn'); break;
        case 1: hair = get('character-haircolor-brunette'); break;
        case 2: hair = get('character-haircolor-light-brown'); break;
        case 3: hair = get('character-haircolor-dark'); break;
        case 4: hair = get('character-haircolor-blonde'); break;
        case 5: hair = get('character-haircolor-gray'); break;
        case 6: hair = get('character-haircolor-black'); break;
        case 7: hair = get('character-haircolor-white'); break;
        case 8: hair = get('character-haircolor-red'); break;
    }
    i = getRandomNumberInRange(0, 12)
    switch(i) {
        case 0: body = get('character-body-tall'); break;
        case 1: body = get('character-body-short'); break;
        case 2: body = get('character-body-stocky'); break;
        case 3: body = get('character-body-round'); break;
        case 4: body = get('character-body-slim'); break;
        case 5: body = get('character-body-muscular'); break;
        case 6: body = get('character-body-slender'); break;
        case 7: body = get('character-body-tenuous'); break;
        case 8: body = get('character-body-feeble'); break;
        case 9: body = get('character-body-potent'); break;
        case 10: body = get('character-body-sinewy'); break;
        case 11: body = get('character-body-potent'); break;
        case 12: body = get('character-body-vivid'); break;
    }
    i = getRandomNumberInRange(0, 4)
    switch(i) {
        case 0: eyes = get('character-eyes-blue'); break;
        case 1: eyes = get('character-eyes-green'); break;
        case 2: eyes = get('character-eyes-dark-brown'); break;
        case 3: eyes = get('character-eyes-brown'); break;
        case 4: eyes = get('character-eyes-gray'); break;
    }
    
    const bodyAnA = isVowel(body) ? get('system-word-an') : get('system-word-a')
    const descRaceAndBody = capitalizeFirstLetter(`${name} is ${bodyAnA} ${body} ${race}.`)
    const descLooks = capitalizeFirstLetter(`${pronoun} has ${eyes} eyes and ${hair} hair.`)
    let descReligion = ``
    if (religion) {
        descReligion = capitalizeFirstLetter(get('character-description-religion', [ pronoun, options.religion.name ]))
    }
    
    const descPersonality = capitalizeFirstLetter(get('character-description-personality', [ pronoun, getDescriptionByPersonality(options.personality) ] ))
    const descBirthDate = capitalizeFirstLetter(get('character-birthDate', [ name, getBirthDateDescription(options.birthDate) ]))
    return `${descRaceAndBody} ${descLooks} ${descReligion} ${descPersonality} ${descBirthDate}`
}

/**
 * 
 * @param {object} options {
 * ?basic: bool, 
 * ?gender: ENUM_GENDER, 
 * job: ENUM_JOB_NAMES, 
 * ?race: ENUM_RACE_NAMES
 * age: int
 * mother: string
 * father: string
 * enforceMinimumSum: bool
 * religion: ENUM_GODS,
 * date
 * }
 * @returns 
 */
module.exports.build = (options = {}) => {
    const c = copyObject(objects.character)
    try {
        c.id = generateID()
        c.gender = (options.gender) ? options.gender : (chance(50)) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE
        c.religion = (options.religion) ? options.religion : getRandomReligion()
        c.name = getPersonName(c.gender)
        c.age = (options.age ||options.age === 0) ? options.age : getRandomNumberInRange(15, 60)
        c.race = (options.race) ? options.race : getRandomRace()
        c.job = (options.job) ? options.job : getRandomJob()
        if (c.job == ENUM_JOB_NAMES.noble) {
            c.coatOfArms = bCoatOfArms.build()
            c.family = getFamilyName()
            if (options.title) { c.title = options.title }
        }
        c.father = options.father
        c.mother = options.mother
        c.pregnant = false
        c.trait = getTrait()
        c.stats = rollStats(options.enforceMinimumSum || true)
        setRaceTrait(c)
        setHealthAndStamina(c)
        skillsBuilder.build(c)
        c.languages = languageBuilder.build(c)
        c.birthDate = getBirthDate(options.date, c.age)
        personalityBuilder.build(c)
        c.description = getCharacterDescription(c.name, c.race, c.gender, {
            religion: c.religion,
            personality: c.personality,
            birthDate: c.birthDate
        })
        validateBuild(c)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    return c
}

