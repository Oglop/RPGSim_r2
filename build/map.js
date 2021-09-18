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

const generateMountains = (map, size) => {
    const loops = size / 4
    const skips = size / 5
    const rangeFrom = -2
    const rangeTo = 2
    // TODO
    for (let y = 0; y < loops; y++) {
        for (let x = 0; x < loops; x++) {
            const i = getRandomNumberInRange(rangeFrom, rangeTo)
            const filter = getRandomElementFromArray(filters)

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
    const mapMountains = generateMountains(mapInit)
    

    for (let y = 0; y < worldSize; y++) {
        for (let x = 0; x < worldSize; x++) {
            console.log()
        }
    }
}