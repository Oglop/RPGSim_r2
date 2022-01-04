const { getRandomNumberInRange, copyObject } = require('../lib/utils')
const objects = require('../generic/objects')
const { WORLD_SIZE } = require('../generic/statics')
const { 
    ENUM_EXPLORE_STATUS,
    ENUM_EXPLORE_DIR,
    ENUM_QUEST_STATUS,
    ENUM_ADVENTURE_DAILY_ACTION 
} = require('../generic/enums')
const { questLocationRadius } = require('../config')
const { 
    isInDwelling, 
    checkForRest, 
    isOnQuestLocation
} = require('../models/party')

/**
 * returns a random position within allwed radius from party
 * @param {*} world 
 * @param {*} party 
 */
const getQuestLocation = (world, party) => {
    let validPosition = false
    while (!validPosition) {
        const x = getRandomNumberInRange(party.position.x - questLocationRadius, party.position.x + questLocationRadius)
        const y = getRandomNumberInRange(party.position.y - questLocationRadius, party.position.y + questLocationRadius)
        if (world.map[x][y].exploreStatus != ENUM_EXPLORE_STATUS.obstacle &&
            x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE) {
            const p = copyObject(objects.point)
            p.x = x 
            p.y = y
            return p
        }
    }
}

/**
 * 
 * @param {object} world 
 * @param {object} party 
 */
const travelInDirection = (party) => {
    if (party.path.length) {
        if (party.path[0] === ENUM_EXPLORE_DIR.east) {
            party.position.x = (party.position.x + 1 < WORLD_SIZE) ? party.position.x + 1 : party.position.x
        } else if (party.path[0] === ENUM_EXPLORE_DIR.north) {
            party.position.y = (party.position.y - 1 >= 0) ? party.position.y - 1 : party.position.y
        } else if (party.path[0] === ENUM_EXPLORE_DIR.west) { 
            party.position.x = (party.position.x - 1 >= 0) ? party.position.x - 1 : party.position.x
        } else if (party.path[0] === ENUM_EXPLORE_DIR.south) {
            party.position.y = (party.position.y + 1 < WORLD_SIZE) ? party.position.y + 1 : party.position.y
        }
    }
}

const getAdventureDailyAction = (world, party) => {
    try {
        const rest = checkForRest(party)
        const inTown = isInDwelling(world, party)
        const onQuestPosition = isOnQuestLocation(party)

        if (onQuestPosition && party.quest == ENUM_QUEST_STATUS.IN_PROGRESS ) {
            return ENUM_ADVENTURE_DAILY_ACTION.ATEMPT_QUEST
        }
        if (rest && inTown) {
            return ENUM_ADVENTURE_DAILY_ACTION.REST_TOWN
        }
        if (rest && !inTown) {
            return ENUM_ADVENTURE_DAILY_ACTION.REST_MAP
        }
        if (!rest && inTown) {
            return ENUM_ADVENTURE_DAILY_ACTION.EVENT_TOWN
        }
        if(onQuestPosition && party.quest == ENUM_QUEST_STATUS.FAILED || onQuestPosition && party.quest == ENUM_QUEST_STATUS.FINISHED) {
            return ENUM_ADVENTURE_DAILY_ACTION.SEEK_QUEST_TOWN
        }
        if(!onQuestPosition && party.quest == ENUM_QUEST_STATUS.IN_PROGRESS) {
            return ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP
        }
        if(party.quest == ENUM_QUEST_STATUS.SEEK_QUEST) {
            return ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP
        }

    } catch (e) {

    }
}

module.exports = {
    getQuestLocation,
    getAdventureDailyAction,
    travelInDirection
}