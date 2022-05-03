const { getRandomNumberInRange, copyObject, chance, point2d } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { WORLD_SIZE } = require('../generic/statics')
const { getStoryEntry } = require('../build/story')
const { 
    ENUM_COMMANDS,
    ENUM_STORY_TYPE,
    ENUM_STORY_TAGS,
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
const { getDwellingsFromMap, getPointOfRandomDwelling, getClosestDwelling } = require('../models/map')
const { findShortestPath } = require('../models/pathFinding')
const { partyDailyRelationShipRoll } = require('./personality')
const { checkPartySkill } = require('./skill')
const { executeCommands } = require('../persistance/commandQueue')

/**
 * Check if party is able to travel to new ppositon based io biome
 * after move execute travel event
 * @param {object} world 
 * @param {object} party 
 */
const travel = async (world, party) => {
    let step = 'initial'
    try {
        
        if (!party.path.length) {
            step = 'find shortest path'
            party.path = findShortestPath(party.position, world.map, party.questGoal)
        }
        step = `party.path: ${party.path}`
        let travelDifficulty = 0
        switch (world.map[party.position.x][party.position.y].biome) {
            case ENUM_BIOMES.badlands: travelDifficulty = 10; break;
            case ENUM_BIOMES.dessert: travelDifficulty = 5; break;
            case ENUM_BIOMES.farmlands: travelDifficulty = 5; break;
            case ENUM_BIOMES.forest: travelDifficulty = 20; break;
            case ENUM_BIOMES.hills: travelDifficulty = 10; break;
            case ENUM_BIOMES.lake: travelDifficulty = 0; break;
            case ENUM_BIOMES.mountains: travelDifficulty = 15; break;
            case ENUM_BIOMES.plains: travelDifficulty = 5; break;
            case ENUM_BIOMES.swamp: travelDifficulty = 10; break;
        }
        step = `travelDifficulty: ${travelDifficulty}`
        const i = getRandomNumberInRange(1, 100)
        if (i >= travelDifficulty) {
            await  travelInDirection(party)
        } else {
            await executeCommands([
                { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('adventure-travel-failed', [ party.name ]) ,party.id, ENUM_STORY_TYPE.ADVENTURE, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
            ])
        }
        step = `pre build event`
        const e = bEvent.build(world, ENUM_EVENT_TYPE.TRAVEL, undefined)
        step = `event execute: ${JSON.stringify(e)}`
        e.items[0].execute(party)
        step = `exhaustParty: ${JSON.stringify(party)}`
        exhaustParty(party)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'travel'
        err.step = step
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
const travelInDirection = async (party) => {
    try {
        if (party.path.length) {
            if (party.path[0] === ENUM_EXPLORE_DIR.east) {
                party.position.x = (party.position.x + 1 < WORLD_SIZE) ? party.position.x + 1 : party.position.x
                await executeCommands([
                    { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('adventure-travel-east', [ party.name ]),party.id, ENUM_STORY_TYPE.ADVENTURE, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
                ])
            } else if (party.path[0] === ENUM_EXPLORE_DIR.north) {
                party.position.y = (party.position.y - 1 >= 0) ? party.position.y - 1 : party.position.y
                await executeCommands([
                    { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('adventure-travel-north', [ party.name ]),party.id, ENUM_STORY_TYPE.ADVENTURE, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
                ])
            } else if (party.path[0] === ENUM_EXPLORE_DIR.west) { 
                party.position.x = (party.position.x - 1 >= 0) ? party.position.x - 1 : party.position.x
                await executeCommands([
                    { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('adventure-travel-west', [ party.name ]),party.id, ENUM_STORY_TYPE.ADVENTURE, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
                ])
            } else if (party.path[0] === ENUM_EXPLORE_DIR.south) {
                party.position.y = (party.position.y + 1 < WORLD_SIZE) ? party.position.y + 1 : party.position.y
                await executeCommands([
                    { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('adventure-travel-south', [ party.name ]),party.id, ENUM_STORY_TYPE.ADVENTURE, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
                ])
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

const getAdventureDailyAction = async (world, party) => {
    try {
        const rest = checkForRest(party)
        const inTown = await isInDwelling(world, party)
        const onQuestPosition = isOnQuestLocation(party)
        const isTraveling = party.path.length > 0

        /*if (!rest && !inTown && !onQuestPosition && !isTraveling) {


        }*/

        if (!isTraveling && !inTown && party.quest != ENUM_QUEST_STATUS.IN_PROGRESS) {
            const townPoint = getClosestDwelling(world.map, party.position) 
            party.questGoal = point2d(townPoint.x, townPoint.y)
            party.state = ENUM_PARTY_STATE.TRAVEL
            return ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP
        }if (onQuestPosition && party.quest == ENUM_QUEST_STATUS.IN_PROGRESS ) {
            return ENUM_ADVENTURE_DAILY_ACTION.ATEMPT_QUEST
        }
        if (isTraveling && !rest) {
            return ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP
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
        case ENUM_BIOMES.farmlands: return 1.5
        case ENUM_BIOMES.forest: return 2.5
        case ENUM_BIOMES.hills: return 1.5
        case ENUM_BIOMES.lake: return 0.5
        case ENUM_BIOMES.mountains: return 0.5
        case ENUM_BIOMES.plains: return 1.5
        case ENUM_BIOMES.swamp: return 0.8
    }
    return 1.0
}

/**
 * Rest party
 * @param {object} world
 * @param {object} party 
 */
const restMap = async (world, party) => {
    const commands = []
    try {
        const currentBiome = mMap.getBiomeAtPoint(world.map, party.position)
        const multiplier = biomeRestMultiplier(currentBiome)
        const successesHunt = checkPartySkill(party, ENUM_SKILL_NAMES.hunting)
        const successesFishing = checkPartySkill(party, ENUM_SKILL_NAMES.fishing)
        const successRandom = getRandomNumberInRange(1, party.members.length * 2)
        const successesFinal = Math.floor( (successesHunt.length + successesFishing.length + successRandom) * multiplier )
        party.food += successesFinal + party.members.length

        
        if (successesHunt.length) 
        { 
            commands.push({
                command: ENUM_COMMANDS.INSERT_STORY,
                data: getStoryEntry( get('event-rest-hunt-success', [successesHunt[0].name] ), party.id, ENUM_STORY_TYPE.ADVENTURE, { tag: ENUM_STORY_TAGS.PARAGRAPH } )
            })
        }
        if (successesFishing.length) 
        { 
            commands.push({
                command: ENUM_COMMANDS.INSERT_STORY,
                data: getStoryEntry( get('event-rest-fishing-success', [successesFishing[0].name] ), party.id, ENUM_STORY_TYPE.ADVENTURE, { tag: ENUM_STORY_TAGS.PARAGRAPH } )
            })
        }

        const e = bEvent.build(world, ENUM_EVENT_TYPE.REST, {party})
        commands.push({
            command: ENUM_COMMANDS.INSERT_STORY,
            data: getStoryEntry( e.items[0].description, party.id, ENUM_STORY_TYPE.ADVENTURE, { tag: ENUM_STORY_TAGS.PARAGRAPH } )
        })
        e.items[0].execute(party)
        commands.push({
            command: ENUM_COMMANDS.INSERT_STORY,
            data: getStoryEntry( e.items[0].resolutionText, party.id, ENUM_STORY_TYPE.ADVENTURE, { tag: ENUM_STORY_TAGS.PARAGRAPH } )
        })

        const enumPersonalityResult = (e.items[0].resolution == ENUM_EVENT_ITEM_STATUS.SUCCESS) ? ENUM_PERSONALITY_DEALS_RESULT.GOOD : 
            (e.items[0].resolution == ENUM_EVENT_ITEM_STATUS.RESOLVED) ? ENUM_PERSONALITY_DEALS_RESULT.NORMAL : 
            ENUM_PERSONALITY_DEALS_RESULT.BAD
        restParty(party)
        partyDailyRelationShipRoll(party, enumPersonalityResult)

        await executeCommands(commands)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'restMap'
        err.message = e.message
        logError(err)
    }
}

const restTown = (world, party) => {
    try {
        //output.print(get('event-rest-town-resting', [ party.name ] ))

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