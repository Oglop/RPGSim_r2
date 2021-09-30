const { getSeason } = require('../lib/time')

/**
 * 
 * @param {Object} party 
 * @param {Object} world 
 */
module.exports.progressAdventure = (party, world) => {
    const season = getSeason(world.date)
}