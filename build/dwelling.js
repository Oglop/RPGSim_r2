const objects = require('../generic/objects')
const { getDwellingName } = require('../generic/names')
const { generateID, copyObject, getRandomNumberInRange, chance } = require('../lib/utils')
const { getDwarfWord } = require('../lib/language')
const { 
    ENUM_DWELLING_SIZE,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
} = require('../generic/enums')





const addCitizens = (dwelling) => {
    switch (dwelling.size) {
        case ENUM_DWELLING_SIZE.VILLAGE: dwelling.citizens = getRandomNumberInRange(50, 150); break;
        case ENUM_DWELLING_SIZE.TOWN: dwelling.citizens = getRandomNumberInRange(500, 2000); break;
        case ENUM_DWELLING_SIZE.CITY: dwelling.citizens = getRandomNumberInRange(3000, 12000); break;
        case ENUM_DWELLING_SIZE.CAPITAL: dwelling.citizens = getRandomNumberInRange(20000, 50000); break;
    }
}

const addStores = (dwelling) => {
    dwelling.food = getRandomNumberInRange(90, 110)
    dwelling.gold = Math.floor(dwelling.citizens.count * 0.2)
    dwelling.production = getRandomNumberInRange(90, 110)
    dwelling.taxRate = getRandomNumberInRange(5, 10)
    dwelling.happiness = getRandomNumberInRange(90, 100)

}

const addDefenses = (dwelling) => {
    //const taxIncome = dwelling.citizens.count * Math.floor(dwelling.stores.taxRate * 0.01)
    if (dwelling.size == ENUM_DWELLING_SIZE.VILLAGE) {
        dwelling.guards = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.TOWN) {
        dwelling.guards = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.walls = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.CITY) {
        dwelling.guards = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.PERFECT
        dwelling.walls = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.gate = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.CAPITAL) {
        dwelling.guards = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.PERFECT
        dwelling.walls = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.gate = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.moats = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
}

/**
 * build dwelling
 * 
 * @param {ENUM_DWELLINGS} type 
 * @param {object} options 
 * @returns {object} dwelling
 */
module.exports.build = (position, options = {}) => {
    // Values from options
    const d = copyObject(objects.dwelling)
    d.id = generateID()
    d.name = getDwellingName()
    d.x = position.x
    d.y = position.y
    d.type = (options.type) ? options.type : ENUM_DWELLINGS.TOWN
    d.size = (options.dwellingSize) ? options.dwellingSize : ENUM_DWELLING_SIZE.TOWN
    if (options.army) { d.army = options.army }
    d.citizens = (options.citizens) ? d.citizens = options.citizens : copyObject(objects.citizens)
    addCitizens(d)
    
    // set ruler and stores
    if (options.ruler) { d.ruler = options.ruler }
    if (options.nobles) { d.nobles = options.nobles }
    addStores(d)
    
    // set defenses
    addDefenses(d)

    if (d.ruler && d.nobles && d.citizens && d.army) {

    }
    return d
}