const { getSeason } = require('../lib/time')
const { socialize, checkMarriages, checkPregnancies } = require('../models/family')
const { historyEvents } = require('./eventsHandler')
/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = (world, output) => {
    const season = getSeason(world.date)
    //const dwellings = getDwellingsFromMap(world.map)
    socialize(world.families)
    checkMarriages(world.families)
    checkPregnancies(world.families, world.date)
    historyEvents(world, output)
    
    
}