const { ENUM_DWELLINGS } = require('../generic/enums')
const { WORLD_SIZE } = require('../generic/statics')
const { copyObject, point2d, getRandomElementFromArray } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { getRoomByCoordinates } = require('../database').queries
/**
 * 
 * @param {Array[][]} map 
 * @returns {Array} dwelling
 */
const getDwellingsFromMap = map => {
    const dwellings = []
    for (let y = 0; y < WORLD_SIZE; y++) {
        for (let x = 0; x < WORLD_SIZE; x++) {
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

const getDwellingPositionById = (map, dwellingId) => {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            if (map[x][y].dwelling && map[x][y].dwelling.id == dwellingId) {
                return point2d(x, y)
            }
        }
    }
}

const getDwellingById = (map, dwellingId) => {
    try {
        const p = map.find(r => r.dwelling.id == dwellingId)
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

const getBiomeAtPoint = (map, point) => {
    try {
        return map[point.x][point.y].biome
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getBiomeAtPoint'
        err.message = e.message
        logError(err)
    }
}

const getListOfPointsByBiome = (map, biome) => {
    const positions = []
    for (let y = 0; y < WORLD_SIZE; y++) {
        for (let x = 0; x < WORLD_SIZE; x++) {
            if (map[x][y].biome == biome && !map[x][y].dwelling) {
                positions.push(point2d(x,y))
            }
        }
    }
    return positions
}

/**
 * WIP
 * return map from database
 * 
 * @param {text} worldId 
 * @param {integer} size 
 * @returns {Array} map
 */
const getMap = async (worldId, size) => {
    const map = Array(WORLD_SIZE).fill([])
    for (let i = 0; i < WORLD_SIZE; i++) {
        map[i] = Array(WORLD_SIZE).fill({})
    }
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            map[x][y] = await getRoomByCoordinates(x, y)
        }
    }
    return map
}

module.exports = {
    getDwellingsFromMap,
    getDwellingPositionById,
    getPointOfRandomDwelling,
    getDwellingById,
    getBiomeAtPoint,
    getMap,
    getListOfPointsByBiome
}