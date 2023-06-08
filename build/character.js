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
    ENUM_AGE_RANGE 
const { ENUM_CHARACTER_TRAITS, ENUM_GENDER, ENUM_JOB_NAMES, ENUM_RACE_NAMES, ENUM_LANGUAGES, ENUM_PERSONALITIES, ENUM_AGE_RANGE } = require('../generic/enums')
const { 
    STAT_MAXIMUM_VALUE, 
    STAT_MINIMUM_VALUE, 
    STATS_MINIMUM_SUM, 
    STAT_HEALTH_BASE, 
    STAT_HEALTH_INCREASE, 
    STAT_STAMINA_BASE, 
    STAT_STAMINA_INCREASE,
    RACE_AGE_CHILD_HUMAN_MIN,
    RACE_AGE_CHILD_HUMAN_MAX,
    RACE_AGE_YOUNG_HUMAN_MIN,
    RACE_AGE_YOUNG_HUMAN_MAX,
    RACE_AGE_MIDDLE_AGED_HUMAN_MIN,
    RACE_AGE_MIDDLE_AGED_HUMAN_MAX,
    RACE_AGE_OLD_HUMAN_MIN,
    RACE_AGE_OLD_HUMAN_MAX, 
    RACE_AGE_CHILD_DWARF_MIN,
    RACE_AGE_CHILD_DWARF_MAX,
    RACE_AGE_YOUNG_DWARF_MIN,
    RACE_AGE_YOUNG_DWARF_MAX,
    RACE_AGE_MIDDLE_AGED_DWARF_MIN,
    RACE_AGE_MIDDLE_AGED_DWARF_MAX, 
    RACE_AGE_OLD_DWARF_MIN,
    RACE_AGE_OLD_DWARF_MAX, 
    RACE_AGE_CHILD_ELF_MIN,
    RACE_AGE_CHILD_ELF_MAX,
    RACE_AGE_YOUNG_ELF_MIN,
    RACE_AGE_YOUNG_ELF_MAX,
    RACE_AGE_MIDDLE_AGED_ELF_MIN,
    RACE_AGE_MIDDLE_AGED_ELF_MAX, 
    RACE_AGE_OLD_ELF_MIN,
    RACE_AGE_OLD_ELF_MAX,
    ACE_AGE_CHILD_HALF_ELF_MIN,
    RACE_AGE_CHILD_HALF_ELF_MAX,
    RACE_AGE_YOUNG_HALF_ELF_MIN,
    RACE_AGE_YOUNG_HALF_ELF_MAX,
    RACE_AGE_MIDDLE_AGED_HALF_ELF_MIN,
    RACE_AGE_MIDDLE_AGED_HALF_ELF_MAX,
    RACE_AGE_OLD_HALF_ELF_MIN,
    RACE_AGE_OLD_HALF_ELF_MAX, 
    RACE_AGE_CHILD_HALFLING_MIN,
    RACE_AGE_CHILD_HALFLING_MAX,
    RACE_AGE_YOUNG_HALFLING_MIN,
    RACE_AGE_YOUNG_HALFLING_MAX,
    RACE_AGE_MIDDLE_AGED_HALFLING_MIN,
    RACE_AGE_MIDDLE_AGED_HALFLING_MAX, 
    RACE_AGE_OLD_HALFLING_MIN, 
    RACE_AGE_OLD_HALFLING_MAX
} = require('../generic/statics')
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


