const { 
    socialize, 
    checkMarriages, 
    checkPregnancies, 
    checkFamiliesForAge, 
    removeDead 
} = require('../models/family')
const { historyEvents } = require('./eventsHandler')
const { taxesAndExpenses } = require('../handlers/courtHandler')


/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = async (world, output) => {
    
    
    for (let dwelling of world.dwellings) { 
        // Collect texes
        await taxesAndExpenses(dwelling)    
        
        // Spend Money check with advisors



        // check events

        // check ruler for old age


    }

    

    
    // socialize(world.families)
    // checkMarriages(world.families)
    // checkPregnancies(world.families, world.date)
    // checkFamiliesForAge(world.families)
    await historyEvents(world, output)

    // removeDead(world.families, world.dead, output)
    
}