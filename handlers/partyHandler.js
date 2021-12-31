const b = require('../build/party')
const m = require('../models/party')
const { noOfAdventuringParties } = require('../config')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')

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

const processParties = (world) => {
    try {
        for (let p of world.parties) {
            let action = undefined
            // set goal like quest
            if (m.checkForRest(p)) {
                m.rest(world, p)
            } else {
                m.quest(world, p)
            }

            // daily event
        }

        for (let p of world.parties) {
            // set goal like quest
            m.consumeFood()

            // daily event
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'processDay'
        err.message = e.message                                                                                                                      
        logError(err)
    }
}





module.exports = {
    createParties,
    processParties
}