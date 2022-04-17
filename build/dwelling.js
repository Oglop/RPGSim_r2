const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { getDwellingName } = require('../generic/names')
const { generateID, copyObject, getRandomNumberInRange, getRandomFloatInRange, chance } = require('../lib/utils')
const { 
    ENUM_DWELLING_SIZE,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_DWELLING_PRODUCTION_TYPE,
    ENUM_DWELLING_LOCATION_STATUS,
    ENUM_DWELLING_LOCATION_TYPE
} = require('../generic/enums')

const bProduction = require('./production')
const bCourt = require('./court')
const bArmy = require('../build/army') 
const bLocations = require('./dwellingLocation')
const { getDwarfWord, getElfWord, getAncientWord } = require('../lib/language')

const humanProduction = (dwelling) => {
    if ( dwelling.size == ENUM_DWELLING_SIZE.VILLAGE ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.DEER, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(70)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }
        if (chance(30)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }

    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CITY ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(90)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }

    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CAPITAL ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }
    }
}

const getDwellingLocations = (dwelling) => {
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.TAVERN, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.INN, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.BLACKSMITH, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.TRAINING_GROUNDS, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.STREET, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.MARKET, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN || dwelling.size == ENUM_DWELLING_SIZE.CITY || dwelling.size == ENUM_DWELLING_SIZE.CAPITAL) {
        dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.TEMPLE, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    }
    if ( dwelling.size == ENUM_DWELLING_SIZE.CAPITAL || dwelling.size == ENUM_DWELLING_SIZE.CITY) {
        dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.TOWN_HALL, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    }
    if ( dwelling.size == ENUM_DWELLING_SIZE.CAPITAL) {
        dwelling.locations.push(bLocations.build(dwelling, { type: ENUM_DWELLING_LOCATION_TYPE.PALACE, status: ENUM_DWELLING_LOCATION_STATUS.ACTIVE }))
    }
}

const darkElfProduction = (dwelling) => {
    if ( dwelling.size == ENUM_DWELLING_SIZE.VILLAGE ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        if (chance(30)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CRYSTAL, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CITY ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        if (chance(50)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.SALT, dwelling.id))
        }
        if (chance(20)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.GEMS, dwelling.id))
        }

    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CAPITAL ) {
        // only human can have capital
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
    }
}

const dwarfesProduction = (dwelling) => {
    if ( dwelling.size == ENUM_DWELLING_SIZE.VILLAGE ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.STONE, dwelling.id))
        }
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }
        if (chance(50)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.FISH, dwelling.id))
        }

    } else if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        if (chance(70)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.STONE, dwelling.id))
        }
        if (chance(50)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.SALT, dwelling.id))
        }

    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CITY ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        if (chance(90)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.STONE, dwelling.id))
        }
        if (chance(70)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.GOLD, dwelling.id))
        }

    } 
    
    // only human can have capital
    else if ( dwelling.size == ENUM_DWELLING_SIZE.CAPITAL ) {
        
    }
}

const halflingProduction = (dwelling) => {
    if ( dwelling.size == ENUM_DWELLING_SIZE.VILLAGE ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.FISH, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.FISH, dwelling.id))
        }

    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CITY ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.FISH, dwelling.id))
        }
    }
}

const highElfProduction = (dwelling) => {
    if ( dwelling.size == ENUM_DWELLING_SIZE.VILLAGE ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
        if (chance(10)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.GEMS, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }
        if (chance(50)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
        if (chance(20)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.GEMS, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CITY ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.CATTLE, dwelling.id))
        }
        if (chance(50)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
        if (chance(20)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.GEMS, dwelling.id))
        }
        if (chance(50)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id))
        }
    }
}

const woodElfProduction = (dwelling) => {
    if ( dwelling.size == ENUM_DWELLING_SIZE.VILLAGE ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(40)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        }
        if (chance(90)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
        if (chance(70)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.DEER, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.TOWN ) {

        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        }
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
    } else if ( dwelling.size == ENUM_DWELLING_SIZE.CITY ) {
        dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WHEAT, dwelling.id))
        if (chance(80)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id))
        }
        if (chance(60)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.WOOD, dwelling.id))
        }
        if (chance(30)) {
            dwelling.production.push(bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.FISH, dwelling.id))
        }
    }
}

const addProduction = (dwelling) => {
    switch (dwelling.type) {
        case ENUM_DWELLINGS.HUMAN: humanProduction(dwelling); break;
        case ENUM_DWELLINGS.DARK_ELF: darkElfProduction(dwelling); break;
        case ENUM_DWELLINGS.DWARF: dwarfesProduction(dwelling); break;
        case ENUM_DWELLINGS.HALFLING: halflingProduction(dwelling); break;
        case ENUM_DWELLINGS.WOOD_ELF: woodElfProduction(dwelling); break;
        case ENUM_DWELLINGS.HIGH_ELF: highElfProduction(dwelling); break;
    }
}



const addCitizens = (dwelling) => {
    switch (dwelling.size) {
        case ENUM_DWELLING_SIZE.VILLAGE: dwelling.citizens = getRandomNumberInRange(50, 150); break;
        case ENUM_DWELLING_SIZE.TOWN: dwelling.citizens = getRandomNumberInRange(500, 2000); break;
        case ENUM_DWELLING_SIZE.CITY: dwelling.citizens = getRandomNumberInRange(3000, 12000); break;
        case ENUM_DWELLING_SIZE.CAPITAL: dwelling.citizens = getRandomNumberInRange(20000, 50000); break;
    }
}

const addStores = (dwelling) => {
    dwelling.food = Math.floor(dwelling.citizens * getRandomFloatInRange(0.8, 2.6))
    dwelling.gold = Math.floor(dwelling.citizens * 0.2)
    dwelling.taxRate = getRandomNumberInRange(5, 10)
    dwelling.happiness = Math.round((( 100 / dwelling.taxRate ) * dwelling.citizenTaxable ) * 100) / 100 
    dwelling.citizenTaxable = getRandomFloatInRange(1.1, 1.3)

}

const addDefenses = (dwelling) => {
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

const getDwellingNameByType = (type) => {
    switch (type) {
        case ENUM_DWELLINGS.DARK_ELF: return getAncientWord();
        case ENUM_DWELLINGS.WOOD_ELF: return getElfWord();
        case ENUM_DWELLINGS.HIGH_ELF: return getElfWord();
        case ENUM_DWELLINGS.DWARF: return getDwarfWord();
    }
    return getDwellingName()
}

/**
 * build dwelling
 * 
 * @param {ENUM_DWELLINGS} type 
 * @param {object} options {
 *  date: worldDate !
 * }
 * @returns {object} dwelling
 */
module.exports.build = async (position, options) => {
    try {
        const d = copyObject(objects.dwelling)
        d.id = generateID()
        d.x = position.x
        d.y = position.y
        d.type = (options.type) ? options.type : ENUM_DWELLINGS.HUMAN
        d.name = getDwellingNameByType(d.type)
        d.size = (options.dwellingSize) ? options.dwellingSize : ENUM_DWELLING_SIZE.TOWN
        if (options.army) { d.army = options.army }
        addCitizens(d)
        addProduction(d)
        d.growth = 0
        d.court = await bCourt.build(d, {
            date: options.date
        })

        // set ruler and stores
        //if (options.ruler) { d.ruler = options.ruler }
        addStores(d)

        // army
        d.army = bArmy.buildArmy(d)
        getDwellingLocations(d)
        // set defenses
        addDefenses(d)
        return d
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build.dwelling'
        err.message = e.message                                                                                                                      
        logError(err)
    }   
}