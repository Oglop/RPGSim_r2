const { 
    ENUM_DWELLINGS,
    ENUM_RACE_NAMES,
    ENUM_DWELLING_LOCATION_STATUS,
    ENUM_DWELLING_SIZE
} = require('../generic/enums');
const { getRandomElementFromArray } = require('../lib/utils');
const { get } = require('../localization');
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


const getDwellingByCoordinates = (x, y, world) => {
    for(let dwelling of world.dwellings) {
        if (dwelling.x == x && dwelling.y == y) {
            return dwelling
        }
    }
    return undefined
}

/**
 * retuyrn name of dwelling size
 * @param {ENUM_DWELLING_SIZE} type 
 * @returns {text}
 */
const getDwellingSizeName = (size) => {
    switch (size) {
        case ENUM_DWELLING_SIZE.VILLAGE: return get('dwelling-size-name-village')
        case ENUM_DWELLING_SIZE.TOWN: return get('dwelling-size-name-town')
        case ENUM_DWELLING_SIZE.CITY: return get('dwelling-size-name-city')
        case ENUM_DWELLING_SIZE.CAPITAL: return get('dwelling-size-name-capital')
    }
}

/**
 * return description of street floor
 * @param {array} streetTypes 
 * @param {array} streetColors 
 * @returns {text} description
 */
const getStreetDescription = (streetTypes, streetColors) => {
    let streetTypeDescription = ''
    const streetTypeIndex = getRandomElementFromArray(streetTypes)
    switch (streetTypeIndex) {
        case 0: streetTypeDescription = get('dwelling-street-type-mud'); break;
        case 1: streetTypeDescription = get('dwelling-street-type-stone'); break;
        case 2: streetTypeDescription = get('dwelling-street-type-tiles'); break;
        case 3: streetTypeDescription = get('dwelling-street-type-mosaique'); break;
    }
    const streetColorIndex = getRandomElementFromArray(streetColors)
    const streetColorDescription = getColorByIndex(streetColorIndex)
    return `${streetColorDescription} ${streetTypeDescription}`// get('dwelling-street-description-base', [ `${streetColorDescription} ${streetTypeDescription}` ])
}

const getDwellingRaceDescriptionFromDwellingType = type => {
    switch (type) {
        case ENUM_DWELLINGS.DARK_ELF: return get('race-dark-elf-possessive')
        case ENUM_DWELLINGS.WOOD_ELF: return get('race-wood-elf-possessive')
        case ENUM_DWELLINGS.HIGH_ELF: return get('race-high-elf-possessive')
        case ENUM_DWELLINGS.HIGH_ELF: return get('race-half-elf-possessive')
        case ENUM_DWELLINGS.HUMAN: return get('race-human-possessive')
        case ENUM_DWELLINGS.DWARF: return get('race-dwarf-possessive')
        case ENUM_DWELLINGS.HALFLING: return get('race-halfling-possessive')
    }
}

/**
 * return text from random selected items of input arrays
 * @param {array} roofTypes 
 * @param {array} roofColors 
 * @returns {text} description
 */
const getRoofDescription = (roofTypes, roofColors) => {
    let roofTypeDescription = ''
    const roofTypeIndex = getRandomElementFromArray(roofTypes)
    switch (roofTypeIndex) {
        case 0: roofTypeDescription = get('dwelling-roof-type-leaves'); break;
        case 1: roofTypeDescription = get('dwelling-roof-type-grass'); break;
        case 2: roofTypeDescription = get('dwelling-roof-type-mud'); break;
        case 3: roofTypeDescription = get('dwelling-roof-type-thach'); break;
        case 4: roofTypeDescription = get('dwelling-roof-type-boards'); break;
        case 5: roofTypeDescription = get('dwelling-roof-type-shingles'); break;
        case 6: roofTypeDescription = get('dwelling-roof-type-slates'); break;
        case 7: roofTypeDescription = get('dwelling-roof-type-bricks'); break;
    }
    const roofColorIndex = getRandomElementFromArray(roofColors)
    const roofColorDescription = getColorByIndex(roofColorIndex)
    return `${roofColorDescription} ${roofTypeDescription}`//get('dwelling-roof-description-base', [ `${roofColorDescription} ${roofTypeDescription}` ])
}

/**
 * return text from  selected items of input arrays
 * @param {array} houseTypes 
 * @param {array} houseColors 
 * @returns {text} description
 */
 const getWallDescription = (wallTypes, wallColors) => {
    let wallTypeDescription = ''
    const wallTypeIndex = getRandomElementFromArray(wallTypes)
    switch (wallTypeIndex) {
        case 0: wallTypeDescription = get('dwelling-wall-type-mud'); break;
        case 1: wallTypeDescription = get('dwelling-wall-type-wood'); break;
        case 2: wallTypeDescription = get('dwelling-wall-type-stone'); break;
        case 3: wallTypeDescription = get('dwelling-wall-type-bricks'); break;
        case 4: wallTypeDescription = get('dwelling-wall-type-marble'); break;
    }
    const wallColorIndex = getRandomElementFromArray(wallColors)
    const wallColorDescription = getColorByIndex(wallColorIndex)
    return `${wallColorDescription} ${wallTypeDescription}`//get('dwelling-wall-description-base', [ `${wallColorDescription} ${wallTypeDescription}` ])
}

