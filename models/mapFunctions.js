const { 
    shuffleArray,
    copyObject, 
    point2d, 
    getRandomElementFromArray, 
    getRandomNumberInRange 
} = require('../lib/utils')
const {
    worldSize
} = require('../config')
const {
    instanceExistsInArray,
    findPointWithValue,
    
} = require('../lib/arrayUtil')

/**
 * 
 * @param {{ x:Number, y: Number}} point 
 * @returns {boolean}
 */
const isValidMapPosition = (point) => {
    if (point.y >= 0 && 
        point.y < worldSize &&
        point.x >= 0 &&
        point.x < worldSize
        )
        {
            return true
        }
    return false
}

/**
 * move cursor one step
 * @param {Array} map 
 * @param {{ x:Number, y: Number}} point 
 */
const moveCursor = (map, point, testValue = 999) => {
    const possibleDirections = ['e','n','w','s']
    directions = shuffleArray(possibleDirections)
    let newPoint = point2d(point.x, point.y)
    for (const direction of directions) {
        if (direction == 'e') {
            newPoint = point2d(point.x + 1, point.y)
        }
        if (direction == 'n') {
            newPoint = point2d(point.x, point.y - 1)
        }
        if (direction == 'w') {
            newPoint = point2d(point.x - 1, point.y)
        }
        if (direction == 's') {
            newPoint = point2d(point.x, point.y + 1)
        }
        if (isValidMapPosition(newPoint) && map[newPoint.x][newPoint.y] == testValue) {
            return newPoint
        }
    }
    return { x:-1, y:-1 }
}

/**
 * iterates map and changes single point from to
 * @param {Array} map 
 * @param {Number} changeFrom 
 * @param {Number} changeTo 
 */
const cleanup = (map, changeFrom, changeTo) => {
    for (let y = 0; y < worldSize; y++) {
        for (let x = 0; x < worldSize; x++) {
            let east, north, west, south = false
            if (isValidMapPosition(point2d(x + 1, y))) {
                if (map[x + 1][y].elevation == changeFrom) {
                    east = true
                }
            }
            if (isValidMapPosition(point2d(x, y - 1))) {
                if (map[x][y - 1].elevation == changeFrom) {
                    north = true
                }
            }
            if (isValidMapPosition(point2d(x - 1, y))) {
                if (map[x - 1][y].elevation == changeFrom) {
                    west = true
                }
            }
            if (isValidMapPosition(point2d(x, y + 1))) {
                if (map[x][y + 1].elevation == changeFrom) {
                    south = true
                }
            }
            if (east && north && west && south && map[x][y].elevation != changeFrom) {
                map[x][y].elevation = changeTo
            }
        }
    }
}

/**
 * normalize elevation value
 * @param {Array} map 
 * @param {Number} testValue 
 * @param {Boolean} positive 
 */
const normalizeElevation = (map, testValue, positive) => {
    for (let y = 0; y < worldSize; y++) {
        for (let x = 0; x < worldSize; x++) {
            if ((positive && map[x][y].elevation > testValue) || (!positive && map[x][y].elevation < testValue)) {
                map[x][y].elevation = testValue
            }
        }
    }
}

/**
 * Returns map
 * @param {Number} lowerLimit 
 * @param {Number} upperLimit 
 * @param {{resistance: number, placeHolder: number, defaultValue: number}} options 
 * @returns {Array} map
 */
const waveCollapse = (lowerLimit, upperLimit, options = {}) => {
    const map = [];
    const resistance = options?.resistance ?? 1
    const placeHolder = options?.placeHolder ?? 999
    const defaultValue = options?.defaultValue ?? getRandomNumberInRange(upperLimit, lowerLimit)

    for (let i = 0; i < worldSize; i++) {
        map[i] = [];
        for (let j = 0; j < worldSize; j++) {
            map[i][j] = placeHolder
        }
    }
    let x = getRandomNumberInRange(0, worldSize - 1)
    let y = getRandomNumberInRange(0, worldSize - 1)
    map[x][y] = defaultValue
    let iterations = 0
    while(instanceExistsInArray(map, placeHolder)) {
        iterations++
        // console.log(`instanceExistsInArray iteration ${iterations}`)
        if (x == -1 || y == -1) {
            const point = findPointWithValue(map, placeHolder)
            if (point.x == -1 || point.y == -1) { break } // should never happen
            x = point.x
            y = point.y
        }
        const possibleValues = []
        if (map[x][y] == placeHolder) { map[x][y] = defaultValue }
        for (let i = 0; i < resistance; i++) { possibleValues.push(map[x][y]) }
        if ( map[x][y] - 1 >= lowerLimit ) { possibleValues.push(map[x][y] - 1) }
        if ( map[x][y] + 1 <= upperLimit ) { possibleValues.push(map[x][y] + 1) }
        const newPoint = moveCursor(map, point2d(x,y))
        if (newPoint.x == -1 || newPoint.y == -1) {
            x = -1
            y = -1
        } else {
            map[newPoint.x][newPoint.y] = getRandomElementFromArray(possibleValues)
            // console.log(`map[${x}][${y}] ${map[newPoint.x][newPoint.y]}`)
            x = newPoint.x
            y = newPoint.y
        }
        
    }

    return map
}

module.exports = {
    normalizeElevation,
    waveCollapse,
    cleanup
}