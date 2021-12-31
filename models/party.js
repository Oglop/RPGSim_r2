
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { restThreshold, restThresholdMultiplyer } = require('../config')
const { getPercetage } = require('../lib/utils')
const { 
    ENUM_QUEST_STATUS
} = require('../generic/enums')


const checkForRest = (party) => {
    if (getPercetage(party.members.length * restThresholdMultiplyer, party.food) <= restThreshold) {
        return true
    }
    return false
}

const rest = (world, party) => {
    try {

    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'rest'
        err.message = e.message
        logError(err)
    }
}

const travel = (world, party) => {
    try {

    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'travel'
        err.message = e.message
        logError(err)
    }
}

const quest = (world, party) => {
    try {

    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'quest'
        err.message = e.message
        logError(err)
    }
}

const consumeFood = (party) => {
    try {

    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'consumeFood'
        err.message = e.message
        logError(err)
    }
}


module.exports = {
    checkForRest,
    rest,
    travel,
    quest,
    consumeFood
}