const { point } = require('../generic/objects')
const objects = require('../generic/objects')
const { copyObject } = require('../lib/utils')
const { MAX_MARRIAGE_AGE_GAP, 
    MIN_MARRIAGE_AGE,
    MAX_RELATIONS_POINTS,
    MIN_RELATIONS_POINTS 
} = require('../generic/statics')
const { logError } = require('../data/errorFile')

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


module.exports = {
    validateCharacterCompabilityForMarige,
    setRelation
}