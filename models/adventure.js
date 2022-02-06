const { getRandomNumberInRange, copyObject, chance } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { WORLD_SIZE } = require('../generic/statics')
const { 
    ENUM_EXPLORE_STATUS,
    ENUM_EXPLORE_DIR,
    ENUM_QUEST_STATUS,
    ENUM_ADVENTURE_DAILY_ACTION,
    ENUM_BIOMES,
    ENUM_EVENT_TYPE,
    ENUM_PARTY_STATE,
    ENUM_EVENT_ITEM_STATUS,
    ENUM_PERSONALITY_DEALS_RESULT,
    ENUM_SKILL_NAMES,
    ENUM_CHARACTER_TRAITS
} = require('../generic/enums')
const { questLocationRadius } = require('../config')
const { 
    restParty,
    exhaustParty,
    isInDwelling, 
    checkForRest, 
    isOnQuestLocation
} = require('../models/party')
const { get } = require('../localization')
const bEvent = require('../build/event')
const mMap = require('../models/map')
const { getDwellingsFromMap, getPointOfRandomDwelling } = require('../models/map')
const { findShortestPath } = require('../models/pathFinding')
const { partyDailyRelationShipRoll } = require('./personality')
const { checkPartySkill } = require('./skill')
/**
 * Check if party is able to travel to new ppositon based io biome
 * after move execute travel event
 * @param {object} world 
 * @param {object} party 
 * @param {object} output 
 */
const travel = (world, party, output) => {
    try {
        let travelDifficulty = 0
        switch (world.map[party.position.x][party.position.y].biome) {
            case ENUM_BIOMES.badlands: travelDifficulty = 10; break;
            case ENUM_BIOMES.dessert: travelDifficulty = 20; break;
            case ENUM_BIOMES.farmlands: travelDifficulty = 5; break;
            case ENUM_BIOMES.forest: travelDifficulty = 25; break;
            case ENUM_BIOMES.hills: travelDifficulty = 30; break;
            case ENUM_BIOMES.lake: travelDifficulty = 0; break;
            case ENUM_BIOMES.mountains: travelDifficulty = 40; break;
            case ENUM_BIOMES.plains: travelDifficulty = 20; break;
            case ENUM_BIOMES.swamp: travelDifficulty = 15; break;
        }
        const i = getRandomNumberInRange(1, 100)
        if (i >= travelDifficulty) {
            travelInDirection(party, output)
        } else {
            output.print(get('adventure-travel-failed', [ party.name ]))
        }
        const e = bEvent.build(world, output, ENUM_EVENT_TYPE.TRAVEL, undefined)
        e.items[0].execute(party)

        exhaustParty(party)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'travel'
        err.message = e.message
        logError(err)
    }
}

