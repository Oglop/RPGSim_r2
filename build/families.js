const objects = require('../generic/objects')
const { ENUM_GENDER, ENUM_RACE_NAMES, ENUM_DWELLINGS, ENUM_JOB_NAMES } = require('../generic/enums')
const { copyObject, generateID, getRandomNumberInRange, getRandomNumber, chance } = require('../lib/utils')
const { getFamilyName } = require('../generic/names')
const { dwelling, character } = require('../generic/objects')
const { getRandomReligion } = require('../generic/religions')
const characterBuilder = require('./character')

/**
 * 
 * @returns {Array} Array of integer
 */
const getFamilyAges = () => {
    const ages = []
    const fatherAge = getRandomNumberInRange(18, 60)
    ages.push(fatherAge)
    const motherAge = fatherAge - 3 + getRandomNumber(4)
    ages.push(motherAge)
    const maxChildren = getRandomNumberInRange(1, 5)
    let lastChildAge = motherAge - 18
    while (lastChildAge >= 0) {
        if (chance(50)) {
            ages.push(lastChildAge)
        }
        lastChildAge -= getRandomNumberInRange(1, 3)
        if (ages.length - 2 >= maxChildren) { break; }
    }
    return ages
}

/**
 * create a new family
 * @param {object} options { ?race: ENUM_RACE_NAMES,  }
 */
const createFamily = (options) => {
    let religion = getRandomReligion()
    let father = ''
    let mother = ''
    const f = copyObject(objects.family)
    f.id = generateID()
    f.dwellingId = options.dwellingId
    f.name = getFamilyName()
    f.race = (!options.race) ? ENUM_RACE_NAMES.human : options.race

    const ages = getFamilyAges()
    for (let i = 0; i < ages.length; i++) {
        let gender = ENUM_GENDER.MALE
        if (i == 0) { gender = ENUM_GENDER.MALE }
        else if (i == 1) {  gender = ENUM_GENDER.FEMALE }
        else {
            father = f.members[0].id
            mother = f.members[1].id
            gender = (chance(50)) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE
        }
        const c = characterBuilder.build({ 
            age: ages[i],
            gender,
            race: f.race,
            job: ENUM_JOB_NAMES.noble,
            mother,
            father,
            enforceMinimumSum: false,
            date: options.date,
            religion
         })
         f.members.push(c)
    }
    f.members[0].marriedTo = f.members[1].id
    f.members[1].marriedTo = f.members[0].id
    return f
}

/**
 * 
 * @param {Object} options { dwellings: [] }
 */
module.exports.build = (options) => {
    
    const families = []


    for (const d of options.dwellings) {
        let influence = 0
        let race = ENUM_RACE_NAMES.human

        switch (d.type) {
            case ENUM_DWELLINGS.TOWN: influence = 40; race = ENUM_RACE_NAMES.human; break; 
            case ENUM_DWELLINGS.CITY: influence = 100; race = ENUM_RACE_NAMES.human; break;
            case ENUM_DWELLINGS.ELF_TOWN: influence = 70; race = ENUM_RACE_NAMES.highElf; break;
            case ENUM_DWELLINGS.DWARVEN_MINE: influence = 60; race = ENUM_RACE_NAMES.dwarf; break;
        }
        influence += getRandomNumberInRange(-5, 5)
        const f = createFamily( { race: ENUM_RACE_NAMES.human, dwellingId: d.id, date: options.date } )
        families.push(f)
    }

    return families
}
