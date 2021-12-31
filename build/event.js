const { 
    copyObject, 
    chance, 
    getRandomNumber, 
    getRandomElementFromArray 
} = require('../lib/utils')
const objects = require('../generic/objects')
const {
    advisor,
    badWeather,
    raiders,
    questingKnight
} = require('../models/events/history')
const {
    flickeringLights
} = require('../models/events/dungeon')
const { ENUM_EVENT_TYPE } = require('../generic/enums')


/**
 * 
 * 
 * @param {Object} event event 
 * @param {Object} world 
 * @returns {Object} event
 */
const getHistoryEvent = (event, world, options) => {
    const i = getRandomNumber(3)
    switch(i) {
        case 1: event = raiders(event, world); break;
        case 2: event = questingKnight(event, world); break;
        case 3: event = badWeather(event, world); break;
        case 4: event = advisor(event, world); break;
    }
    
    return event
}

const getDungeonEvent = (options) => {
    const i = getRandomNumber(1)
    switch(i) {
        case 1: return flickeringLights();
    }
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
        case ENUM_EVENT_TYPE.DUNGEON: return getDungeonEvent(options)
    }

}

