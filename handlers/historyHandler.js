const { 
} = require('../models/family')
const { historyEvents } = require('./eventsHandler')
const { 
    handleSpendings,
    handleIncomeExpenses, 
    handleFood, 
    handleCourtOldAges 
} = require('../handlers/courtHandler')
const { ENUM_COMMANDS } = require('../generic/enums')
const { executeCommands } = require('../persistance/commandQueue')


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
        await handleSpendings(dwelling)


        // check events

        // check ruler for old age
        await handleCourtOldAges(dwelling, world.date)

        await executeCommands({ command: ENUM_COMMANDS.UPDATEDWELLING, data: dwelling })
    }
}