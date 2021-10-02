const { copyObject, chance, getRandomNumber } = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_EVENT_TYPE } = require('../generic/enums')
const { getDwellingsFromMap } = require('../models/map')
const { getSeason } = require('../lib/time')


const eventInvasion = (event) => {

}

const powerStrife = (event) => {

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


