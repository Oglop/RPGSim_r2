const objects = require('../generic/objects')
const skillsBuilder = require('./skill')
const languageBuilder = require('./languages')
const personalityBuilder = require('./personality')
const { copyObject, generateID, chance, getRandomNumberInRange } = require('../lib/utils')
const { getPersonName } = require('../generic/names')
const { ENUM_GENDER, ENUM_JOB_NAMES, ENUM_RACE_NAMES, ENUM_LANGUAGES, ENUM_PERSONALITIES } = require('../generic/enums')
const { STAT_MAXIMUM_VALUE, STAT_MINIMUM_VALUE, STATS_MINIMUM_SUM, STAT_HEALTH_BASE, STAT_HEALTH_INCREASE, STAT_STAMINA_BASE, STAT_STAMINA_INCREASE } = require('../generic/statics')
const { getBirthDate } = require('../lib/time')
const { logError } = require('../data/errorFile')
const { getRandomReligion } = require('../generic/religions')


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
module.exports.build = (options) => {
    const c = copyObject(objects.character)
    try {
        c.id = generateID()
        c.gender = (options.gender) ? options.gender : (chance(50)) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE
        c.religion = (options.religion) ? options.religion : getRandomReligion()
        c.name = getPersonName(c.gender)
        c.age = (options.age ||options.age === 0) ? options.age : getRandomNumberInRange(15, 60)
        c.race = (options.race) ? options.race : getRandomRace()
        c.job = (options.job) ? options.job : getRandomJob()
        c.father = options.father
        c.mother = options.mother
        c.pregnant = false
        c.stats = rollStats(options.enforceMinimumSum || true)
        setRaceTrait(c)
        setHealthAndStamina(c)
        skillsBuilder.build(c)
        c.languages = languageBuilder.build(c)
        c.getBirthDate = getBirthDate(options.date, c.age)
        personalityBuilder.build(c)
        validateBuild(c)
    } catch (e) {
        console.log(JSON.stringify(options))
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    return c
}

