const { getRandomNumberInRange, chance } = require('../lib/utils')
const { ENUM_EXPLORE_DIR } = require('../generic/enums')
const objects = require('../generic/objects')
const { point2d, isPoint2dInArray,isEmptyObject } = require('../lib/utils')

/**
 * Set temprature to map of size 100
 * 
 * @param {Array} map 
 * @returns {Object}
 */
const setTempratureByLattitude = (map, size) => {

    const temps = {
        freezing: {
            lattitude: 5,
            minVariance: 0,
            maxVariance: 1
        },
        cold: {
            lattitude: 10,
            minVariance: 1,
            maxVariance: 2
        },
        medium: {
            lattitude: 20,
            minVariance: 3,
            maxVariance: 5
        },
        warm: {
            lattitude: 44,
            minVariance: 4,
            maxVariance: 6
        },
        hot: {
            lattitude: 45,
            minVariance: 5,
            maxVariance: 7
        }
    }

    for (let y = 0; y < size; y++){
        for (let x = 0; x < size; x++) {
            //  5 greater than 95
            if (y <= temps.freezing.setTempratureByLattitude) { 
                map[x][y].temprature = getRandomNumberInRange(temps.freezing.minVariance, temps.freezing.maxVariance) 
            } else if (y >= size - temps.freezing.lattitude) { 
                map[x][y].temprature = getRandomNumberInRange(temps.freezing.minVariance, temps.freezing.maxVariance) 
            } else if (y > temps.freezing.lattitude && y <= temps.cold.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.cold.minVariance, temps.cold.maxVariance)
            } else if (y > size - temps.cold.lattitude && y <= size - temps.freezing.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.cold.minVariance, temps.cold.maxVariance) 
            } else if (y > temps.cold.lattitude && y <= temps.medium.lattitude ) {
                    map[x][y].temprature = getRandomNumberInRange(temps.medium.minVariance, temps.medium.maxVariance) 
            } else if (y > size - temps.medium.lattitude && y <= size - temps.cold.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.medium.minVariance, temps.medium.maxVariance) 
            } else if (y > temps.medium.lattitude && y <= temps.warm.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.warm.minVariance, temps.warm.maxVariance) 
            } else if (y >= size - temps.warm.lattitude && y <= size - temps.medium.lattitude) {
                        map[x][y].temprature = getRandomNumberInRange(temps.warm.minVariance, temps.warm.maxVariance) 
            } else if (y >= temps.hot.lattitude && y <= size - temps.hot.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.hot.minVariance, temps.hot.maxVariance) 
            }
        }
    }
    return map
}

/**
 * 
 * @param {array} map 
 * @param {int} size 
 * @param {int} startx 
 * @param {int} starty 
 * @param {object} options 
 */
const gradiantFilter = (map, size, startx, starty, options) => {
    let penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false
    
    while (penSize > 0) {
        for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
            for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
                if (x >= 0 && x < size && y >= 0 && y < size) {
                    map[x][y].elevation = (negative) ? map[x][y].elevation  -= 1 : map[x][y].elevation += 1
                }
            }
        }
        penSize -= Math.floor(penSize * 0.4)
    }
}

/**
 * get points for spike filter
 * 
 * @param {object} point 
 */
const addSpikePoints = (point) => {
    const points = []
    // go east
    if (chance(50)) {
        points.push(point2d(point.x + 1, point.y))
    }
    // go north
    if (chance(50)) {
        points.push(point2d(point.x, point.y + 1))
    }
    // go west
    if (chance(50)) {
        points.push(point2d(point.x - 1, point.y))
    }
    // go south
    if (chance(50)) {
        points.push(point2d(point.x + 1, point.y - 1))
    }
    return points
}

/**
 * draw spike fi on map
 * 
 * @param {*} map 
 * @param {*} size 
 * @param {*} startx 
 * @param {*} starty 
 * @param {*} options 
 */
