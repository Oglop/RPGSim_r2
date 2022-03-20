
const { ENUM_SEASONS } = require('../generic/enums')
const objects = require('../generic/objects')
const { copyObject } = require('./utils')
/**
 * Months year is 245 days
 */
const months = [
    { name:'Ice', numberOfDays: 21, season: ENUM_SEASONS.winter },
    { name:'Wind', numberOfDays: 20, season: ENUM_SEASONS.winter },
    { name:'Sun', numberOfDays: 21, season: ENUM_SEASONS.spring },
    { name:'Water', numberOfDays: 20, season: ENUM_SEASONS.spring },
    { name:'Wood', numberOfDays: 19, season: ENUM_SEASONS.spring },
    { name:'Light', numberOfDays: 21, season: ENUM_SEASONS.summer },
    { name:'Dragon', numberOfDays: 20, season: ENUM_SEASONS.summer },
    { name:'Fire', numberOfDays: 21, season: ENUM_SEASONS.summer },
    { name:'Steel', numberOfDays: 20, season: ENUM_SEASONS.fall },
    { name:'Stone', numberOfDays: 21, season: ENUM_SEASONS.fall },
    { name:'Moon', numberOfDays: 20, season: ENUM_SEASONS.fall },
    { name:'Darkness', numberOfDays: 21, season: ENUM_SEASONS.winter }
]

const date = {
    year: 1001,
    month: 2,
    day: 1
}

const getBirthDate = (currentDate, age) => {
    const bMonth = Math.floor(Math.random() * 12)
    const bYear = currentDate.year - age
    const bDay = Math.floor(1 + Math.random() * months[currentDate.month -1].numberOfDays)
    let d = JSON.parse(JSON.stringify(objects.date))
    d.year = bYear
    d.month = bMonth
    d.day = bDay
    return d
}
/**
 * Adds one day to a date object
 * @param {object} date 
 */
const addDay = date => {
    let past = 'd'
    date.day += 1
    if(date.day > months[date.month - 1].numberOfDays) { 
        past = addMonth(date)
    }
    return past
}

const addMonth = date => {
    let past = 'm'
    date.month += 1
    date.day = 1
    if(date.month >= months.length) {
        past = 'y'
        date.year += 1
        date.month = 1
        date.day = 1
    }
    return past
}

const addYear = date => {
    date.year += 1
    return 'y'
}

/**
 * 
 * @param {object} startDate 
 * @param {object} currentDate 
 */
const yearsPassed = (startDate, currentDate) => {
    let daysPassed = 0
    const yearDiff = currentDate.year - startDate.year
    daysPassed += yearDiff * 245
    const monthDiff = currentDate.month - startDate.month
    // if we are after start month add days until we are at the same month
    if (monthDiff > 0) {
        for (let i = startDate.month; i < currentDate.month; i++) {
            if ( i < currentDate.month) {
                daysPassed += months[i].numberOfDays
            } else {
                break
            }
        }
    } else if (monthDiff < 0) {
        daysPassed -= 245
        for (let i = 0; i < currentDate.month - 1; i++) {
            if (i < currentDate.month -1) {
                daysPassed += months[i].numberOfDays
            } else {
                break
            }
        } 
    }
    daysPassed += currentDate.day
    const yy = (daysPassed >= 245) ? Math.floor(daysPassed / 245) : 0
    return yy
}
/**
 * 
 * @param {object} startDate 
 * @param {object} currentDate 
 */
const monthsPassed = (startDate, currentDate) => {
    let daysPassed = 0
    const yearDiff = currentDate.year - startDate.year
    daysPassed += yearDiff * 245
    const monthDiff = currentDate.month - startDate.month
    // if we are after start month add days until we are at the same month
    if (monthDiff > 0) {
        for (let i = startDate.month; i < currentDate.month; i++) {
            if ( i < currentDate.month) {
                daysPassed += months[i].numberOfDays
            } else {
                break
            }
        }
    } else if (monthDiff < 0) {
        daysPassed -= 245
        for (let i = 0; i < currentDate.month - 1; i++) {
            if (i < currentDate.month -1) {
                daysPassed += months[i].numberOfDays
            } else {
                break
            }
        } 
    }
    daysPassed += currentDate.day
    const mm = (daysPassed >= 20) ? Math.floor(daysPassed / 20) : 0
    return mm
}

/**
 * echos date object
 * @param {object} date 
 */
const printDate = date => {
    return `${months[date.month -1].season} of ${date.year}, day ${date.day} in the month of ${months[date.month -1].name}`
}

const getSeason = (date) => {
    return months[date.month - 1].season
}

/**
 * Returns difference in year
 * 
 * @param {object} currentDate 
 * @param {object} historicDate 
 * @returns {BigInteger}
 */
const getAgeSimple = (currentDate, historicDate) => {
    return Math.floor(currentDate.year - historicDate.year)
}

const textToDate = (value) => {
    try {
        const split = value.split('-')
        const tmp = copyObject(date) 
        tmp.year =  parseInt(split[0])
        tmp.month =  parseInt(split[1])
        tmp.day =  parseInt(split[2])
        return tmp
    } catch (e) {
        throw new Error(`Unable to parse string ${value || ''} to date object.`)
    }
    
}

const dateToText = (value) => {
    return `${value.year}-${value.month}-${value.day}`
}

module.exports = {
    date, addDay, printDate, yearsPassed, getSeason, addMonth, getBirthDate, monthsPassed, addYear, getAgeSimple, textToDate, dateToText
}