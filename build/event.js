const { copyObject, chance, getRandomNumber, getRandomElementFromArray } = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_EVENT_TYPE, ENUM_ENEMY_STRENGTH, ENUM_ENEMY_TYPE, ENUM_GAME_MODE } = require('../generic/enums')
const { getDwellingsFromMap } = require('../models/map')
const { getLeaderByDwellingId } = require('../models/family')
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

    // 
    const i1 = copyObject(objects.eventItem)
    i1.description = `Scouts from ${dwelling.name} report of a raiding party of ${monster.name}s approaching.`
    event.items.push(i1)
    l1.execute = () => {
        const leader =  getLeaderByDwellingId(dwelling.id)
        
    }

    // 
    const i2 = copyObject(objects.eventItem)
    i2.description = `The defenders of ${dwelling.name} is riding out to meet the threat.`
}

const powerStrife = (event, world) => {

}


/**
 * 
 * @param {Object} event event 
 * @param {Object} world 
 * @returns {Object} event
 */
const getHistoryEvent = (event, world, options) => {
    const i = getRandomNumber(1)
    
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


