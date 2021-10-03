const { resolveEvent } = require('../models/event')
const eventBuilder = require('../build/event')
const { ENUM_EVENT_TYPE } = require('../generic/enums')

const adventureEvents = (world, output) => {
    
}

const historyEvents = (world, output) => {
    const e = eventBuilder.build(world, output, ENUM_EVENT_TYPE.HISTORY)
    world.events.history.push(e)
    for(let i = 0; i < world.events.history.length; i++) {
        resolveEvent(world.events.history[i])
    }   
}

module.exports = {
    adventureEvents,
    historyEvents
}