const spikeFilter = (map, size, startx, starty, options) => {
    const negative = (options.negative) ? options.negative : false
    const iterations = (options.iterations) ? options.iterations : 5
    const points = []
    let toAdd = []
    points.push(point2d(startx, starty))

    for(let i = 0; i < iterations; i++) {
        for(let p of points) {
            toAdd = addSpikePoints(p)
        }
        //points.concat(toAdd)
        toAdd.forEach(p => { points.push(p) })
    }
    for(let p of points) {
        if (p.x >= 0 && p.x < size && p.y >= 0 && p.y < size) {
            map[p.x][p.y].elevation = (negative) ? map[p.x][p.y].elevation  -= 1 : map[p.x][p.y].elevation += 1
        }
    }
}

/**
 * 
 * 
 * @param {array} map 
 * @param {int} size 
 * @param {int} startx 
 * @param {int} starty 
 * @param {object} options 
 */
const platueFilter = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false
        
    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                map[x][y].elevation = (!negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
            }
        }
    }
}

const trueNoice = (map, size, options = {}) => {
    let totalDistributed = 0
    for (let i = 0; i < size * size; i++) {
        const x = getRandomNumberInRange(0, size - 1)
        const y = getRandomNumberInRange(0, size - 1)
        if (x >= 0 && x < size && y >= 0 && y < size) {
            let h = getRandomNumberInRange(0, 1)
            if(chance(20)) { h = -1 }
            map[x][y].elevation += h
            totalDistributed += h
        }
    }
    console.log(` ${totalDistributed}`)
}

const raiseGround = (map, size, startx, starty, options = {}) => {
    let penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false
    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) { 
            if (x >= 0 && x < size && y >= 0 && y < size) {
                if (x == startx + 1 
                    || y == starty + 1 
                    || x == startx + penSize - 2
                    || y == starty + penSize - 2) {
                        const h = getRandomNumberInRange(0,1)
                        map[x][y].elevation = (negative) ? map[x][y].elevation  -= h : map[x][y].elevation += h
                } else if (
                    x > startx + 1 
                    && y > starty + 1 
                    && x < startx + penSize - 2
                    && y < starty + penSize - 2
                ) {
                    const h = getRandomNumberInRange(1,2)
                    map[x][y].elevation = (negative) ? map[x][y].elevation  -= h : map[x][y].elevation += h
                }
            }
        }
    }
}

/**
 * 
 * 
 * @param {array} map 
 * @param {int} size 
 * @param {int} startx 
 * @param {int} starty 
 * @param {object} options 
 * @returns 
 */
const noiceFilterLight = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false

    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                const i = getRandomNumberInRange(1 , 6)
                switch (i) {
                    case 1: map[x][y].elevation = (!negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
                    case 2: map[x][y].elevation = (negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
                }
            }
        }
    }
}


