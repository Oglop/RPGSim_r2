const { resolveEvent } = require('../models/event')
const eventBuilder = require('../build/event')
const { ENUM_EVENT_TYPE } = require('../generic/enums')
const { dungeonRoom } = require('../generic/objects')
const { Output } = require('../output/output')

const adventureEvents = (world) => {
    
}

const travelEvents = (world) => {
    const e = eventBuilder.build(world, output, ENUM_EVENT_TYPE.TRAVEL)
    resolveEvent(e, output)
}

/**
 * Creates a new event and processes active ones.
 * 
 * @param {Object} world 
 * @param {Object} output 
 */
const historyEvents = async (world) => {
    
        const e = eventBuilder.build(world, ENUM_EVENT_TYPE.HISTORY, { dwelling })
        world.events.history.push(e)
        for(let i = 0; i < world.events.history.length; i++) {
            resolveEvent(world.events.history[i])
        } 
    
      
}

const dungeonEvents = (dungeonRoom) => {
    
}

module.exports = {
    adventureEvents,
    historyEvents,
    dungeonEvents,
    travelEvents
}