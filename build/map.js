const objects = require('../generic/objects')
const { filters, clouds } = require('../generic/filters')
const { copyObject, getRandomElementFromArray, getRandomNumberInRange, getRandomNumber} = require('../lib/utils')
const { WORLD_SIZE } = require('../generic/statics')

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

const setBiome = (map, size) => {
    
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
                            map[startX + x][startY + y].temprature -= Math.floor(cloud[x][y] / 2)
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
 * 
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
    const iter = getRandomNumber(3)
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


/**
 * generate world map
 * @param {object} options 
 */
module.exports.build = (options) => {
    const world = copyObject(objects.world)
    const worldSize = options.size ? options.size : WORLD_SIZE;
    const map = createMapArray(worldSize)
    generateMountains(map, worldSize)
    generateLakes(map, worldSize)
    generateTempratures(map, worldSize)

    for (let y = 0; y < worldSize; y++) {
        let s = ''
        for (let x = 0; x < worldSize; x++) {
            s += map[x][y].temprature
        }
        console.log(s)
    }
}