const { ENUM_DWELLINGS } = require('../generic/enums')
const { copyObject, point2d, getRandomElementFromArray } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
/**
 * 
 * @param {Array[][]} map 
 * @returns {Array} dwelling
 */
const getDwellingsFromMap = map => {
    const dwellings = []
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            if (map[x][y].dwelling) {
                if (map[x][y].dwelling.type == ENUM_DWELLINGS.TOWN ||
                    map[x][y].dwelling.type == ENUM_DWELLINGS.CITY ||
                    map[x][y].dwelling.type == ENUM_DWELLINGS.ELF_TOWN ||
                    map[x][y].dwelling.type == ENUM_DWELLINGS.DWARVEN_MINE
                ) {
                    dwellings.push(map[x][y].dwelling)
                }
                
            }
        }
    }
    return dwellings
}

const getDwellingPositionById = (map, dwellingsId) => {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            if (map[x][y].dwelling.id == dwellingsId) {
                return point2d(x, y)
            }
        }
    }
}

const getDwellingById = (map, dwellingsId) => {
    try {
        const p = map.find(r => r.dwelling.id == dwellingsId)
        return p
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getDwellingById'
        err.message = e.message
        logError(err)
    }
}

const getPointOfRandomDwelling = (map) => {
    try {
        const dwellings = getDwellingsFromMap(map)
        const dwelling = getRandomElementFromArray(dwellings)
        return getDwellingPositionById(map, dwelling.id)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getPointOfRandomDwelling'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    getDwellingsFromMap,
    getDwellingPositionById,
    getPointOfRandomDwelling,
    getDwellingById
}