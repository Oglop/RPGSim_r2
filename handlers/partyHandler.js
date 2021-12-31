const b = require('../build/party')
const { noOfAdventuringParties } = require('../config')

/**
 * 
 * @param {object} options 
 * @returns {Array} of party object
 */
const createParties = (options = {}) => {
    const _noOfAdventuringParties = (options.noOfAdventuringParties) ? options.noOfAdventuringParties : noOfAdventuringParties
    const parties = []
    for (let i = 0; i < _noOfAdventuringParties; i++) {
        parties.push(b.build(options))
    }
    return parties
}







module.exports = {
    createParties
}