
const { ENUM_SEASONS, ENUM_MOON_PHASE } = require('../generic/enums')
const objects = require('../generic/objects')
const { get } = require('../localization')
const { copyObject } = require('./utils')
/**
 * Days in a year is 245
 * Moon cycle is 20.4 days
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

const getBirthDateDescription = (date) => {
    const value = get('time-birthDate', [ 
        months[date.month].name,
        date.year
    ])
    return value
}

const removeByMonth = (month, array) => {
	const monthName = months[month].name
 	const index = array.indexOf(e => e.name == monthName)
  if (index != undefined) {
  	array.splice(index, 1)
   // return true
  }
  //return false
}

/**
 * returns number of days past between dates.
 * returns zero if historic date is greater than current date
 * @param {{ year: number, month: number, day: number }} currentDate 
 * @param {{ year: number, month: number, day: number }} historicDate 
 * @returns { Integer } numberOfDaysPast
 */
const daysPast = (currentDate, historicDate) => {
    let days = 0
    const daysInYear = 245

    // blockers to return zero when historic date is in the future
    if (currentDate.year < historicDate.year) {
        return 0
    }
    if (currentDate.year == historicDate.year && currentDate.month < historicDate.month) {
        return 0
    }
    if (currentDate.year == historicDate.year && currentDate.month == historicDate.month && currentDate.day < historicDate.day) {
        return 0
    }

    // Add days of full years
    if (currentDate.year - historicDate.year > 1) {
        days = ((currentDate.year - 1) - historicDate.year) * daysInYear
    }
    //console.log(`Add days of full years-------------------------------------------------------------------- - 1 ${days}`)
    // Add days from month of first historic year
    // add days from all months except the historic started month
    if (currentDate.year != historicDate.year) {
        const monthsToAddFromFirstHistoricYear = months.slice(historicDate.month, months.length)
        //console.log(`monthsToAddFromFirstHistoricYear.length pre-------------------------------------------------------------------- - 1 ${monthsToAddFromFirstHistoricYear.length}`)
        removeByMonth(historicDate.month, monthsToAddFromFirstHistoricYear)
        //console.log(`monthsToAddFromFirstHistoricYear.length post------------------------------------------------------------------- - 1 ${monthsToAddFromFirstHistoricYear.length}`)
        //console.log(`monthsToAddFromFirstHistoricYear ------------------------------------------------------------------- - 1 ${JSON.stringify(monthsToAddFromFirstHistoricYear)}`)
        if (monthsToAddFromFirstHistoricYear.length) {
            monthsToAddFromFirstHistoricYear.forEach(month => days += month.numberOfDays)
        }
    }
    
    //console.log(`Add days from month of first historic year----------------------------------------------------------------------- - 2 ${days}`)
    
    // Add days from months past the current year
    const sliceFrom = (currentDate.year == historicDate.year) ? historicDate.month : 0
    const monthsToAddFromCurrentYear = months.slice(sliceFrom, currentDate.month + 1)
    //console.log(`monthsToAddFromCurrentYear.length post------------------------------------------------------------------- - 2 ${monthsToAddFromCurrentYear.length}`)
    removeByMonth(currentDate.month, monthsToAddFromCurrentYear)
    //console.log(`monthsToAddFromCurrentYear.length post------------------------------------------------------------------- - 2 ${monthsToAddFromCurrentYear.length}`)
    //console.log(`monthsToAddFromCurrentYear ------------------------------------------------------------------- - 2 ${JSON.stringify(monthsToAddFromCurrentYear)}`)
    if (monthsToAddFromCurrentYear.length) {
        monthsToAddFromCurrentYear.forEach(month => days += month.numberOfDays)
    }
    //console.log(`Add days from months past the current year------------------------------------------------------------------------- - 3 ${days}`)

    
    // Add remaining days from historic and current months
    if (currentDate.year == historicDate.year && currentDate.month == historicDate.month) {
        days += currentDate.day - historicDate.day
    } else {
        console.log(`months[historicDate.month].numberOfDays - historicDate.day - 4 ${months[historicDate.month].numberOfDays - historicDate.day}`)
        days += months[historicDate.month].numberOfDays - historicDate.day
        days += currentDate.day
    }
    //console.log(`Add remaining days from historic and current months--------------------------------------------------------------- - 4 ${days}`)
    return days
}

/**
 * returns the current phase of the moon
 * @param {{ year: number, month: number, day: number }} currentDate
 * @returns { ENUM_MOON_PHASE }
 */
const moonPhase = currentDate => {
    const moonCycleNoOfDays = 20.4
    const dateOfFirstNewMoon = {
        year: 1,
        month: 1,
        day: 2
    }
    const daysPastSinceNewMoon = daysPast(currentDate, dateOfFirstNewMoon)
    const cycles = daysPastSinceNewMoon / moonCycleNoOfDays
    const daysIntoCycle = Math.trunc((cycles % 1) * moonCycleNoOfDays)

    if (daysIntoCycle <= 1) { return ENUM_MOON_PHASE.NEW }
    if (daysIntoCycle >= 2 &&  daysIntoCycle <= 4) { return ENUM_MOON_PHASE.WAXING_CRESCENT }
    if (daysIntoCycle >= 5 &&  daysIntoCycle <= 7) { return ENUM_MOON_PHASE.FIRST_QUARTER }
    if (daysIntoCycle >= 8 &&  daysIntoCycle <= 10) { return ENUM_MOON_PHASE.WAXING_GIBBIOUS }
    if (daysIntoCycle == 11) { return ENUM_MOON_PHASE.FULL }
    if (daysIntoCycle >= 12 &&  daysIntoCycle <= 14) { return ENUM_MOON_PHASE.WANING_GIBBIOUS }
    if (daysIntoCycle >= 15 &&  daysIntoCycle <= 17) { return ENUM_MOON_PHASE.THIRD_QUARTER }
    if (daysIntoCycle >= 18) { return ENUM_MOON_PHASE.WANING_CRESCENT }
}

/**
 * returns the current phase of the moon as text
 * @param {{ year: number, month: number, day: number }} currentDate
 * @returns { Text }
 */
const moonPhaseText = currentDate => {
    const phase = moonPhase(currentDate)
    switch (phase) {
        case ENUM_MOON_PHASE.NEW: return get('moon-phase-new')
        case ENUM_MOON_PHASE.WAXING_CRESCENT: return get('moon-phase-waxing-crescent')
        case ENUM_MOON_PHASE.FIRST_QUARTER: return get('moon-phase-first-quarter')
        case ENUM_MOON_PHASE.WAXING_GIBBIOUS: return get('moon-phase-waxing-gibbious')
        case ENUM_MOON_PHASE.FULL: return get('moon-phase-full')
        case ENUM_MOON_PHASE.WANING_GIBBIOUS: return get('moon-phase-waning-gibbious')
        case ENUM_MOON_PHASE.THIRD_QUARTER: return get('moon-phase-third-quarter')
        case ENUM_MOON_PHASE.WANING_CRESCENT: return get('moon-phase-waning-crescent')
    }
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
    date, addDay, printDate, yearsPassed, getSeason, addMonth, getBirthDate, monthsPassed, addYear, getAgeSimple, textToDate, dateToText, getBirthDateDescription, moonPhaseText, moonPhase, daysPast
}