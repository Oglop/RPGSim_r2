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
        case ENUM_DWELLING_SIZE.VILLAGE: dwelling.citizens.count = getRandomNumberInRange(50, 150); break;
        case ENUM_DWELLING_SIZE.TOWN: dwelling.citizens.count = getRandomNumberInRange(500, 2000); break;
        case ENUM_DWELLING_SIZE.CITY: dwelling.citizens.count = getRandomNumberInRange(3000, 12000); break;
        case ENUM_DWELLING_SIZE.CAPITAL: dwelling.citizens.count = getRandomNumberInRange(20000, 50000); break;
    }
}

const addStores = (dwelling) => {
    dwelling.stores.food = getRandomNumberInRange(90, 110)
    dwelling.stores.gold = Math.floor(dwelling.citizens.count * 0.2)
    dwelling.stores.production = getRandomNumberInRange(90, 110)
    dwelling.stores.taxRate = getRandomNumberInRange(5, 10)
    dwelling.stores.happiness = getRandomNumberInRange(90, 100)

}

const addDefenses = (dwelling) => {
    //const taxIncome = dwelling.citizens.count * Math.floor(dwelling.stores.taxRate * 0.01)
    if (dwelling.size == ENUM_DWELLING_SIZE.VILLAGE) {
        dwelling.defenses.guards = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.TOWN) {
        dwelling.defenses.guards = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.defenses.walls = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.CITY) {
        dwelling.defenses.guards = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.PERFECT
        dwelling.defenses.walls = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.defenses.gate = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.CAPITAL) {
        dwelling.defenses.guards = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.PERFECT
        dwelling.defenses.walls = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.defenses.gate = ENUM_DWELLING_CONDITIONS.GOOD
        dwelling.defenses.moats = (chance(50)) ? ENUM_DWELLING_CONDITIONS.GOOD : ENUM_DWELLING_CONDITIONS.POOR
    }
}

/**
 * build dwelling
 * 
 * @param {ENUM_DWELLINGS} type 
 * @param {object} options 
 * @returns {object} dwelling
 */
module.exports.build = (type, options = {}) => {
    // Values from options
    const d = copyObject(objects.dwelling)
    d.id = generateID()
    d.name = getDwellingName()
    d.type = type
    d.type = (options.type) ? options.type : ENUM_DWELLINGS.TOWN
    d.size = (options.dwellingSize) ? options.dwellingSize : ENUM_DWELLING_SIZE.TOWN
    if (options.army) { d.army = options.army }
    options.citizens = (options.citizens) ? d.citizens = options.citizens : copyObject(objects.citizens)
    addCitizens(d)
    
    // set ruler and stores
    if (options.ruler) { d.ruler = options.ruler }
    if (options.nobles) { d.nobles = options.nobles }
    d.stores = copyObject(objects.dwellingStores)
    addStores(d)
    
    // set defenses
    d.defenses = copyObject(objects.dwellingDefenses)
    addDefenses(d)

    if (d.ruler && d.nobles && d.citizens && d.army) {

    }
    return d
}