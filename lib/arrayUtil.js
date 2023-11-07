const {
    worldSize
} = require('../config')
const {
    point2d,
    getRandomElementFromArray
} = require('../lib/utils')


/**
 * returns true if instance exists in array
 * @param {Array} map 
 * @param {Number} searchTerm 
 * @returns {boolean} instance exists
 */
const instanceExistsInArray = (map, searchTerm) => {
    var value = false
    map.forEach(y => {
        if (y.find(x => x == searchTerm) != undefined) {
            value = true
        }
    })
    return value
}

/**
 * 
 * @param {Array} map 
 * @param {Number} searchTerm 
 * @returns {{x: Number, y: Number}} instance exists
 */
const findPointWithValue = (map, searchTerm) => {
    const points = []
    for (let y = 0; y < worldSize; y++) {
        for (let x = 0; x < worldSize; x++) {
            if (map[x][y] == searchTerm) {
                points.push(point2d(x,y))
            }
        }
    }
    if (points.length) {
        return getRandomElementFromArray(points)
    }
    return { x: -1, y: -1 }
}


module.exports = {
    instanceExistsInArray,
    findPointWithValue
}