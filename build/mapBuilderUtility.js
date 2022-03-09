const { getRandomNumberInRange, chance } = require('../lib/utils')


/**
 * Set temprature to map of size 100
 * 
 * @param {Array} map 
 * @returns {Object}
 */
const setTempratureByLattitude = (map) => {
    const  size = 100

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
    
    for (let y=0; y<size; y++){
        for (let x = 0; x<size;x++) {
            if (y <= temps.freezing.lattitude || y >= size-temps.freezing.lattitude) { 
                map[x][y].temprature = getRandomNumberInRange(temps.freezing.minVariance, temps.freezing.maxVariance) 
            } else if (y > temps.freezing.lattitude && y <= temps.cold.lattitude 
                || y < size-temps.freezing.lattitude && y >= temps.cold.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.cold.minVariance, temps.cold.maxVariance) 
            } else if (y > temps.cold.lattitude && y <= temps.medium.lattitude 
                || y < size-temps.cold.lattitude && y >= temps.medium.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.medium.minVariance, temps.medium.maxVariance) 
            } else if (y > temps.medium.lattitude && y <= temps.warm.lattitude 
                || y < size-temps.medium.lattitude && y >= temps.warm.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.warm.minVariance, temps.warm.maxVariance) 
            } else if (y > temps.hot.lattitude && y < size - temps.hot.lattitude) {
                    map[x][y].temprature = getRandomNumberInRange(temps.hot.minVariance, temps.hot.maxVariance) 
            }

        }
    }

    return map
}


const gradiantFilter = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false
    
    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            

        }
    }
}


const platueFilter = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false
    const field = (options.field) ? options.field : "elevation"
        
    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {

            }
        }
    }
}

const noiceFilterLight = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false
    const field = (options.field) ? options.field : "elevation"

    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                const i = getRandomNumberInRange(1 , 6)
                switch (i) {
                    case 1: map[x][y][field] = (!negative) ? map[x][y][field] += 1 : map[x][y][field] -= 1
                    case 2: map[x][y][field] = (negative) ? map[x][y][field] += 1 : map[x][y][field] -= 1
                }
            }
        }
    }
    return map
}

const verticalLine = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false

    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                
            }
        }
    }
}

const horizontalLine = (map, size, startx, starty, options) => {
    const penSize = (options.penSize) ? options.penSize : 10
    const negative = (options.negative) ? options.negative : false

    for (let y = starty - Math.floor(penSize * 0.5); y < penSize; y++ ) {
        for (let x = startx - Math.floor(penSize * 0.5); x < penSize; x++ ) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                
            }
        }
    }
}

module.exports = {
    setTempratureByLattitude,
    gradiantFilter,
    platueFilter,
    noiceFilterLight
}




