const { addDay } = require('../lib/time')
//const {  } = require('../models/darkness')
const { progressAdventure } = require('../handlers/adventureHandler')
const { progressHistory } = require('../handlers/historyHandler')


/**
 * Resolves one turn
 * 
 * @param {Object} world 
 */
const next = (world, output) => {
    const pastTime = addDay(world.date)

    if (pastTime === 'd' || pastTime === 'm' || pastTime === 'y') {
        // events for adventureres
        progressAdventure(world, output)

        if (pastTime === 'm' || pastTime === 'y') {
            // events for families
            progressHistory(world, output)
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