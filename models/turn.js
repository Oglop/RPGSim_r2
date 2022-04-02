const { addDay } = require('../lib/time')
//const {  } = require('../models/darkness')
const { progressAdventure } = require('../handlers/adventureHandler')
const { progressHistory } = require('../handlers/historyHandler')


/**
 * Resolves one turn
 * 
 * @param {Object} world 
 */
const next = async (world, output) => {
    const pastTime = addDay(world.date)

    if (pastTime === 'd' || pastTime === 'm' || pastTime === 'y') {
        // events for adventureres

        
        if (pastTime === 'm' || pastTime === 'y') {
            // events for families
            await progressHistory(world)
            // world events

            if (pastTime === 'y') {
                // darkness

            }
        }
    }
}


module.exports = {
    next
}