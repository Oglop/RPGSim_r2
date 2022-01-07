const { 
    copyObject, 
    chance, 
    getRandomNumber, 
    getRandomElementFromArray, 
    getRandomNumberInRange
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
const eRest = require('../models/events/rest')


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

const getRestEvent = (event, world, party, options) => {
    const i = getRandomNumberInRange(0, 9)
    switch(i) {
        case 0: return eRest.argument(event, world, party, options);
        case 1: return eRest.coldNight(event, world, party, options);
        case 2: return eRest.darkNight(event, world, party, options);
        case 3: return eRest.deepSleep(event, world, party, options);
        case 4: return eRest.hunting(event, world, party, options);
        case 5: return eRest.seasonalEffect(event, world, party, options);
        case 6: return eRest.story(event, world, party, options);
        case 7: return eRest.travelers(event, world, party, options);
        case 8: return eRest.weaponPractice(event, world, party, options);
        case 9: return eRest.dreams(event, world, party, options);
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
        case ENUM_EVENT_TYPE.REST: return getRestEvent(e, world, options.party, options)
    }

}

