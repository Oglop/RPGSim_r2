const { addDay } = require('../lib/time')
const {  } = require('../models/darkness')
const {} = require('../handlers/adventureHandler')
const {} = require('../handlers/historyHandler')

/**
 * Resolves one turn
 * 
 * @param {Object} world 
 */
const next = (world) => {
    const pastTime = addDay(world.date)
    if (pastTime === 'd') {
        // events for adventureres


        if (pastTime === 'm') {
            // events for families

            if (pastTime === 'y') {
                // darkness

            }
        }
    }
}


module.exports = {
    next
}