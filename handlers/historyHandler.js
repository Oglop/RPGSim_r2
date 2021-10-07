const { socialize, checkMarriages, checkPregnancies, checkFamiliesForAge, removeDead } = require('../models/family')
const { historyEvents } = require('./eventsHandler')
/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = (world, output) => {
    socialize(world.families)
    checkMarriages(world.families)
    checkPregnancies(world.families, world.date)
    checkFamiliesForAge(world.families)
    historyEvents(world, output)

    removeDead(world.families, world.dead, output)
    
}