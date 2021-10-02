const { addDay } = require('../lib/time')
const {  } = require('../models/darkness')
const {} = require('../handlers/adventureHandler')
const { progressHistory } = require('../handlers/historyHandler')


/**
 * Resolves one turn
 * 
 * @param {Object} world 
 */
const next = (world) => {
    const pastTime = addDay(world.date)

    if (pastTime === 'd' || pastTime === 'm' || pastTime === 'y') {
        // events for adventureres


        if (pastTime === 'm' || pastTime === 'y') {
            // events for families
            progressHistory(world)
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