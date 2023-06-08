const objects = require('../generic/objects')
const { copyObject, chance, getRandomElementFromArray, getRandomNumberInRange } = require('../lib/utils')
const { MAX_MARRIAGE_AGE_GAP, 
    MIN_MARRIAGE_AGE,
    MAX_RELATIONS_POINTS,
    MIN_RELATIONS_POINTS,
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
    RACE_AGE_CHILD_HALF_ELF_MIN,
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
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const { 
    ENUM_CHARACTER_TRAITS, 
    ENUM_HEALTH_STATUS, 
    ENUM_STAT_NAMES,
    ENUM_AGE_RANGE,
    ENUM_RACE_NAMES
} = require('../generic/enums')
const { getAgeSimple } = require('../lib/time')

/**
 * Check if characters are valid for marriage
 * 
 * @param {Object} char1 
 * @param {Object} char2 
 * @returns {boolean}
 */
 const validateCharacterCompabilityForMarige = (char1, char2) => {
    try {
        if (char1.race != char2.race) { return false }
        if (char1.gender == char2.gender) { return false }
        if (Math.abs(char1.age - char2.age) > MAX_MARRIAGE_AGE_GAP) { return false }
        if (char1.age < MIN_MARRIAGE_AGE || char2.age < MIN_MARRIAGE_AGE) { return false }
        if (char1.marriedTo || char2.marriedTo) { return false }
        if (!char1.isAlive || !char2.isAlive) { return false }
        if (char1.mother == char2.mother || char1.father == char2.father) { return false }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'validateCharacterCompabilityForMarige'
        err.message = e.message
        logError(err)
    }
    return true
}

/**
 * Adjust characters relations
 * 
 * @param {Object} character1 
 * @param {Objectr} character2 
 * @param {Int} points 
 */
const setRelation = (character1, character2, points) => {
    try {
        let rel1 = character1.relationships.find(r => r.id === character2.id)
        let rel2 = character2.relationships.find(r => r.id === character1.id)
        if (rel1 != undefined) {
            rel1.points += points
            rel1.points = (rel1.points < MIN_RELATIONS_POINTS) ? MIN_RELATIONS_POINTS : (rel1.points > MAX_RELATIONS_POINTS) ? MAX_RELATIONS_POINTS : rel1.points
        } else {
            const r = copyObject(objects.relation)
            r.id = character2.id
            r.points = points
            character1.relationships.push(r)
        }
    
        if (rel2 != undefined) {
            rel2.points += points
            rel2.points = (rel2.points < MIN_RELATIONS_POINTS) ? MIN_RELATIONS_POINTS : (rel2.points > MAX_RELATIONS_POINTS) ? MAX_RELATIONS_POINTS : rel2.points
        } else {
            const r = copyObject(objects.relation)
            r.id = character1.id
            r.points = points
            character2.relationships.push(r)
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'setRelation'
        err.message = e.message
        logError(err)
    }
}

/**
 * return array of character with trait
 * @param {object} party 
 * @param {ENUM_CHARACTER_TRAITS} trait
 * @returns {ENUM_CHARACTER_TRAITS} 
 */
const getCharacterWithTrait = (party, trait) => {
    try {
        let successes = []
        for (let i = 0; i < party.members.length; i++) {
            if (party.members[i].isAlive && party.members[i].trait == trait) {
                successes.push(party.members[i]) 
            }
        }
        if (successes.length) {
            return getRandomElementFromArray(successes)
        }
        return []
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getCharacterWithTrait'
        err.message = e.message
        logError(err)
    }
}


/**
 * Check if character dies from old age
 * 
 * @param {Object} character 
 */
const checkForOldAge = (character) => {
    if (character.age < 50) { return true }
    else {
        const i = 5 + Math.floor( (character.age * 0.1) * 0.5 )
        if (chance(i)) {
            character.isAlive = false
            character.diedFrom = get('character-died-from-age')
        }
    }
}

const getTraitDescription = (trait, character) => {
    switch (trait) {
        case ENUM_CHARACTER_TRAITS.ABOMINATION: return get('character-trait-abomination', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.DARK_PAST: return get('character-trait-dark-past', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.ESCAPED_SLAVE: return get('character-trait-escaped-slave', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.TRAVLER: return get('character-trait-traveler', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.FISHER: return get('character-trait-fisher', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.CURSED: return get('character-trait-cursed', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.FORMER_NOBLE: return get('character-trait-ex-noble', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.ADVENTURER: return get('character-trait-adventurer', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.VETERAN: return get('character-trait-veteran', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.SPIRIT_TALKER: return get('character-trait-spirit-talker', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.STICKY_FINGERS: return get('character-trait-sticky-fingers', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.RIDER: return get('character-trait-rider', [ character.name ]);
        case ENUM_CHARACTER_TRAITS.OCCULTIST: return get('character-trait-occultist', [character.name]);
        case ENUM_CHARACTER_TRAITS.COOL_HEADED: return get('character-trait-cool-headed', [character.name]);
        case ENUM_CHARACTER_TRAITS.SCEPTIC: return get('character-trait-sceptic', [ character.name ])
    }
}

const restCharacter = (character) => {
    const val = getRandomNumberInRange(character.stats.vit, character.stats.vit * 2)
    character.stamina = (character.stamina + val <= character.maxStamina) ? 
        character.stamina + val : character.maxStamina
}

/**
 * 
 * @param {object} character 
 * @param {object} currentDate 
 * @returns 
 */
const checkOldAgeHealth = (character, currentDate) => {
    const age = getAgeSimple(currentDate, character.birthDate)
    const healthDecreaseInterval = Math.floor(age * 0.1)
    const healthDecreaseChance = Math.floor((age - 40) * 2)
    if (healthDecreaseChance <= 0) { return false }
    if (chance(healthDecreaseChance)) {
        character.maxHealth -= Math.floor( getRandomNumberInRange(0, healthDecreaseInterval) * 0.5) 
        if (character.health > character.maxHealth) { character.health = character.maxHealth }
    }
    if (character.maxHealth < 10) {
        const diedChance = (10 - character.maxHealth) * 10
        character.isAlive = !chance(diedChance)
        if (!character.isAlive) { character.diedFrom = get('character-died-from-age') }
    }
    return !character.isAlive
}

/**
 * 
 * @param {{health: number; statuses:[ ENUM_HEALTH_STATUS ]}} character 
 * @returns { boolean } isAlive
 */
const isAlive = (character) => {
    if (character.health <= 0) {
        if (character.statuses.find(e => e == ENUM_HEALTH_STATUS.UNCONSCIOUS) == undefined) {
            character.statuses.push(ENUM_HEALTH_STATUS.UNCONSCIOUS)
        }
        return false
    }
    return true
}

/**
 * return value of character stat
 * @param {ENUM_STAT_NAMES} stat
 * @returns {Number}
 */
const getCharacterStatValue = (character, stat) => {
    switch (stat) {
        case ENUM_STAT_NAMES.str: return character.stats.str;
        case ENUM_STAT_NAMES.agi: return character.stats.agi;
        case ENUM_STAT_NAMES.vit: return character.stats.vit;
        case ENUM_STAT_NAMES.int: return character.stats.int;
        case ENUM_STAT_NAMES.wis: return character.stats.wis;
        case ENUM_STAT_NAMES.luc: return character.stats.luc;
        case ENUM_STAT_NAMES.cha: return character.stats.cha;
    }
}

const isCritical = (character) => {
    return ((character.health / character.maxHealth) * 100 < 10)
}

/**
 * 
 * @param {{id: text, name: text, race: ENUM_RACE_NAMES}} character 
 * @param {*} options 
 * @returns { { min: number, max: number } } min max age
 */
const getMinMaxAgeByAgeRange = (character, ageRange) => {
    if (character.race == ENUM_RACE_NAMES.human) {
        switch (ageRange) {
            case ENUM_AGE_RANGE.CHILD: return { min: RACE_AGE_CHILD_HUMAN_MIN, max: RACE_AGE_CHILD_HUMAN_MAX };
            case ENUM_AGE_RANGE.YOUNG: return { min: RACE_AGE_YOUNG_HUMAN_MIN, max: RACE_AGE_YOUNG_HUMAN_MAX };
            case ENUM_AGE_RANGE.MIDDLE_AGED: return { min: RACE_AGE_MIDDLE_AGED_HUMAN_MIN, max: RACE_AGE_MIDDLE_AGED_HUMAN_MAX };
            case ENUM_AGE_RANGE.OLD: return { min: RACE_AGE_OLD_HUMAN_MIN, max: RACE_AGE_OLD_HUMAN_MAX };
        }
    } else if (character.race == ENUM_RACE_NAMES.dwarf) {
        switch (ageRange) {
            case ENUM_AGE_RANGE.CHILD: return { min: RACE_AGE_CHILD_DWARF_MIN, max: RACE_AGE_CHILD_DWARF_MAX };
            case ENUM_AGE_RANGE.YOUNG: return { min: RACE_AGE_YOUNG_DWARF_MIN, max: RACE_AGE_YOUNG_DWARF_MAX };
            case ENUM_AGE_RANGE.MIDDLE_AGED: return { min: RACE_AGE_MIDDLE_AGED_DWARF_MIN, max: RACE_AGE_MIDDLE_AGED_DWARF_MAX };
            case ENUM_AGE_RANGE.OLD: return { min: RACE_AGE_OLD_DWARF_MIN, max: RACE_AGE_OLD_DWARF_MAX };
        }
    } else if (character.race == ENUM_RACE_NAMES.halfElf) {
        switch (ageRange) {
            case ENUM_AGE_RANGE.CHILD: return { min: RACE_AGE_CHILD_HALF_ELF_MIN, max: RACE_AGE_CHILD_HALF_ELF_MAX };
            case ENUM_AGE_RANGE.YOUNG: return { min: RACE_AGE_YOUNG_HALF_ELF_MIN, max: RACE_AGE_YOUNG_HALF_ELF_MAX };
            case ENUM_AGE_RANGE.MIDDLE_AGED: return { min: RACE_AGE_MIDDLE_AGED_HALF_ELF_MIN, max: RACE_AGE_MIDDLE_AGED_HALF_ELF_MAX };
            case ENUM_AGE_RANGE.OLD: return { min: RACE_AGE_OLD_HALF_ELF_MIN, max: RACE_AGE_OLD_HALF_ELF_MAX };
        }
    } else if (character.race == ENUM_RACE_NAMES.halfling) {
        switch (ageRange) {
            case ENUM_AGE_RANGE.CHILD: return { min: RACE_AGE_CHILD_HALFLING_MIN, max: RACE_AGE_CHILD_HALFLING_MAX };
            case ENUM_AGE_RANGE.YOUNG: return { min: RACE_AGE_YOUNG_HALFLING_MIN, max: RACE_AGE_YOUNG_HALFLING_MAX };
            case ENUM_AGE_RANGE.MIDDLE_AGED: return { min: RACE_AGE_MIDDLE_AGED_HALFLING_MIN, max: RACE_AGE_MIDDLE_AGED_HALFLING_MAX };
            case ENUM_AGE_RANGE.OLD: return { min: RACE_AGE_OLD_HALFLING_MIN, max: RACE_AGE_OLD_HALFLING_MAX };
        }
    } else if (character.race == ENUM_RACE_NAMES.highElf || character.race == ENUM_RACE_NAMES.darkElf || character.race == ENUM_RACE_NAMES.woodElf) {
        switch (ageRange) {
            case ENUM_AGE_RANGE.CHILD: return { min: RACE_AGE_CHILD_ELF_MIN, max: RACE_AGE_CHILD_ELF_MAX };
            case ENUM_AGE_RANGE.YOUNG: return { min: RACE_AGE_YOUNG_ELF_MIN, max: RACE_AGE_YOUNG_ELF_MAX };
            case ENUM_AGE_RANGE.MIDDLE_AGED: return { min: RACE_AGE_MIDDLE_AGED_ELF_MIN, max: RACE_AGE_MIDDLE_AGED_ELF_MAX };
            case ENUM_AGE_RANGE.OLD: return { min: RACE_AGE_OLD_ELF_MIN, max: RACE_AGE_OLD_ELF_MAX };
        }
    }
    return {min: 20, max: 40}
}

module.exports = {
    getCharacterStatValue,
    validateCharacterCompabilityForMarige,
    setRelation,
    checkOldAgeHealth,
    getTraitDescription,
    getCharacterWithTrait,
    restCharacter,
    isAlive,
    isCritical,
    getMinMaxAgeByAgeRange
}