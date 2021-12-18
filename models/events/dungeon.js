const { copyObject, chance, getRandomNumber, getRandomElementFromArray } = require('../../lib/utils')
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
const monsterBuilder = require('../../build/monster')
const charachterBuilder = require('../../build/character')
const objects = require('../../generic/objects')

const flickeringLights = () => {
    const e = copyObject(objects.dungeonEventItem)
    e.status = ENUM_EVENT_ITEM_STATUS.UNRESOLVED
    e.description = ''
    e.execute = (output, party) => {
        e.status = ENUM_EVENT_ITEM_STATUS.RESOLVED
    }

    return e
}


module.exports = {
    flickeringLights
}