const { getRandomNumberInRange } = require('../lib/utils')

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

module.exports = {
    tempratureByMonth
}
