const { getSeason } = require('../lib/time')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { 
    getQuestLocation, 
    getAdventureDailyAction, 
    travel,
    restMap,
    restTown,
    quest
} = require('../models/adventure')
const bEvent = require('../build/event')
const { 
    ENUM_EVENT_TYPE,
    ENUM_EVENT_ADVENTURE_TYPE,
    ENUM_ADVENTURE_DAILY_ACTION
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
            let action = getAdventureDailyAction(world, p)
            let event = {}

            switch (action) {
                case ENUM_ADVENTURE_DAILY_ACTION.ATEMPT_QUEST: break;
                case ENUM_ADVENTURE_DAILY_ACTION.EVENT_TOWN: break;
                case ENUM_ADVENTURE_DAILY_ACTION.REST_MAP: restMap(world, p, output); break;
                case ENUM_ADVENTURE_DAILY_ACTION.REST_TOWN: restTown(world, p, output); break;
                case ENUM_ADVENTURE_DAILY_ACTION.SEEK_QUEST_TOWN: break;
                case ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP: travel(world, party, output);  break;
            }

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
    progressAdventure,

}