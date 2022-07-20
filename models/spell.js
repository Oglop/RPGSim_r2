const { 
    ENUM_SPELLS,
    ENUM_STAT_NAMES
} = require('../generic/enums')
const {
    copyArray,
    getRandomNumberInRange
} = require('../lib/utils')
const {
    checkCharacterStat
} = require('../models/skill')

/**
 * TODO
 * @param {object} spell 
 * @param {object} character 
 * @returns {}
 */
const castSpell = (spell, character) => {
    if (character.stamina >= spell.cost) {
        const success = checkCharacterStat(character, ENUM_STAT_NAMES.int)
        if(success.length) {
            character.stamina -= spell.cost


            return true
        }
    }
    return false
}


/**
 * 
 * @param {object} character 
 * @return {charachter[]}
 */
const characterHasSpell = (character, spellType) => {
    if (character.spells.find(s => s.type == spellType) != undefined) { return [ character ] }
    return []
}

/**
 * 
 * @param {Array: character} party 
 * @return {charachter}
 */
const partyHasSpell = (party, spellType) => {
    const successes = []
    for(let member of party.members) {
        const hasSpell = characterHasSpell(member, spellType)
        if (hasSpell.length) { successes.push(hasSpell[0]) }
    }
    return successes
}

module.exports = {
    partyHasSpell, 
    characterHasSpell, 
    castSpell
}