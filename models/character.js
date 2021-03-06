const objects = require('../generic/objects')
const { copyObject, chance, getRandomElementFromArray, getRandomNumberInRange } = require('../lib/utils')
const { MAX_MARRIAGE_AGE_GAP, 
    MIN_MARRIAGE_AGE,
    MAX_RELATIONS_POINTS,
    MIN_RELATIONS_POINTS 
} = require('../generic/statics')
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const { ENUM_CHARACTER_TRAITS } = require('../generic/enums')
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

module.exports = {
    validateCharacterCompabilityForMarige,
    setRelation,
    checkOldAgeHealth,
    getTraitDescription,
    getCharacterWithTrait,
    restCharacter
}