const getHaircolor = (race) => {
    let i = getRandomNumberInRange(0, 4)

    if (race == ENUM_RACE_NAMES.darkElf) {
        switch(i) {
            case 0: return get('character-haircolor-purple');
            case 1: return get('character-haircolor-blue');
            case 2: return get('character-haircolor-black');
            case 3: return get('character-haircolor-gray');
            case 4: return get('character-haircolor-white');
        }
    } else if (race == ENUM_RACE_NAMES.dwarf) {
        switch(i) {
            case 0: return get('character-haircolor-gray');
            case 1: return get('character-haircolor-orange');
            case 2: return get('character-haircolor-red');
            case 3: return get('character-haircolor-auburn');
            case 4: return get('character-haircolor-light-brown');
        }
    } else if (race == ENUM_RACE_NAMES.halfElf) {
        switch(i) {
            case 0: return get('character-haircolor-blonde');
            case 1: return get('character-haircolor-light-brown');
            case 2: return get('character-haircolor-auburn');
            case 3: return get('character-haircolor-brunette');
            case 4: return get('character-haircolor-white');
        }
    } else if (race == ENUM_RACE_NAMES.halfling) {
        switch(i) {
            case 0: return get('character-haircolor-blonde');
            case 1: return get('character-haircolor-auburn');
            case 2: return get('character-haircolor-brunette');
            case 3: return get('character-haircolor-black');
            case 4: return get('character-haircolor-dark');
        }
    } else if (race == ENUM_RACE_NAMES.highElf) {
        switch(i) {
            case 0: return get('character-haircolor-blue');
            case 1: return get('character-haircolor-blonde');
            case 2: return get('character-haircolor-gray');
            case 3: return get('character-haircolor-white');
            case 4: return get('character-haircolor-auburn');
        }
    } else if (race == ENUM_RACE_NAMES.human) {
        switch(i) {
            case 0: return get('character-haircolor-auburn');
            case 1: return get('character-haircolor-brunette');
            case 2: return get('character-haircolor-blonde');
            case 3: return get('character-haircolor-red');
            case 4: return get('character-haircolor-black');
        }
    } else if (race == ENUM_RACE_NAMES.woodElf) {
        switch(i) {
            case 0: return get('character-haircolor-gray');
            case 1: return get('character-haircolor-white');
            case 2: return get('character-haircolor-green');
            case 3: return get('character-haircolor-red');
            case 4: return get('character-haircolor-light-brown');
        }
    }
}

const getRaceTraits = (race, gender) => {
    if (race == ENUM_RACE_NAMES.dwarf && gender == ENUM_GENDER.MALE) {
        let i = getRandomNumberInRange(0, 2)
        switch(i) {
            case 0: return get('character-trait-beard-short');
            case 1: return get('character-trait-beard-long');
            case 2: return get('character-trait-beard-braided');
        }
    }
    if (race == ENUM_RACE_NAMES.darkElf || race == ENUM_RACE_NAMES.halfElf || race == ENUM_RACE_NAMES.highElf || race == ENUM_RACE_NAMES.woodElf) {
        let i = getRandomNumberInRange(0, 2)
        switch(i) {
            case 0: return get('character-trait-ears-pointy-long');
            case 1: return get('character-trait-ears-pointy-short');
            case 2: return get('character-trait-ears-pointy-thin');
        }
    }
    return ''
}

const getCharacterDescription = (name, race, gender, options = {}) => {
    const religion = (options.religion) ? options.religion : undefined
    const pronoun = (gender == ENUM_GENDER.FEMALE) ? get('system-word-she') : get('system-word-he')
    let hair = getHaircolor(race)
    let body = ''
    let eyes = ''

    let extraDescription = ''
    const raceTraits = getRaceTraits(race, gender)
    if (raceTraits != '') {
        extraDescription = capitalizeFirstLetter( get('character-trait-has', [ pronoun, raceTraits ]))
    }


    let i = getRandomNumberInRange(0, 12)
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
    return `${descRaceAndBody} ${descLooks} ${extraDescription} ${descReligion} ${descPersonality} ${descBirthDate}`
}

/**
 * 
 * @param {{ id:text, race: ENUM_RACE_NAMES }} character 
 * @param {{ ageRange: ENUM_AGE_RANGE }} options 
 */
const getAgeByRace = (character, options) => {
    


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
        c.name = (options.name) ? options.name : getPersonName(c.gender)
        c.age = (options.age ||options.age === 0) ? options.age : getRandomNumberInRange(15, 60)
        c.race = (options.race) ? options.race : getRandomRace()
        c.job = (options.job) ? options.job : getRandomJob()
        if (c.job == ENUM_JOB_NAMES.noble) {
            c.coatOfArms = (options.coatOfArms) ? options.coatOfArms : bCoatOfArms.build()
            c.family = (options.family) ? options.family : getFamilyName()
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

        // yuk
        if (options.asAdvisor && options.courtId) {
            const advisor = copyObject(objects.advisor)
            advisor.id = generateID();
            advisor.characterId = c.id
            advisor.character = c
            advisor.courtId = options.courtId
            return advisor
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    return c
}

