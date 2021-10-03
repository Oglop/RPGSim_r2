const { copyObject, chance, getRandomNumber, getRandomElementFromArray } = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_EVENT_TYPE, ENUM_ENEMY_STRENGTH, 
    ENUM_ENEMY_TYPE, 
    ENUM_GAME_MODE, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_EVENT_ITEM_STATUS } = require('../generic/enums')
const { getDwellingsFromMap } = require('../models/map')
const { 
    getLeaderByDwellingId,
    getFamiliesByDwellingId,
    distributInfluence,
    getFamilyIdByCharacterId } = require('../models/family')
const { personalityDealsWith } = require('../models/personality')
const { getSeason } = require('../lib/time')
const monsterBuilder = require('../build/monster')




const raiders = (event, world) => {
    const dwellings = getDwellingsFromMap(world.map)
    const dwelling = getRandomElementFromArray(dwellings)
    const monster = monsterBuilder.build({
        mode: ENUM_GAME_MODE.HISTORY,
        strength: ENUM_ENEMY_STRENGTH.WEAK,
        type: ENUM_ENEMY_TYPE.VILE
    })

    const i1 = copyObject(objects.eventItem)
    i1.description = `Scouts from ${dwelling.name} report of a raiding party of ${monster.name}s approaching.`    
    i1.execute = (previousResult) => {
        const leader =  getLeaderByDwellingId(world.families, dwelling.id)
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.INITIATIVE)
        if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = `${leader.name} prepares a force to ambush the ${monster.name}s`
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = `${dwelling.name} scrambles it´s defenses.`
        }
    }
    event.items.push(i1)

    const i2 = copyObject(objects.eventItem)
    i2.description = `The defenders of ${dwelling.name} are riding out to meet the threat.`
    i2.execute = (previousResult) => {
        const leader =  getLeaderByDwellingId(world.families, dwelling.id)
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.STRATEGY)
        if (previousResult == ENUM_EVENT_ITEM_STATUS.SUCCESS) {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i2.resolutionText = `Due to early initiative the ${monster.name} raiders are fought off, a great victory for ${leader.name}.`
            const fams = getFamiliesByDwellingId(world.families, dwelling.id)
            distributInfluence(fams, undefined, 6, leader.id)
        } else if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD || result == ENUM_PERSONALITY_DEALS_RESULT.NORMAL) {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i2.resolutionText = `After some hard fighting the defenders of ${dwelling.name} succeeds in fighting off the ${monster.name} raiders.`
        } else {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.FAILURE
            i2.resolutionText = `Taken by supprise the ${monster.name} raiders defeats the defenders. ${dwelling.name} was sacked!`
            const fams = getFamiliesByDwellingId(world.families, dwelling.id)
            distributInfluence(fams, undefined, -10, leader.id)
        }
    }
    event.items.push(i2)
    return event
}


const powerStrife = (event, world) => {

}


/**
 * 
 * 
 * @param {Object} event event 
 * @param {Object} world 
 * @returns {Object} event
 */
const getHistoryEvent = (event, world, options) => {
    const i = getRandomNumber(1)
    event = raiders(event, world)
    return event
}

/**
 * 
 * 
 * @param {Object} world 
 * @param {Object} output 
 * @param {ENUM_EVENT_TYPE} eventType 
 * @param {Obejct} options 
 * 
 * @returns {Object} event
 */
module.exports.build = (world, output, eventType, options) => {
    const e = copyObject(objects.event)
    e.output = output
    switch (eventType) {
        case ENUM_EVENT_TYPE.HISTORY: return getHistoryEvent(e, world)
    }

}

