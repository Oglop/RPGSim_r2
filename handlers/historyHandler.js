const { 
    socialize, 
    checkMarriages, 
    checkPregnancies, 
    checkFamiliesForAge, 
    removeDead 
} = require('../models/family')
const { historyEvents } = require('./eventsHandler')
const { 
    handleIncomeExpenses, 
    handleFood, 
    handleCourtOldAges 
} = require('../handlers/courtHandler')


/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = async (world) => {
    
    
    for (let dwelling of world.dwellings) { 
        // Collect texes
        await handleIncomeExpenses(dwelling)    
        await handleFood(dwelling)
        // Spend Money check with advisors



        // check events

        // check ruler for old age
        await handleCourtOldAges(dwelling.court, world.date)


    }

    

    
    // socialize(world.families)
    // checkMarriages(world.families)
    // checkPregnancies(world.families, world.date)
    // checkFamiliesForAge(world.families)
    await historyEvents(world)

    // removeDead(world.families, world.dead, output)
    
}