const { 
} = require('../models/family')
const { historyEvents } = require('./eventsHandler')
const { 
    handleBudget,
    handleIncome,
    handleExpenses, 
    handleFood, 
    handleCourtOldAges,
    handleConstructionStatus,
    handlePublicHappinessLevel
} = require('../handlers/courtHandler')
const { ENUM_COMMANDS } = require('../generic/enums')
const { executeCommands } = require('../persistance/commandQueue')


/**
 * 
 * @param {Object} world 
 */
module.exports.progressHistory = async (world) => {
    
    
    for (let dwelling of world.dwellings) { 
        // finished constructions
        handleConstructionStatus(dwelling)
        // Collect texes
        await handleIncome(dwelling)
        await handleExpenses(dwelling)
        await handleFood(dwelling)
        await handleBudget(dwelling, world)

        // check public happiness
        handlePublicHappinessLevel(dwelling)
        // check events

        // check ruler for old age
        await handleCourtOldAges(dwelling, world.date)

        await executeCommands({ command: ENUM_COMMANDS.UPDATEDWELLING, data: dwelling })
    }
}