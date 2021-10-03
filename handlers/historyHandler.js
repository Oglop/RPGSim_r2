const { getSeason } = require('../lib/time')
const { socialize, checkMarriages, checkPregnancies } = require('../models/family')

const b = require('../build/monster')
/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = (world) => {
    const season = getSeason(world.date)
    //const dwellings = getDwellingsFromMap(world.map)
    socialize(world.families)
    checkMarriages(world.families)
    checkPregnancies(world.families, world.date)

    
    
}