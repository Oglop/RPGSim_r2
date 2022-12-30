const { getRandomNumberInRange } = require('../lib/utils')
const { get } = require('../localization')
const {
    ENUM_BIOMES, ENUM_WEATHER, ENUM_SEASONS
} = require('../generic/enums')
const {
    chance, getRandomNumber
} = require('../lib/utils')
const {
    getSeason
} = require('../lib/time')

/**
 * returns temprature based on month of year
 * @param { Number } temprature
 * @param {{year: number, month: number, day:number}} date 
 * @returns { temprature: Number } temprature modifyer
 */
const tempratureByMonth = (temprature, date) => {
    let monthTempratureMod
    switch (date.month) {
        case 0 : monthTempratureMod = -1; break;
        case 1 : monthTempratureMod = 0; break;
        case 2 : monthTempratureMod = 0; break;
        case 3 : monthTempratureMod = 1; break;
        case 4 : monthTempratureMod = 2; break;
        case 5 : monthTempratureMod = 2; break;
        case 6 : monthTempratureMod = 3; break;
        case 7 : monthTempratureMod = 3; break;
        case 8 : monthTempratureMod = 2; break;
        case 9 : monthTempratureMod = 1; break;
        case 10 : monthTempratureMod = 0; break;
        case 11 : monthTempratureMod = -1; break;
    }
    monthTempratureMod += getRandomNumberInRange(-1, 1)
    return temprature + monthTempratureMod
}

/**
 * 
 * @param {Number} temprature 
 * @returns {string} description
 */
const getTempratureDescription = (temprature) => {
    temprature = (temprature < -2) ? -2 : (temprature > 7) ? 7 : temprature
    switch (temprature) {
        case -2: return get('world-temprature-freezing')
        case -1: return get('world-temprature-freezing')
        case 0: return get('world-temprature-cold')
        case 1: return get('world-temprature-cold')
        case 2: return get('world-temprature-warm')
        case 3: return get('world-temprature-warm')
        case 4: return get('world-temprature-hot')
        case 5: return get('world-temprature-hot')
        case 6: return get('world-temprature-scorching')
        case 7: return get('world-temprature-scorching')
    }
}

const getRainModifier = date => {
    const season = getSeason(date)
    let modifier = 0
    if (season == ENUM_SEASONS.fall) { modifier += getRandomNumberInRange(2, 4) }
    if (season == ENUM_SEASONS.spring) { modifier += getRandomNumberInRange(0, 2) }
    if (season == ENUM_SEASONS.summer) { modifier += getRandomNumberInRange(0, 1) }
    if (season == ENUM_SEASONS.winter) { modifier += getRandomNumberInRange(1, 2) }
    return modifier * 10
}

const getWindModifier = date => {
    const season = getSeason(date)
    let modifier = 0
    if (season == ENUM_SEASONS.fall) { modifier += getRandomNumberInRange(1, 3) }
    if (season == ENUM_SEASONS.spring) { modifier += getRandomNumberInRange(1, 3) }
    if (season == ENUM_SEASONS.summer) { modifier += getRandomNumberInRange(0, 1) }
    if (season == ENUM_SEASONS.winter) { modifier += getRandomNumberInRange(0, 1) }
    return modifier * 10
}

/**
 * returns current weather
 * @param {number} temprature 
 * @param {ENUM_BIOMES} biome 
 * @param { { year: number, month: number, day: number } } options 
 * @returns { ENUM_WEATHER } weather
 */
const getWeather = (temprature, biome, date) => {
    const temp = getRandomNumberInRange(temprature - 2, temprature + 2)
    let rainModifier = getRainModifier(date)
    let windModifier = getWindModifier(date)
    
    if (biome == ENUM_BIOMES.badlands) { rainModifier -= 10 }
    if (biome == ENUM_BIOMES.dessert) { rainModifier -= 20 }
    if (biome == ENUM_BIOMES.mountains) { windModifier += 20 }
    if (biome == ENUM_BIOMES.hills) { windModifier += 10 }
    if (biome == ENUM_BIOMES.swamp) { rainModifier += 10 }

    if (temp < 0) {
        if (chance(20 + rainModifier)) {
            return ENUM_WEATHER.SNOWY
        }
        if (chance(30 + rainModifier)) {
            return ENUM_WEATHER.CLOUDY
        }
    } else if (temp >= 0 && temp < 3) {
        if (chance(20 + rainModifier)) {
            return ENUM_WEATHER.RAINY
        }
        if (chance(30 + rainModifier)) {
            return ENUM_WEATHER.CLOUDY
        }
        if (chance(10 + windModifier)) {
            return ENUM_WEATHER.WINDY
        }
    } else if (temp >= 3 && temp < 5) {
        if (chance(10 + rainModifier)) {
            return ENUM_WEATHER.RAINY
        }
        if (chance(20 + rainModifier)) {
            return ENUM_WEATHER.CLOUDY
        }
        if (chance(10 + windModifier)) {
            return ENUM_WEATHER.WINDY
        }
    } else {
        if (chance(10 + windModifier)) {
            return ENUM_WEATHER.CLOUDY
        }
        if (chance(10 + windModifier)) {
            return ENUM_WEATHER.WINDY
        }
    }
    return ENUM_WEATHER.CLEAR
}

/**
 * returns description of weather
 * @param {ENUM_WEATHER} weather 
 * @returns {Text}
 */
const getWeatherDescription = weather => {
    switch (weather) {
        case ENUM_WEATHER.CLEAR: return get('weather-clear-description');
        case ENUM_WEATHER.CLOUDY: return get('weather-cloudy-description');
        case ENUM_WEATHER.RAINY: return get('weather-rain-description');
        case ENUM_WEATHER.SNOWY: return get('weather-snow-description');
        case ENUM_WEATHER.WINDY: return get('weather-windy-description');
    }
}

module.exports = {
    tempratureByMonth,
    getTempratureDescription,
    getWeather,
    getWeatherDescription
}
