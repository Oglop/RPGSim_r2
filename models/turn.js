const { addDay } = require('../lib/time')
const {  } = require('../models/darkness')

/**
 * Resolves one turn
 * 
 * @param {*} world 
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