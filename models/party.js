
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { restThreshold, restThresholdMultiplyer } = require('../config')
const { getPercetage } = require('../lib/utils')
const { 
    ENUM_QUEST_STATUS
} = require('../generic/enums')
const { get } = require('../localization')


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

/**
 * returns true if current location is the same as
 * @param {object} world 
 * @param {object} party 
 * @param {object} output 
 * @returns {boolean}
 */
const isInDwelling = (world, party, output) => {
    try {
        if (world.map[party.position.x][party.position.y].dwelling != undefined) {
            output.print(get('party-is-in-dwelling', [ party.name, world.map[party.position.x][party.position.y].dwelling.name ]))
            return true
        }
        return false
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'isInDwelling'
        err.message = e.message
        logError(err)
    }
}

/**
 * return true if party position is same as quest location
 * @param {object} party 
 * @returns {boolean}
 */
const isOnQuestLocation = (party) => {
    try {
        if ( party.position.x == party.questGoal.x && party.position.y == party.questGoal.y ) {
            return true
        }
        return false
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'isOnQuestLocation'
        err.message = e.message
        logError(err)
    }
}

/**
 * returns a position 
 * @param {*} world 
 */
const getStartingPosition = (world) => {
    let validPosition = false
    while (!validPosition) {
        const x = getRandomNumberInRange(0, WORLD_SIZE)
        const y = getRandomNumberInRange(0, WORLD_SIZE)
        if (world.map[x][y].exploreStatus != ENUM_EXPLORE_STATUS.obstacle) {
            const p = copyObject(objects.point)
            p.x = x 
            p.y = y
            return p
        }
    }
}

const consumeFood = (party) => {
    try {
        const i = noOfAliveMembers(party)
        party.food = (party.food - i >= 0) ? party.food - i : 0 
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'consumeFood'
        err.message = e.message
        logError(err)
    }
}

const noOfAliveMembers = (party) => {
    return party.members.filter(x => x.isAlive === true).length
}


module.exports = {
    checkForRest,
    rest,
    travel,
    quest,
    consumeFood,
    isInDwelling,
    noOfAliveMembers,
    isOnQuestLocation,
    getStartingPosition
}