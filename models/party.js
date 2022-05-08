
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { restThreshold, restThresholdMultiplyer } = require('../config')
const { getPercetage, getRandomNumberInRange, copyObject, getRandomElementFromArray, point2d } = require('../lib/utils')
const { 
    ENUM_COMMANDS,
    ENUM_STORY_TYPE,
    ENUM_STORY_TAGS,
    ENUM_QUEST_STATUS,
    ENUM_EXPLORE_STATUS
} = require('../generic/enums')
const { get } = require('../localization')
const { WORLD_SIZE } = require('../generic/statics')
const { party } = require('../generic/objects')
const { getRoomByCoordinates } = require('../persistance').queries
const { executeCommands } = require('../persistance/commandQueue')
const { getDwellingByCoordinates } = require('../models/dwelling')
const { getStoryEntry } = require('../build/story')

const checkForRest = (party) => {
    if (getPercetage(party.members.length * restThresholdMultiplyer, party.food) <= restThreshold) {
        return true
    }
    return false
}

/**
 * returns true if current location is the same as
 * @param {object} world 
 * @param {object} party 
 * @param {object} output 
 * @returns {boolean}
 */
const isInDwelling = async (world, party) => {
    try {
        if (world.map[party.position.x][party.position.y].dwellingId != undefined) {
            const dwelling = getDwellingByCoordinates(party.position.x, party.position.y, world)
            await executeCommands([
                { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('party-is-in-dwelling', [ dwelling.name ]), party.id, ENUM_STORY_TYPE.ADVENTURE, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
            ])
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
 * @param {object} world 
 */
const getStartingPosition = (dwellings) => {
    try {
        const dwelling = getRandomElementFromArray(dwellings)
        return point2d(dwelling.x, dwelling.y)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getStartingPosition'
        err.message = e.message
        logError(err)
        return { x: 0, y: 0 }
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

const restParty = (party) => {
    try {
        for (let i = 0; i < party.members.length; i++) {
            const val = getRandomNumberInRange(party.members[i].stats.vit, party.members[i].stats.vit * 2)
            party.members[i].stamina = (party.members[i].stamina + val <= party.members[i].maxStamina) ? 
                party.members[i].stamina + val : party.members[i].maxStamina
        }
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'restParty'
        err.message = e.message
        logError(err)
    }
}

const exhaustParty = (party) => {
    try {
        for (let i = 0; i < party.members.length; i++) {
            if (party.members[i].isAlive) {
                const val = getRandomNumberInRange(0, 10)
                party.food -= (val <= 9) ? 1 : 2
            }
        }
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'exhaustParty'
        err.message = e.message
        logError(err)
    }
}

const noOfAliveMembers = (party) => {
    return party.members.filter(x => x.isAlive === true).length
}


const removeDeadMembers = (party) => {
    try {
        return party.members.filter(x => x.isAlive === true)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'removeDeadMembers'
        err.message = e.message
        logError(err)
    }
    return party
}

const getRandomAliveCharacter = (party) => {
    try {
        const arr =  party.members.filter(x => x.isAlive === true)
        return getRandomElementFromArray(arr)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getRandomAliveCharacter'
        err.message = e.message
        logError(err)
    }
    return party
}

module.exports = {
    checkForRest,
    consumeFood,
    isInDwelling,
    noOfAliveMembers,
    isOnQuestLocation,
    getStartingPosition,
    restParty,
    exhaustParty,
    removeDeadMembers,
    getRandomAliveCharacter
}