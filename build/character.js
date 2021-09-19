const objects = require('../generic/objects')
const { copyObject, generateID, chance, getRandomNumberInRange } = require('../lib/utils')
const { getPersonName } = require('../generic/names')
const { ENUM_GENDER, ENUM_JOB_NAMES, ENUM_RACE_NAMES, ENUM_LANGUAGES, ENUM_PERSONALITY_TRAITS } = require('../generic/enums')

/**
 * 
 * @param {object} options {
 * ?basic: bool, 
 * ?gender: ENUM_GENDER, 
 * job: ENUM_JOB_NAMES, 
 * ?race: ENUM_RACE_NAMES
 * age: int
 * }
 * @returns 
 */
module.exports.build = (options) => {
    const c = copyObject(objects.character)
    c.id = generateID()
    if (!options.gender) {
        c.gender = (chance(50)) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE
    }
    c.name = getPersonName(c.gender)
    c.age = (options.age) ? options.age : getRandomNumberInRange(15, 60)

    return c
}

