const { getSeason } = require('../lib/time')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const mParty = require('../models/party')
const bEvent = require('../build/event')
const { 
    ENUM_EVENT_TYPE,
    ENUM_EVENT_ADVENTURE_TYPE 
} = require('../generic/enums')

/**
 * 
 * @param {Object} party 
 * @param {Object} world 
 */
const progressAdventure = (world, output) => {
    try {
        const season = getSeason(world.date)
        for (let p of world.parties) {
            let action = undefined
            const inTown = mParty.isInDwelling(world, p, output)
            const rest = mParty.checkForRest(p)
            let event = {}
            // set goal like quest
            if (inTown) {
                event = bEvent.build(world, output, ENUM_EVENT_TYPE.ADVENTURE, {
                    adventureEventType: ENUM_EVENT_ADVENTURE_TYPE.TOWN,
                    rest
                })
            }

            /*
            if (mParty.checkForRest(p)) {
                mParty.rest(world, p)
            } else {
                mParty.quest(world, p)
            }*/
            event.items[0].execute(world, party)
            // daily event
        }

        for (let p of world.parties) {
            // set goal like quest
            mParty.consumeFood()

            // daily event
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'progressAdventure'
        err.message = e.message                                                                                                                      
        logError(err)
    }
}

module.exports = {
    progressAdventure
}