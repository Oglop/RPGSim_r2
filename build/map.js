const { NoPositionAvailableError, WorldGenerationFailedError } = require('../exceptions')
const dwellingsBuilder = require('./dwelling')
const objects = require('../generic/objects')
const { filters, clouds } = require('../generic/filters')
const { copyObject, 
    getRandomElementFromArray, 
    getRandomNumberInRange, 
    getRandomNumber, 
    chance
} = require('../lib/utils')
const { WORLD_SIZE } = require('../generic/statics')
const { ENUM_BIOMES, ENUM_DWELLINGS, ENUM_EXPLORE_STATUS } = require('../generic/enums')
const { getLandmarkName } = require('../generic/names')
const { logError } = require('../data/errorFile')
const { insertRoom, updateRoom } = require('../database').commands

/**
 * Generate an 2d array of {room}
 * @param {integer} size 
 * @returns array
 */
const createMapArray = size => {
        var arr = [];
        for (let i = 0; i < size; i++) {
            arr[i] = [];
            for (let j = 0; j < size; j++) {
                arr[i][j] = copyObject(objects.room);
            }
        }
        return arr
}

/**
 * 
 * @param {text} worldId 
 * @param {object} options 
 * size: integer
 * worldId: text
 */
const generateBaseMap = async (worldId, worldSize) => {
    var arr = [];
    for (let i = 0; i < worldSize; i++) {
        arr[i] = [];
        for (let j = 0; j < worldSize; j++) {
            const r = copyObject(objects.room);
            r.worldId = worldId
            r.x = j
            r.y = i
            arr[i][j] = r
            try {
                await insertRoom(r)
            } catch (e) {
                const err = objects.error
                err.file = __filename
                err.function = 'generateBaseMap'
                err.message = e.message                                                                                                                      
                logError(err)
            }
        }
    }
    return arr
}

/**
 * Draw farmland biom to map
 * @param {Array} map 
 * @param {Object} point 
 * @param {Int} size 
 */
const drawFarmlands = (map, point, size) => {
    const pen = ENUM_BIOMES.farmlands
    for (let y = point.y - 1; y < point.y + 1; y++) {
        for (let x = point.x - 1; x < point.x + 1; x++) {
            if (
                x >= 0 &&
                x < size &&
                y >= 0 &&
                y < size &&
                !map[x][y].dwelling) {
                    if ((map[x][y].biome == ENUM_BIOMES.plains ||
                        map[x][y].biome == ENUM_BIOMES.forest ||
                        map[x][y].biome == ENUM_BIOMES.dessert) &&
                        chance(60)
                        ) {
                            map[x][y].biome = pen
                        }
                }
        }
    }
}

const setFarmlands = (map, size) => {
    const dwellings = []
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            try {
                if (map[x][y].dwelling && 
                    (map[x][y].dwelling.type === ENUM_DWELLINGS.TOWN || 
                    map[x][y].dwelling.type === ENUM_DWELLINGS.CITY)) {
                        const p = copyObject(objects.point)
                        p.x = x
                        p.y = y
                        dwellings.push(p)
                }
            } catch (e) {
                const err = objects.error
                err.file = __filename
                err.function = 'build'
                err.message = e.message
                logError(err)
            }
            
        }
    }
    for (let i = 0; i < dwellings.length; i++) {
        drawFarmlands(map, dwellings[i], size)
    }
}

/**
 * set bioms from elevation and temprature
 * @param {array} map 
 * @param {int} size 
 */
const setBiome = (map, size) => {
    let pen = ENUM_BIOMES.plains

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (map[x][y].elevation < 0) { 
                map[x][y].biome = ENUM_BIOMES.lake 
                map[x][y].exploreStatus = ENUM_EXPLORE_STATUS.blocked
            }
            else if (map[x][y].elevation == 4) { map[x][y].biome = ENUM_BIOMES.hills }
            else if (map[x][y].elevation >= 5) { map[x][y].biome = ENUM_BIOMES.mountains }
            else {
                if (map[x][y].elevation == 0) { 
                    if (map[x][y].temprature < 0) {
                        if (chance(40)) { pen = ENUM_BIOMES.swamp }
                    } else if (map[x][y].temprature >= 0) {
                        if (chance(40)) { pen = ENUM_BIOMES.plains }
                    } else if (map[x][y].temprature >= 1) {
                        if (chance(30)) { pen = ENUM_BIOMES.forest }
                    } else if (map[x][y].temprature > 2) {
                        if (chance(70)) { pen = ENUM_BIOMES.dessert }
                    }
                } else if (map[x][y].elevation == 1) { 
                    if (map[x][y].temprature >= 0) {
                        if (chance(40)) { pen = ENUM_BIOMES.forest }
                    } else if (map[x][y].temprature >= 1) {
                        if (chance(70)) { pen = ENUM_BIOMES.plains }
                    } else if (map[x][y].temprature > 2) {
                        if (chance(50)) { pen = ENUM_BIOMES.dessert }
                    }
                } else if (map[x][y].elevation == 2) { 
                    if (map[x][y].temprature >= 0) {
                        if (chance(20)) { pen = ENUM_BIOMES.forest }
                    } else if (map[x][y].temprature >= 1) {
                        if (chance(60)) { pen = ENUM_BIOMES.plains }
                    } else if (map[x][y].temprature > 2) {
                        if (chance(30)) { pen = ENUM_BIOMES.badlands }
                    }

                } else if (map[x][y].elevation == 3) { 
                    if (map[x][y].temprature >= 0) {
                        if (chance(30)) { pen = ENUM_BIOMES.hills }
                    } else if (map[x][y].temprature >= 1) {
                        if (chance(50)) { pen = ENUM_BIOMES.hills }
                        if (chance(40)) { pen = ENUM_BIOMES.plains }
                    } else if (map[x][y].temprature > 2) {
                        if (chance(50)) { pen = ENUM_BIOMES.badlands }
                    }
                } if (map[x][y].temprature >= 4) { 
                    pen = ENUM_BIOMES.dessert
                } 
                map[x][y].exploreStatus = ENUM_EXPLORE_STATUS.empty
                map[x][y].biome = pen
            }

        }
    }
}

