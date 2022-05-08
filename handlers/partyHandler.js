const b = require('../build/party')
const { noOfAdventuringParties } = require('../config')
const { getStartingPosition } = require('../models/party')

/**
 * 
 * @param {object} options 
 * @returns {Array} of party object
 */
const createParties = async (options = {}) => {
    const _noOfAdventuringParties = (options.noOfAdventuringParties) ? options.noOfAdventuringParties : noOfAdventuringParties
    const parties = []
    for (let i = 0; i < _noOfAdventuringParties; i++) {
        parties.push(await b.build(options))
    }
    for (let party of parties) {
        party.position = getStartingPosition(options.dwellings)
    }
    return parties
}

module.exports = {
    createParties
}