const getColorByIndex = (index) => {
    const { get } = require('../localization')
    switch (index) {
        case 1: return get('system-color-royal-blue')
        case 2: return get('system-color-black')
        case 3: return get('system-color-red')
        case 4: return get('system-color-moss-green')
        case 5: return get('system-color-yellow')
        case 6: return get('system-color-white')
        case 7: return get('system-color-light-grey')
        case 8: return get('system-color-dark-grey')
        case 9: return get('system-color-purple')
        case 10: return get('system-color-violet')
        case 11: return get('system-color-pink')
        case 12: return get('system-color-orange')
        case 13: return get('system-color-marine-blue')
        case 14: return get('system-color-sky-blue')
        case 15: return get('system-color-grey-blue')
        case 16: return get('system-color-bright-green')
        case 17: return get('system-color-forest-green')
        case 18: return get('system-color-mud-brown')
        case 19: return get('system-color-terracotta')
        case 20: return get('system-color-olive-green')
        case 21: return get('system-color-turquoise')
        case 22: return get('system-color-umber')
        case 23: return get('system-color-ivory')
        case 24: return get('system-color-crimson')
    }
}

/**
 * return text from  selected items of input arrays
 * @param {array} houseTypes 
 * @param {array} houseColors 
 * @returns {text} description
 */
const getHouseDescription = (houseTypes) => {
    const houseTypeIndex = getRandomElementFromArray(houseTypes)
    switch (houseTypeIndex) {
        case 0: return get('dwelling-house-type-low');
        case 1: return get('dwelling-house-type-square');
        case 2: return get('dwelling-house-type-round');
        case 3: return get('dwelling-house-type-tall');
        case 4: return get('dwelling-house-type-large');
        case 5: return get('dwelling-house-type-hexagonal');
        case 6: return get('dwelling-house-type-octagonal');
        case 7: return get('dwelling-house-type-small');
    }
}

/**
 * returns random generated text describing dwelling
 * @param {object} dwelling 
 */
const getDwellingDescription = (dwelling) => {
    const roofTypes = []
    const roofColors = []
    const streetTypes = []
    const streetColors = []
    const houseTypes = []
    const wallTypes = []
    const wallColors = []

    if (dwelling.type == ENUM_DWELLINGS.DARK_ELF) {
        roofTypes.push(...[ 5, 6 ])
        roofColors.push(...[ 2, 8, 9, 10, 24 ])
        streetTypes.push(...[ 2, 3 ])
        streetColors.push(...[ 2, 8, 9, 10])
        wallTypes.push(...[ 3, 4 ])
        wallColors.push(...[ 8, 15, 21, 22, 24 ])
        houseTypes.push(...[ 2, 5, 6 ])
    }

    if (dwelling.type == ENUM_DWELLINGS.DWARF) {
        roofTypes.push(...[ 2, 4, 7 ])
        roofColors.push(...[ 8, 12, 15, 18 ])
        streetTypes.push(...[ 0, 1 ])
        streetColors.push(...[ 22, 8, 18, 19 ])
        wallTypes.push(...[ 0, 2, 3 ])
        wallColors.push(...[ 2, 7, 8, 13, 15, 22 ])
        houseTypes.push(...[ 1, 0, 6, 7 ])
    }

    if (dwelling.type == ENUM_DWELLINGS.HALFLING) {
        roofTypes.push(...[ 0, 1, 2, 3 ])
        roofColors.push(...[ 3, 4, 12, 14, 5 ])
        streetTypes.push(...[ 0 ])
        streetColors.push(...[ 22, 19, 18, 12 ])
        wallTypes.push(...[ 0, 1 ])
        wallColors.push(...[ 4, 7, 19 ])
        houseTypes.push(...[ 0, 7, 2 ])
    }

    if (dwelling.type == ENUM_DWELLINGS.HIGH_ELF) {
        roofTypes.push(...[ 5, 6 ])
        roofColors.push(...[ 1, 5, 13, 21, 6 ])
        streetTypes.push(...[ 2, 3 ])
        streetColors.push(...[ 2, 7, 15, 21, 11 ])
        wallTypes.push(...[ 3, 4 ])
        wallColors.push(...[ 23, 7, 6, 14, 13 ])
        houseTypes.push(...[ 3, 4, 5 ])
    }

    if (dwelling.type == ENUM_DWELLINGS.HUMAN) {
        roofTypes.push(...[ 2, 3, 4, 5, 6 ])
        roofColors.push(...[ 3, 1, 15, 19, 12 ])
        streetTypes.push(...[ 0, 1, 2 ])
        streetColors.push(...[ 22, 8, 7, 17, 18, 3 ])
        wallTypes.push(...[ 0, 2, 3 ])
        wallColors.push(...[ 6, 7, 8, 15, 19, 23 ])
        houseTypes.push(...[ 4, 7, 0 ])
    }

    if (dwelling.type == ENUM_DWELLINGS.WOOD_ELF) {
        roofTypes.push(...[ 1, 2 ])
        roofColors.push(...[ 4, 5, 16, 17, 20 ])
        streetTypes.push(...[ 0 ])
        streetColors.push(...[ 2, 3, 22, 18, 19 ])
        wallTypes.push(...[ 1 ])
        wallColors.push(...[ 4, 6, 23, 22, 20, 11, 17 ])
        houseTypes.push(...[ 2, 3 ])
    }

    const size = getDwellingSizeName(dwelling.size)
    const race = getDwellingRaceDescriptionFromDwellingType(dwelling.type)
    const house = getHouseDescription(houseTypes)
    const walls = getWallDescription(wallTypes, wallColors)
    const streets = getStreetDescription(streetTypes, streetColors)
    const roofs = getRoofDescription(roofTypes, roofColors)

    return get('dwelling-dwelling-description-base', [
        dwelling.name,
        race,
        house,
        walls,
        roofs,
        streets,
        size
    ])

}

module.exports = {
    getRaceFromDwellingType,
    hasOngoingProject,
    getDifferentDwelling,
    getDwellingByCoordinates,
    getDwellingDescription
}