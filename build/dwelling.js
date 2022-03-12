const objects = require('../generic/objects')
const { getDwellingName } = require('../generic/names')
const { generateID, copyObject, getRandomNumberInRange } = require('../lib/utils')
const { getDwarfWord } = require('../lib/language')
const { ENUM_DWELLINGS, ENUM_DWELLINGS, ENUM_DWELLING_SIZE } = require('../generic/enums')





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

}

module.exports.build = (type, options = {}) => {
    const d = copyObject(objects.dwelling)
    d.type = (options.type) ? options.type : ENUM_DWELLINGS.CITY
    d.size = (options.dwellingSize) ? options.dwellingSize : ENUM_DWELLING_SIZE.TOWN
    options.citizens = (options.citizens) ? d.citizens = options.citizens : copyObject(objects.citizens)
    addCitizens(d)
    
    
    if (options.ruler) { d.ruler = options.ruler }
    if (options.nobles) { d.nobles = options.nobles }
    addStores(d)
    
    if (options.army) { d.army = options.army }
    d.id = generateID()
    d.name = getDwellingName()
    d.type = type
    d.stores = copyObject(objects.dwellingStores)
    d.defenses = copyObject(objects.dwellingDefenses)

    if (d.ruler && d.nobles && d.citizens && d.army) {

    }
    return d
}