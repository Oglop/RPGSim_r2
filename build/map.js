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
const { 
    getClosePoints,
    gradiantFilter,
    horizontalLine,
    verticalLine,
    noiceFilterLight,
    platueFilter,
    setTempratureByLattitude,
    spikeFilter,
    windsOfMagic,
    trueNoice,
    raiseGround
} = require('../build/mapBuilderUtility')
const { world } = require('../generic/objects')

const saveMap = async (map) => {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            try {
                await insertRoom(map[x][y])
            } catch (e) {
                const err = objects.error
                err.file = __filename
                err.function = 'saveMap'
                err.message = e.message
                logError(err)
            }
        }
    }
}

/**
 * 
 * @param {text} worldId 
 * @param {object} options 
 * size: integer
 * worldId: text
 */
const generateBaseMap = (worldId, worldSize) => {
    var arr = [];
    for (let i = 0; i < worldSize; i++) {
        arr[i] = [];
        for (let j = 0; j < worldSize; j++) {
            try {
                const r = copyObject(objects.room);
                r.worldId = worldId
                r.x = i
                r.y = j
                arr[i][j] = r
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
                } if (map[x][y].temprature >= 6) { 
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
        const err = objects.error
        err.file = __filename
        err.function = 'drawElevation'
        err.message = e.message
        logError(err)
    }
}

const generateBaseElevation = (map, worldSize, options) => {
    try {
        trueNoice(map, worldSize)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateBaseElevation'
        err.step = 'trueNoice'
        err.message = e.message
        logError(err)
    }

    try {
        const iterations = getRandomNumberInRange( Math.floor( worldSize * 0.1 ) - 2, Math.floor( worldSize * 0.1 ) + 2 )
        for (let i = 0; i < iterations; i++) {
            const x = getRandomNumberInRange( 0, worldSize - 1 )
            const y = getRandomNumberInRange( 0, worldSize - 1 )
            raiseGround(map, worldSize, x, y)
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateBaseElevation'
        err.step = 'raiseGround'
        err.message = e.message
        logError(err)
    }

    try {
        const iterations = getRandomNumberInRange( Math.floor( worldSize * 0.1 ) - 3, Math.floor( worldSize * 0.1 ) )
        for (let i = 0; i < iterations; i++) {
            const type = getRandomNumberInRange( 0, 3 )
            const x = getRandomNumberInRange( 0, worldSize - 1 )
            const y = getRandomNumberInRange( 0, worldSize - 1 )
            switch (type) {
                case 0: horizontalLine(map, worldSize, x, y, { negative: false });  break;
                case 1: horizontalLine(map, worldSize, x, y, { negative: true }); break;
                case 2: verticalLine(map, worldSize, x, y, { negative: false }); break;
                case 3: verticalLine(map, worldSize, x, y, { negative: true }); break;
            }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateBaseElevation'
        err.step = 'lines'
        err.message = e.message
        logError(err)
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
const generateMountains = (map, worldSize) => {
    try {
        const iterations = getRandomNumberInRange( Math.floor( worldSize * 0.1 ) - 2, Math.floor( worldSize * 0.1 ) + 2 )
        for (let i = 0; i < iterations; i++) {
            const x = getRandomNumberInRange( 0, worldSize - 1 )
            const y = getRandomNumberInRange( 0, worldSize - 1 )
            const positions = getClosePoints(map, worldSize, { x, y }, { noOfPositions: getRandomNumberInRange(2,4) })
            for (let i = 0; i < positions.length; i++) {
                spikeFilter(map, worldSize, positions[i].x, positions[i].y, { iterations: getRandomNumberInRange(3, 6) })
            }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateMountains'
        err.step = 'by util'
        err.message = e.message
        logError(err)
    }

    try {
        const iterations = getRandomNumberInRange( Math.floor( worldSize * 0.1 ) - 2, Math.floor( worldSize * 0.1 ) + 2 )
        for (let i = 0; i < iterations; i++) {
            drawElevation(
                map, 
                getRandomNumberInRange( 0, worldSize - 1 ),
                getRandomNumberInRange( 0, worldSize - 1 ),
                getRandomElementFromArray(filters),
                true
            )
        }
    }
    catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateMountains'
        err.step = 'by filter'
        err.message = e.message
        logError(err)
    }
}
/**
 * draw negative elevation
 * @param {array} map 
 * @param {int} size 
 */
const generateLakes = (map, size) => {
    try {
        const iterations = getRandomNumberInRange( Math.floor( worldSize * 0.1 ) - 2, Math.floor( worldSize * 0.1 ) + 2 )
        for (let i = 0; i < iterations; i++) {
            drawElevation(
                map, 
                getRandomNumberInRange( 0, worldSize - 1 ),
                getRandomNumberInRange( 0, worldSize - 1 ),
                getRandomElementFromArray(filters),
                false
            )
        }
    }
    catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateLakes'
        err.step = 'by filter'
        err.message = e.message
        logError(err)
    }
    
}

/**
 * set tempratures on map
 * @param {array} map 
 * @param {int} size 
 */
const generateTempratures = (map, worldSize) => {
    setTempratureByLattitude(map, worldSize)
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
                /*switch(map[x][y].dwelling.type) {
                    case ENUM_DWELLINGS.ELF_TOWN: s += 'e'; break;
                    case ENUM_DWELLINGS.DWARVEN_MINE: s += 'd'; break;
                    case ENUM_DWELLINGS.TOWN: s += '"'; break;
                    case ENUM_DWELLINGS.CITY: s += '#'; break;
                    case ENUM_DWELLINGS.TOWER: s += '|'; break;
                    case ENUM_DWELLINGS.RUINS: s += 'x'; break;
                }*/
                
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
        generateTempratures(map, worldSize)
        generateBaseElevation(map, worldSize, {})
        generateMountains(map, worldSize)
        generateLakes(map, worldSize)
        setBiome(map, worldSize)

        //setDwellings(map, worldSize)
        //setFarmlands(map, worldSize)
        //setLandmarks(map, worldSize)
        
        // visualizeMap(map, worldSize)
        await saveMap(map)
        return map
    } catch (e) {
        throw new WorldGenerationFailedError(e.message)
    }
    
}

module.exports.buildLandMarks = (map, worldSize) => { setLandmarks(map, worldSize) }
module.exports.buildFarmlands = (map, worldSize) => { setFarmlands(map, worldSize) }