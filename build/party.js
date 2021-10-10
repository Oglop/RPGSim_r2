const objects = require('../generic/objects')
const characterBuilder = require('../build/character')
const {  } = require('../generic/enums')
const { chance, copyObject, generateID } = require('../lib/utils')

/**
 * Builds party object
 * 
 * @param {object} options 
 * @returns {object} party
 */
module.exports.build = (options) => {
    const noOfMembers = (options.partySize) ? options.partySize : 6
    const party = copyObject(objects.party)
    party.id = generateID()
    for (let i = 0; i < noOfMembers; i++) {
        party.members.push(characterBuilder.build())
    }

    return party
}

