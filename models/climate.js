const { getRandomNumberInRange } = require('../lib/utils')
const { get } = require('../localization')
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

module.exports = {
    tempratureByMonth,
    getTempratureDescription
}
