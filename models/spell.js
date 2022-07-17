const { ENUM_SPELLS } = require('../generic/enums')
const {
    copyArray,
    getRandomNumberInRange
} = require('../lib/utils')

const castSpell = (spell) => {

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