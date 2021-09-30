const { getSeason } = require('../lib/time')
const { getDwellingsFromMap } = require('../models/map')
/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = (world) => {
    const season = getSeason(world.date)
    const dwellings = getDwellingsFromMap(world.map)


}