const noiceFilterMedium = (map, size, startx, starty, endx, endy, options) => {
    const negative = (options.negative) ? options.negative : false
    for (let y = starty; y < endy; y++ ) {
        for (let x = startx; x < endx; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                const i = getRandomNumberInRange(1 , 6)
                switch (i) {
                    case 1: map[x][y].elevation = (!negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
                    case 2: map[x][y].elevation = (negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
                }
            }
        }
    }
}

/**
 * draws an horizontal line of weight 1
 * @param {array} map 
 * @param {int} size 
 * @param {int} startx 
 * @param {int} starty 
 * @param {object} options { negative: bool }
 * @returns {Array}
 */
const verticalLine = (map, size, startx, starty, options = {}) => {
    const negative = (options.negative) ? options.negative : false
    const dir = (chance(50)) ? ENUM_EXPLORE_DIR.south : ENUM_EXPLORE_DIR.north
    let stepChance = 100
    let x = startx
    let y = starty

    while(chance(stepChance)) {
        const i = getRandomNumberInRange(1,10)
            switch (i) {
                case 1: x += 1; break;
                case 2: x -= 1; break;
                case 3: x += 1; x = (dir == ENUM_EXPLORE_DIR.east) ? y + 1 : y - 1; break;
                case 4: x -= 1; x = (dir == ENUM_EXPLORE_DIR.east) ? y + 1 : y - 1; break;
                default: y = (dir == ENUM_EXPLORE_DIR.east) ? y + 1 : y - 1; break;
            }
        if (x >= 0 && x < size && y >= 0 && y < size) {
            map[x][y].elevation = (!negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
        }
        else {
            stepChance = 0
        }
        stepChance -= getRandomNumberInRange(8 , 16)
    }
}

/**
 * draws an verical line of weight 1
 * @param {array} map 
 * @param {int} size 
 * @param {int} startx 
 * @param {int} starty 
 * @param {object} options { negative: bool }
 * @returns {Array}
 */
const horizontalLine = (map, size, startx, starty, options) => {
    const negative = (options.negative) ? options.negative : false
    const dir = (chance(50)) ? ENUM_EXPLORE_DIR.east : ENUM_EXPLORE_DIR.west
    let stepChance = 100
    let x = startx
    let y = starty

    while(chance(stepChance)) {
        const i = getRandomNumberInRange(1,10)
            switch (i) {
                case 1: y += 1; break;
                case 2: y -= 1; break;
                case 3: y += 1; x = (dir == ENUM_EXPLORE_DIR.east) ? x + 1 : x - 1; break;
                case 4: y -= 1; x = (dir == ENUM_EXPLORE_DIR.east) ? x + 1 : x - 1; break;
                default: x = (dir == ENUM_EXPLORE_DIR.east) ? x + 1 : x - 1; break;
            }
        if (x >= 0 && x < size && y >= 0 && y < size) {
            map[x][y].elevation = (!negative) ? map[x][y].elevation += 1 : map[x][y].elevation -= 1
        }
        else {
            stepChance = 0
        }
        stepChance -= getRandomNumberInRange(8 , 16)
    }
}


const getClosePoints = (map, size, startPosition = {}, options = {}) => {
    const positions = []
    const noOfPositions = (options.noOfPositions) ? options.noOfPositions : 4
    if (isEmptyObject(startPosition)) {
        startPosition = point2d( 
            getRandomNumberInRange(0, size-1),
            getRandomNumberInRange(0, size-1)
        )
    }
    for (let i = 0; i < noOfPositions; i++) {
        let tryNewPosition = true
        while(tryNewPosition) {
            const x = getRandomNumberInRange(startPosition.x - 5, startPosition.x + 5)
            const y = getRandomNumberInRange(startPosition.y - 5, startPosition.y + 5)
            if (x >= 0 && x < size && y >= 0 && y < size) {
                const p = point2d(x, y)
                if(!isPoint2dInArray(positions, p)) {
                    positions.push(p)
                    tryNewPosition = false
                }
            }
        }
    }
    return positions
}

/**
 * Adds magic level to rooms until 
 * world magic level is achived
 * 
 * @param {array} map 
 * @param {number} size 
 */
const windsOfMagic = (map, size) => {
    const worldMagicToAchive = getRandomNumberInRange(50 , 80)
    let worldMagicLevel = 0
    

    while(worldMagicLevel < worldMagicToAchive) {
        let x = getRandomNumberInRange(0, 99)
        let y = getRandomNumberInRange(0, 99)
        let stepChance = 100

        while (chance(stepChance)) {
            let moved = false
            const dir = getRandomNumberInRange(0,3)
            if (dir == 0 && x + 1 < size) {
                x++
                moved = true
            } else if (dir == 1 && y - 1 >= 0) {
                y--
                moved = true
            } else if (dir == 2 && x - 1 >= 0) {
                x--
                moved = true
            } else if (dir == 3 && y + 1 < size) {
                y++
                moved = true
            }
            if (moved) {
                const addMagic = getRandomNumberInRange(0 , 2)
                map[x][y].magicWind += addMagic
                worldMagicLevel += addMagic
            }
            stepChance -= getRandomNumberInRange(8 , 16)
        }
    }
}


module.exports = {
    setTempratureByLattitude,
    gradiantFilter,
    platueFilter,
    noiceFilterLight,
    horizontalLine,
    verticalLine,
    windsOfMagic,
    spikeFilter,
    getClosePoints,
    noiceFilterMedium,
    trueNoice,
    raiseGround
}




