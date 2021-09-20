const objects = require('../generic/objects')
const { copyObject, generateID, chance, getRandomNumberInRange } = require('../lib/utils')
const { getPersonName } = require('../generic/names')
const { ENUM_GENDER, ENUM_JOB_NAMES, ENUM_RACE_NAMES, ENUM_LANGUAGES, ENUM_PERSONALITY_TRAITS } = require('../generic/enums')

/**
 * return a random
 * @returns ENUM_RACE_NAMES
 */
const getRandomRace = () => {
    const i = getRandomNumber(0, 11)
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
 * @param {object} options {
 * ?basic: bool, 
 * ?gender: ENUM_GENDER, 
 * job: ENUM_JOB_NAMES, 
 * ?race: ENUM_RACE_NAMES
 * age: int
 * mother: string
 * father: string
 * }
 * @returns 
 */
module.exports.build = (options) => {
    const c = copyObject(objects.character)
    c.id = generateID()
    c.gender = (options.gender) ? options.gender : (chance(50)) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE
    c.name = getPersonName(c.gender)
    c.age = (options.age) ? options.age : getRandomNumberInRange(15, 60)
    c.race = (options.race) ? options.race : getRandomRace()
    c.job = (options.job) ? options.job : getRandomJob()
    c.father = options.father
    c.mother = options.mother

    return c
}

