const { getSeason } = require('../lib/time')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { 
    getQuestLocation, 
    getAdventureDailyAction, 
    travel,
    restMap,
    restTown,
    quest,
    dwellingEvent
} = require('../models/adventure')
const mParty = require('../models/party')
const bEvent = require('../build/event')
const { 
    ENUM_EVENT_TYPE,
    ENUM_EVENT_ADVENTURE_TYPE,
    ENUM_ADVENTURE_DAILY_ACTION
} = require('../generic/enums')
const { Output } = require('../output/output')

/**
 * 
 * @param {Object} party 
 * @param {Object} world 
 */
const progressAdventure = async (world) => {
    try {
        //const season = getSeason(world.date)
        for (let party of world.parties) {
            let action = await getAdventureDailyAction(world, party)
            //let event = {}

            switch (action) {
                case ENUM_ADVENTURE_DAILY_ACTION.ATEMPT_QUEST: break;
                case ENUM_ADVENTURE_DAILY_ACTION.EVENT_TOWN: dwellingEvent(party, world); break;
                case ENUM_ADVENTURE_DAILY_ACTION.REST_MAP: restMap(world, party); break;
                case ENUM_ADVENTURE_DAILY_ACTION.REST_TOWN: restTown(world, party); break;
                case ENUM_ADVENTURE_DAILY_ACTION.SEEK_QUEST_TOWN: break;
                case ENUM_ADVENTURE_DAILY_ACTION.TRAVEL_MAP: travel(world, party);  break;
            }

            //event.items[0].execute(world, party)
            // daily event
        }

        for (let party of world.parties) {
            // set goal like quest
            mParty.consumeFood(party)

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