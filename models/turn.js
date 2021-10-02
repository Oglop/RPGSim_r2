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
    progressHistory(world)

    if (pastTime === 'd') {
        // events for adventureres


        if (pastTime === 'm') {
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