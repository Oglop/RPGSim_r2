const objects = require('../generic/objects')
const { filters } = require('../generic/filters')
const { copyObject, getRandomElementFromArray, getRandomNumberInRange } = require('../lib/utils')
const { WORLD_SIZE } = require('../generic/statics')

const createMapArray = size => {
    const arr = []
    try {
        for (let i = 0; i < size; i++) {
            arr[i] = new Array(size).fill(copyObject(objects.room))
        }
    } catch (e) {
        console.log(e.message)
    }
    return arr
}

const drawOnMap = (map, startX, startY, filter, positive) => {
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
                            console.log(`filter[x][y] ${filter[x][y]}`)
                            console.log(`map[startX + x][startY + y].elevation ${map[startX + x][startY + y].elevation}`)


                        } else {
                            map[startX + x][startY + y].elevation -= filter[x][y]
                        }
                    }
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}

const generateMountains = (map, size) => {
    const loops = size / 4
    const skips = size / 5
    const rangeFrom = -2
    const rangeTo = 2
    // TODO
    for (let y = 0; y < loops; y++) {
        for (let x = 0; x < loops; x++) {
            drawOnMap(
                map, 
                (x * skips) + getRandomNumberInRange(rangeFrom, rangeTo), 
                (y * skips) + getRandomNumberInRange(rangeFrom, rangeTo),
                getRandomElementFromArray(filters),
                true
            )
        }
    }


    return map
}

const generateLakes = (map, size) => {

    return map
}


/**
 * generate world map
 * @param {object} options 
 */
module.exports.build = (options) => {
    const world = copyObject(objects.world)
    const worldSize = options.size ? options.size : WORLD_SIZE;
    const mapInit = createMapArray(worldSize)
    const mapMountains = generateMountains(mapInit, worldSize)
    

    for (let y = 0; y < worldSize; y++) {
        let s = ''
        for (let x = 0; x < worldSize; x++) {
            s += mapMountains[x][y].elevation
        }
        console.log(s)
    }
}