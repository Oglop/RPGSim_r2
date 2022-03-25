const { copyObject, chance, getRandomNumber, getRandomElementFromArray, getRandomNumberInRange } = require('../../lib/utils')
const { get } = require('../../localization')
const { ENUM_EVENT_TYPE, ENUM_ENEMY_STRENGTH, 
    ENUM_ENEMY_TYPE, 
    ENUM_GAME_MODE, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_EVENT_ITEM_STATUS,
    ENUM_GENDER, 
    ENUM_JOB_NAMES, 
    ENUM_RACE_NAMES, 
    ENUM_LANGUAGES, 
    ENUM_PERSONALITIES,
    ENUM_SEASONS
} = require('../../generic/enums')
const { personalityDealsWith } = require('../../models/personality')
const { getSeason } = require('../../lib/time')
const bMonster = require('../../build/monster')
const bCharacter = require('../../build/character')
const objects = require('../../generic/objects')

const farm = (event, world, options) => {
    const i1 = copyObject(objects.eventItem)
    i1.description = get('event-date-bloodmoon-description')
    i1.execute = (party) => {
        i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
        i1.resolutionText = get('event-date-bloodmoon-resolution')
    }
    event.items.push(i1)
    return event
}

const river = (event, world, options) => {
    const i1 = copyObject(objects.eventItem)
    i1.description = get('event-date-bloodmoon-description')
    i1.execute = (party) => {
        i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
        i1.resolutionText = get('event-date-bloodmoon-resolution')
    }
    event.items.push(i1)
    return event
}

module.exports = {
    farm,
    river
}