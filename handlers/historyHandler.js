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
const { ENUM_COMMANDS } = require('../generic/enums')
const { executeCommands } = require('../persistance/aggregates/sequences')
const { updateDwelling } = require('../persistance/commands/updateDwelling')


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
        await handleCourtOldAges(dwelling, world.date)

        executeCommands([
            { command: ENUM_COMMANDS.UPDATEDWELLING, data: dwelling }
        ])
    }

    

    
    // socialize(world.families)
    // checkMarriages(world.families)
    // checkPregnancies(world.families, world.date)
    // checkFamiliesForAge(world.families)
    //await historyEvents(world)

    // removeDead(world.families, world.dead, output)
    
}