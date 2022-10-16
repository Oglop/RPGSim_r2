const { copyObject, chance, getRandomNumber, getRandomElementFromArray } = require('../../lib/utils')
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
const { personalityDealsWith } = require('../personality')
const { getSeason } = require('../../lib/time')
const monsterBuilder = require('../../build/enemy')
const charachterBuilder = require('../../build/character')
const objects = require('../../generic/objects')
const { Output } = require('../../output/output')

const flickeringLights = () => {
    const e = copyObject(objects.dungeonEventItem)
    e.status = ENUM_EVENT_ITEM_STATUS.UNRESOLVED
    e.description = get('dungeon-flickeringlights-description')
    e.execute = (party) => {
        Output.print('')
        e.status = ENUM_EVENT_ITEM_STATUS.RESOLVED
    }

    return e
}


module.exports = {
    flickeringLights
}