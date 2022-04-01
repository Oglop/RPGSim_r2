const { 
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange,
    getRandomElementFromArray,
} = require('../lib/utils')
const objects = require('../generic/objects')
const { getRandomReligion } = require('../generic/religions')
const { 
    ENUM_JOB_NAMES,
    ENUM_GENDER,
    ENUM_RACE_NAME,
    ENUM_DWELLINGS,
    ENUM_DWELLING_SIZE
 } = require('../generic/enums')
const familyBuilder = require('../build/families')
const bCharacter = require('./character')
const { getRaceFromDwellingType } = require('../models/dwelling')
const { get } = require('../localization')
const { 
    insertAdvisor, 
    insertCharacter,
    insertCourt,
    insertLanguage,
    insertSkill
 } = require('../persistance').commands

const getTitleByDwellingSize = (size) => {
    switch (size) {
        case ENUM_DWELLING_SIZE.VILLAGE: return get('character-ruler-title-village');
        case ENUM_DWELLING_SIZE.TOWN: return get('character-ruler-title-town');
        case ENUM_DWELLING_SIZE.CITY: return get('character-ruler-title-city');
        case ENUM_DWELLING_SIZE.CAPITAL: return get('character-ruler-title-capital');
    }
}

/**
 * build court
 * 
 * @param {object} dwelling
 * @param {object} options {
 * dwelling object
 * race: ENUM_RACE_NAME
 * date: date object
 * }
 */
module.exports.build = async (dwelling, options) => {
    const court = copyObject(objects.court)
    court.id = generateID()
    court.dwellingId = dwelling.id
    
    const race = getRaceFromDwellingType(dwelling)
    const randomReligion = (chance(50)) ? true : false
    const religion = getRandomReligion()
    let min = 1
    let max = 2
    switch (dwelling.size) {
        case ENUM_DWELLING_SIZE.TOWN: min = 2; max = 3; break;
        case ENUM_DWELLING_SIZE.CITY: min = 4; max = 7; break;
        case ENUM_DWELLING_SIZE.CAPITAL: min = 6; max = 9; break;
    }
    
    const ruler = bCharacter.build({
        age: getRandomNumberInRange(18, 60),
        gender: (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE,
        race,
        job: ENUM_JOB_NAMES.noble,
        father: '',
        mother: '',
        enforceMinimumSum: false,
        date: options.date,
        religion: (!randomReligion) ? religion : getRandomReligion(),
        title: getTitleByDwellingSize(dwelling.size)
    });
    try {
        for (let l of ruler.languages) { await insertLanguage(l) }
        for (let s of ruler.skills) { await insertSkill(s) }
        await insertCharacter(ruler)
    } catch (e) {
        console.log(e.message)
    }
    
    court.rulerId = ruler.id

    const noOfAdvisors = getRandomNumberInRange(min, max)
    for (let i = 0; i < noOfAdvisors; i++) {
        const character = bCharacter.build({
            age: getRandomNumberInRange(18, 80),
            gender: (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE,
            race,
            job: ENUM_JOB_NAMES.noble,
            father: '',
            mother: '',
            enforceMinimumSum: false,
            date: options.date,
            religion: (!randomReligion) ? religion : getRandomReligion(),
            title: get('character-ruler-title-lord')
        });
        const advisor = copyObject(objects.advisor)
        advisor.id = generateID();
        advisor.characterId = character.id
        advisor.courtId = court.id
        court.advisors.push(advisor)
        
        await insertAdvisor(advisor)
        for (let l of character.languages) { await insertLanguage(l) }
        for (let s of character.skills) { await insertSkill(s) }
        await insertCharacter(character)
    }
    await insertCourt(court)
    return court
}