const quest = (world, party, output) => {
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
 * returns a random position within allwed radius from party
 * @param {*} world 
 * @param {*} party 
 */
const getQuestLocation = (world, party) => {
    try {
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
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getQuestLocation'
        err.message = e.message
        logError(err)
    }
}

/**
 * Add or remove postion x or y according to postion 0 in party.path
 * shifts path after operation is done
 * @param {object} world 
 * @param {object} party 
 */
const travelInDirection = (party, output) => {
    try {
        if (party.path.length) {
            if (party.path[0] === ENUM_EXPLORE_DIR.east) {
                party.position.x = (party.position.x + 1 < WORLD_SIZE) ? party.position.x + 1 : party.position.x
                output.print(get('adventure-travel-east', [ party.name ]))
            } else if (party.path[0] === ENUM_EXPLORE_DIR.north) {
                party.position.y = (party.position.y - 1 >= 0) ? party.position.y - 1 : party.position.y
                output.print(get('adventure-travel-north', [ party.name ]))
            } else if (party.path[0] === ENUM_EXPLORE_DIR.west) { 
                party.position.x = (party.position.x - 1 >= 0) ? party.position.x - 1 : party.position.x
                output.print(get('adventure-travel-west', [ party.name ]))
            } else if (party.path[0] === ENUM_EXPLORE_DIR.south) {
                party.position.y = (party.position.y + 1 < WORLD_SIZE) ? party.position.y + 1 : party.position.y
                output.print(get('adventure-travel-south', [ party.name ]))
            }
            party.path.shift()
        }
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'travelInDirection'
        err.message = e.message
        logError(err)
    }
}

const getAdventureDailyAction = (world, party) => {
    try {
        const rest = checkForRest(party)
        const inTown = isInDwelling(world, party)
        const onQuestPosition = isOnQuestLocation(party)
        const isTraveling = party.path.length > 0

        /*if (!rest && !inTown && !onQuestPosition && !isTraveling) {


        }*/

        if (!isTraveling && !inTown && party.quest != ENUM_QUEST_STATUS.IN_PROGRESS) {
            const townPoint = getPointOfRandomDwelling(world.map) 
            party.path = findShortestPath(party.position, world.map, townPoint)
            party.state = ENUM_PARTY_STATE.TRAVEL
        }
        if (isTraveling) {
            return ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP
        }
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
        return ENUM_ADVENTURE_DAILY_ACTION.REST_MAP
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getAdventureDailyAction'
        err.message = e.message
        logError(err)
    }
}

const biomeRestMultiplier = (biome) => {
    switch (biome) {
        case ENUM_BIOMES.badlands: return 0.4
        case ENUM_BIOMES.dessert: return 0.2
        case ENUM_BIOMES.farmlands: return 1.0
        case ENUM_BIOMES.forest: return 2.4
        case ENUM_BIOMES.hills: return 1.6
        case ENUM_BIOMES.lake: return 0.6
        case ENUM_BIOMES.mountains: return 0.4
        case ENUM_BIOMES.plains: return 1.4
        case ENUM_BIOMES.swamp: return 0.8
    }
    return 1.0
}

/**
 * Rest party
 * @param {object} world
 * @param {object} party 
 */
const restMap = (world, party, output) => {
    try {
        const currentBiome = mMap.getBiomeAtPoint(map, party.position)
        const multiplier = biomeRestMultiplier(currentBiome)
        const successesHunt = checkPartySkill(party, ENUM_SKILL_NAMES.hunting)
        const successesFishing = checkPartySkill(party, ENUM_SKILL_NAMES.fishing)
        const successRandom = getRandomNumberInRange(1, party.members.length * 2)
        const successesFinal = Math.floor( (successesHunt.length + successesFishing.length + successRandom) * multiplier )
        party.food += successesFinal
        if (successesHunt.length) { output.print(get('event-rest-hunt-success', [successesHunt[0].name] )) }
        if (successesFishing.length) { output.print(get('event-rest-fishing-success', [successesFishing[0].name] )) }
        const e = bEvent.build(world, output, ENUM_EVENT_TYPE.REST, undefined)
        output.print(e.items[0].description)
        e.items[0].execute(party)
        output.print(e.items[0].resolutionText)
        const enumPersonalityResult = (e.resolution == ENUM_EVENT_ITEM_STATUS.SUCCESS) ? ENUM_PERSONALITY_DEALS_RESULT.GOOD : 
            (e.resolution == ENUM_EVENT_ITEM_STATUS.RESOLVED) ? ENUM_PERSONALITY_DEALS_RESULT.NORMAL : ENUM_PERSONALITY_DEALS_RESULT.BAD
        restParty(party)
        partyDailyRelationShipRoll(party, enumPersonalityResult)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'restMap'
        err.message = e.message
        logError(err)
    }
}

const restTown = (world, party, output) => {
    try {
        output.print(get('event-rest-town-resting', [ party.name ] ))

        let characterTraitEvents = []
        if (chance(10)) {
            const i = getRandomNumberInRange(0, 4)
            switch (i) {
                case 0: characterTraitEvents = getCharacterWithTrait(party, ENUM_CHARACTER_TRAITS.ALCOHOLIC); break;
                case 1: characterTraitEvents = getCharacterWithTrait(party, ENUM_CHARACTER_TRAITS.GAMBLER); break;
                case 2: characterTraitEvents = getCharacterWithTrait(party, ENUM_CHARACTER_TRAITS.DARK_PAST); break;
                case 3: characterTraitEvents = getCharacterWithTrait(party, ENUM_CHARACTER_TRAITS.VETERAN); break;
                case 4: characterTraitEvents = getCharacterWithTrait(party, ENUM_CHARACTER_TRAITS.TRAVLER); break;
            }
            if (characterTraitEvents.length) {
                if (i == 0) {
                    
                }
            }
        }
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'rest'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    getQuestLocation,
    getAdventureDailyAction,
    travel,
    restMap,
    quest,
    restTown,
    travel
}