/**
 * draw elevation to map
 * @param {draws elevation} map 
 * @param {int} startX 
 * @param {int} startY 
 * @param {array} filter 
 * @param {bool} positive 
 */
const drawElevation = (map, startX, startY, filter, positive) => {
    try {
        for (let y = 0; y < filter[0].length; y++) {
            for (let x = 0; x < filter[0].length; x++) {
                if (
                    startX + x >= 0 &&
                    startX + x < map.length &&
                    startY + y >= 0 &&
                    startY + y < map.length) {
                        if (positive) {
                            map[startX + x][startY + y].elevation += filter[x][y]
                        } else {
                            map[startX + x][startY + y].elevation -= Math.floor(filter[x][y] / 2)
                        }
                    }
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}
/**
 * draw temprature to map
 * @param {array} map 
 * @param {int} startX 
 * @param {int} startY 
 * @param {array} cloud 
 * @param {bool} positive 
 */
const drawTemprature = (map, startX, startY, cloud, positive) => {
    try {
        for (let y = 0; y < cloud[0].length; y++) {
            for (let x = 0; x < cloud[0].length; x++) {
                if (
                    startX + x >= 0 &&
                    startX + x < map.length &&
                    startY + y >= 0 &&
                    startY + y < map.length) {
                        if (positive) {
                            map[startX + x][startY + y].temprature += cloud[x][y]
                        } else {
                            map[startX + x][startY + y].temprature -= cloud[x][y]//Math.floor(cloud[x][y] / 2)
                        }
                    }
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * draw positive elevation
 * @param {array} map 
 * @param {int} size 
 */
const generateMountains = (map, size) => {
    const loops = Math.floor( size / 4 )
    const skips = Math.floor( size / 5 )
    const rangeFrom = -2
    const rangeTo = 2
    // TODO
    for (let y = 0; y < loops; y++) {
        for (let x = 0; x < loops; x++) {
            drawElevation(
                map, 
                (x * skips) + getRandomNumberInRange(rangeFrom, rangeTo), 
                (y * skips) + getRandomNumberInRange(rangeFrom, rangeTo),
                getRandomElementFromArray(filters),
                true
            )
        }
    }
}
/**
 * draw negative elevation
 * @param {array} map 
 * @param {int} size 
 */
const generateLakes = (map, size) => {
    const loops = Math.floor( size / 4 )
    const skips = Math.floor( size / 5 )
    const rangeFrom = -3
    const rangeTo = 3
    for (let y = 0; y < loops; y++) {
        for (let x = 0; x < loops; x++) {
            drawElevation(
                map, 
                (x * skips) + getRandomNumberInRange(rangeFrom, rangeTo), 
                (y * skips) + getRandomNumberInRange(rangeFrom, rangeTo),
                getRandomElementFromArray(filters),
                false
            )
        }
    }
}

/**
 * set tempratures on map
 * @param {array} map 
 * @param {int} size 
 */
const generateTempratures = (map, size) => {
    const loops = Math.floor( size / 5 )
    const skips = Math.floor( size / 6 )
    const rangeFrom = -3
    const rangeTo = 3
    // TODO
    for (let y = 0; y < loops; y++) {
        for (let x = 0; x < loops; x++) {
            drawTemprature(
                map, 
                (x * skips) + getRandomNumberInRange(rangeFrom, rangeTo), 
                (y * skips) + getRandomNumberInRange(rangeFrom, rangeTo),
                getRandomElementFromArray(clouds),
                true
            )
        }
    }
    const iter = 3 + getRandomNumber(3)
    for(let i = 0; i<iter; i++) {
        const randX = getRandomNumber(size)
        const randY = getRandomNumber(size)
        drawTemprature(
            map, 
            randX, 
            randY,
            getRandomElementFromArray(clouds),
            false
        )
    }
}

const getUninhabitedPoint = (map, size, biome) => {
    const points = []
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if ( (biome == map[x][y].biome || (!biome && map[x][y].elevation < 5 && map[x][y].elevation >= 0) ) && !map[x][y].dwelling ) {
                const p = copyObject(objects.point)
                p.x = x
                p.y = y
                points.push(p)
            }
        }
    }
    if (points.length > 0) {
        return points[getRandomNumber(points.length)]
    }
    else {
        throw new NoPositionAvailableError('No point found')
    }
}

const setLandmarks = (map, size) => {
    const min = Math.floor( size / 5)
    const n = getRandomNumberInRange(min, min + 5)
    for (let i = 0; i < n; i++) {
        try {
            const x = getRandomNumberInRange(0, size - 1), y = getRandomNumberInRange(0, size - 1)
            // console.log(`${x}:${y}`)
            map[x][y].description = getLandmarkName(map[x][y].biome)
        } catch (e) {
            console.log(`${e.message}`)
        }
        
    }
}

const drawDwelling = (map, size, count, biome, dwelling) => {

    for (let i = 0; i < count; i++) {
        try {
            const p = getUninhabitedPoint(map, size, biome)
            map[p.x][p.y].dwelling = dwellingsBuilder.build(dwelling)
        } catch (e) {
            if(e instanceof NoPositionAvailableError) {
                break;
            } else {
                // TODO Error
                console.log(e.message)
            }
        }
    }
}

/**
 * Add dwellings to map
 * @param {array} map 
 * @param {int} size 
*/
module.exports.setDwellings = (map, size) => {
    drawDwelling(map, size, 2 + getRandomNumber( Math.floor(size / 10) ), ENUM_BIOMES.forest, ENUM_DWELLINGS.ELF_TOWN)
    drawDwelling(map, size, 1 + getRandomNumber( Math.floor(size / 10) ), ENUM_BIOMES.hills, ENUM_DWELLINGS.DWARVEN_MINE)
    // drawDwelling(map, size, 2 + getRandomNumber( Math.floor(size / 10) ), undefined, ENUM_DWELLINGS.TOWN)
    // drawDwelling(map, size, 1 + getRandomNumber( Math.floor(size / 20) ), ENUM_BIOMES.plains, ENUM_DWELLINGS.CITY)
    drawDwelling(map, size, 4 + getRandomNumber( Math.floor(size / 10) ), undefined, ENUM_DWELLINGS.TOWER)
    drawDwelling(map, size, 3 + getRandomNumber( Math.floor(size / 10) ), ENUM_BIOMES.hills, ENUM_DWELLINGS.RUINS)
}

const visualizeMap = (map, worldSize) => {
    for (let y = 0; y < worldSize; y++) {
        let s = ''
        for (let x = 0; x < worldSize; x++) {
            if (map[x][y].dwelling) {
                switch(map[x][y].dwelling.type) {
                    case ENUM_DWELLINGS.ELF_TOWN: s += 'e'; break;
                    case ENUM_DWELLINGS.DWARVEN_MINE: s += 'd'; break;
                    case ENUM_DWELLINGS.TOWN: s += '"'; break;
                    case ENUM_DWELLINGS.CITY: s += '#'; break;
                    case ENUM_DWELLINGS.TOWER: s += '|'; break;
                    case ENUM_DWELLINGS.RUINS: s += 'x'; break;
                }
                
            } else {
                switch (map[x][y].biome) {
                    case 'F': s += '`'; break;
                    case 'H': s += '^'; break;
                    case 'S': s += ','; break;
                    case 'M': s += '/'; break;
                    case 'P': s += '.'; break;
                    case 'L': s += ' '; break;
                    case 'D': s += '_'; break;
                    case 'B': s += ' '; break;
                    case 'A': s += '='; break;
                }
            }
        }
        console.log(s)
    }
}
 

/**
 * generate world map
 * @param {object} options 
 */
module.exports.build = async (options) => {
    try {
        const worldSize = options.size ? options.size : WORLD_SIZE;
        const map = await generateBaseMap( options.worldId, worldSize )
        //const map = createMapArray(worldSize)
        generateMountains(map, worldSize)
        generateLakes(map, worldSize)
        generateTempratures(map, worldSize)
        setBiome(map, worldSize)
        //setDwellings(map, worldSize)
        //setFarmlands(map, worldSize)
        //setLandmarks(map, worldSize)
        
        // visualizeMap(map, worldSize)
        return map
    } catch (e) {
        throw new WorldGenerationFailedError(e.message)
    }
    
}

module.exports.buildLandMarks = (map, worldSize) => { setLandmarks(map, worldSize) }
module.exports.buildFarmlands = (map, worldSize) => { setFarmlands(map, worldSize) }