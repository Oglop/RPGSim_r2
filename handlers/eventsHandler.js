const { resolveEvent } = require('../models/event')
const eventBuilder = require('../build/event')
const { ENUM_EVENT_TYPE } = require('../generic/enums')
const { dungeonRoom } = require('../generic/objects')

const adventureEvents = (world, output) => {
    
}

const travelEvents = (world, output) => {
    const e = eventBuilder.build(world, output, ENUM_EVENT_TYPE.TRAVEL)
    resolveEvent(e, output)
}

/**
 * Creates a new event and processes active ones.
 * 
 * @param {Object} world 
 * @param {Object} output 
 */
const historyEvents = async (world, output) => {
    
        const e = eventBuilder.build(world, output, ENUM_EVENT_TYPE.HISTORY, { dwelling })
        world.events.history.push(e)
        for(let i = 0; i < world.events.history.length; i++) {
            resolveEvent(world.events.history[i], output)
        } 
    
      
}

const dungeonEvents = (dungeonRoom, output) => {
    
}

module.exports = {
    adventureEvents,
    historyEvents,
    dungeonEvents,
    travelEvents
}