// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_COMMANDS,
    ENUM_DWELLING_CONDITIONS,
} = require('../generic/enums')
const { 
    getRandomNumberInRange, getRandomFloatInRange,
} = require('../lib/utils')
const {
    GUARD_COST_MULTIPLYER,
    GATE_COST_MULTIPLYER,
    WALLS_COST_MULTIPLYER,
    MOAT_COST_MULTIPLYER,
    GUARD_COST_MAINTENANCE,
    WALLS_COST_MAINTENANCE,
    GATE_COST_MAINTENANCE,
    MAOT_COST_MAINTENANCE
} = require('../generic/statics')

const { getArmyCost } = require('../models/army')
const { checkOldAgeHealth } = require('../models/character')
const m = require('../models/court')

const {
    executeCommands
} = require('../persistance/commandQueue')
const { isWithinBudget } = require('../models/ruler')

/**
 * Add food and set growth
 * @param {object} dwelling 
 */
const handleFood = async (dwelling) => {
    const foodProduced = m.foodFromProduction(dwelling)
    dwelling.food += foodProduced
    dwelling.food -= dwelling.citizens
    if (dwelling.food <= 0) {
        dwelling.food = 0
        dwelling.citizens -= ((dwelling.citizens * 0.01) * getRandomNumberInRange(1, 3))
        dwelling.growth -= getRandomFloatInRange(0.1, 0.2)
    } else {
        dwelling.growth += getRandomFloatInRange(0.1, 0.2)
    }
    dwelling.growth = (dwelling.growth > 1.0) ? 1.0 : dwelling.growth
    dwelling.growth = (dwelling.growth < -1.0) ? -1.0 : dwelling.growth
}

/**
 * Add income
 * @param {object} dwelling 
 */
const handleIncome = async (dwelling) => {
    let income = 0
    income += m.locationIncomeFromLocation(dwelling)
    income += Math.floor( ( dwelling.citizens * dwelling.citizenTaxable ) * (dwelling.taxRate * 0.01) )
    income += m.incomeFromProduction(dwelling)
    dwelling.court.monthlyIncome = income
    dwelling.gold += income
}


const handleExpenses = async (dwelling) => {
    let expense = 0
    expense += m.locationCostFromCorruption(dwelling)
    for (loan of dwelling.court.loans) {
        expense += m.payLoans(dwelling, loan)
    }

    // guards
    if (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE) {
        const costBaseMaintenanceGuards = Math.floor(dwelling.citizens * GUARD_COST_MAINTENANCE)
        const costGuards = Math.floor(costBaseMaintenanceGuards * GUARD_COST_MULTIPLYER * m.dwellingQualityMultiplyer(dwelling.guards))
        expense += costGuards
    }
    // walls
    if (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE) {
        const costWalls= Math.floor((( dwelling.citizens * WALLS_COST_MULTIPLYER) + WALLS_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.walls))
        expense += costWalls
    }
    // gate
    if (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE) {
        const costGate = Math.floor((( dwelling.citizens * GATE_COST_MULTIPLYER) + GATE_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.gate))
        expense += costGate
    }
    // moat
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE) {
        const costMoat = Math.floor((( dwelling.citizens * MOAT_COST_MULTIPLYER) + MAOT_COST_MAINTENANCE ) * m.dwellingQualityMultiplyer(dwelling.moats))
        expense += costMoat
    }

    // army
    const cost = getArmyCost(dwelling.army)
    expense += cost

    dwelling.court.monthlyExpense = expense
    dwelling.gold -= Math.floor(expense)
}


const handleCourtOldAges = async (dwelling, currentDate) => {
    const commands = []
    try {
        const deceased = []
        const leaderDied = checkOldAgeHealth(dwelling.court.ruler, currentDate)
        for (let a of dwelling.court.advisors) {
            if (checkOldAgeHealth(a.character, currentDate)) {
                deceased.push(a.character.id)
                commands.push({ command: ENUM_COMMANDS.DELETECHARACTER, data: a.character.id })
            }
        }
    
        if (leaderDied) {
            commands.push({ command: ENUM_COMMANDS.DELETECHARACTER, data: dwelling.court.ruler.id })
            await m.replaceRuler(dwelling, currentDate)
        }
        if (deceased.length > 0) {
            const alive = dwelling.court.advisors.filter(a => a.isAlive == true)
            const died = dwelling.court.advisors.filter(a => a.isAlive == false)
            for (let deceacedAdvisor of died) {
                await m.replaceAdvisors(dwelling, deceacedAdvisor, alive, currentDate)
            }
            dwelling.court.advisors = alive
        }
        await executeCommands(commands)
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'handleCourtOldAges'
        err.message = e.message                                                                                                                      
        logError(err)
    }
    
}

const handleConstructionStatus = async (dwelling) => {
    const finishedAConstruction = await m.testFinishConstruction(dwelling)
    // could be used for something
}

/**
 * handle action for welling based on if 
 * @param {object} dwelling 
 * @param {object} world 
 */
const handleBudget = async (dwelling, world) => {
    if (isWithinBudget(dwelling)) {
        await m.overBudgetAction(dwelling, world)
    }
    else {
        await m.underBudgetAction(dwelling, world)
    }
}

const handlePublicHappinessLevel = (dwelling) => {
    const previousMonth = dwelling.happiness
    dwelling.happiness = Math.round(((( 100 / dwelling.taxRate ) * m.getGuardHappinessModifyer(dwelling.guards)) * dwelling.citizenTaxable ) * 100) / 100
    dwelling.happiness += + dwelling.happinessModifyer
}

const handleCitizensGrowth = (dwelling) => {
    dwelling.citizens += Math.floor((dwelling.citizens * 0.01) * dwelling.growth)
}


module.exports = {
    handleBudget,
    handleCourtOldAges,
    handleIncome,
    handleExpenses,
    handleFood,
    handleConstructionStatus,
    handlePublicHappinessLevel,
    handleCitizensGrowth
}