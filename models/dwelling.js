const { 
    ENUM_DWELLINGS,
    ENUM_RACE_NAMES,
    ENUM_DWELLING_LOCATION_STATUS
} = require('../generic/enums');
const { getRandomElementFromArray } = require('../lib/utils');

const getRaceFromDwellingType = (dwelling) => {
    switch( dwelling.type ) {
        case ENUM_DWELLINGS.DARK_ELF: return ENUM_RACE_NAMES.darkElf;
        case ENUM_DWELLINGS.DWARF: return ENUM_RACE_NAMES.dwarf;
        case ENUM_DWELLINGS.HALFLING: return ENUM_RACE_NAMES.halfling;
        case ENUM_DWELLINGS.HIGH_ELF: return ENUM_RACE_NAMES.highElf;
        case ENUM_DWELLINGS.HUMAN: return ENUM_RACE_NAMES.human;
        case ENUM_DWELLINGS.WOOD_ELF: return ENUM_RACE_NAMES.woodElf;
    }
}

/**
 * returns number of ungoing projects
 * @param {object} dwelling 
 * @returns {integer}
 */
const hasOngoingProject = (dwelling) => {
    return dwelling.locations.filter(l => l.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION)
}

/**
 * returns a
 * @param {array} dwellings 
 * @param {string} id 
 * @returns 
 */
const getDifferentDwelling = (dwellings, id) => {
    let dwelling = { id }
    while (dwelling.id == id) {
        dwelling = getRandomElementFromArray(dwellings)
    }
    return dwelling
}

module.exports = {
    getRaceFromDwellingType,
    hasOngoingProject,
    getDifferentDwelling
}