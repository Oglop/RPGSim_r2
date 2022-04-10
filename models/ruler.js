
const { chance, generateID, copyObject } = require('../lib/utils')
const { 
    ENUM_DWELLING_PROJECTS,
    ENUM_DWELLING_SIZE,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_PERSONALITIES,
    ENUM_PERSONALITY_DEALS_RESULT,
    ENUM_PERSONALITY_DEALS_TYPE
} = require('../generic/enums')
const objects = require('../generic/objects')
const { personalityDealsWith } = require('./personality')
const { dwelling } = require('../generic/objects')
const { restParty } = require('./party')

const distributeCityBudget = (character, dwelling) => {

}

const getRulerProject = (dwelling) => {

}

/**
 * returns true or false if dwelling savings is in buget
 * @param {object} dwelling 
 * @returns 
 */
const isWithinBudget = (dwelling) => {

    const percentage = 100 - Math.floor( (dwelling.court.monthlyExpense / dwelling.court.monthlyIncome) * 100 )
    //const percentage = Math.floor( (( dwelling.citizens * dwelling.citizenTaxable )) * (dwelling.taxRate * 0.01) / dwelling.gold )
    let rulerWhishedPercentage = 10
    switch (dwelling.court.ruler.personality) {
        case ENUM_PERSONALITIES.AMBITIOUS: rulerWhishedPercentage = 6; break;
        case ENUM_PERSONALITIES.CRUEL: rulerWhishedPercentage = 8; break;
        case ENUM_PERSONALITIES.GIFTED: rulerWhishedPercentage = 12; break;
        case ENUM_PERSONALITIES.GREEDY: rulerWhishedPercentage = 20; break;
        case ENUM_PERSONALITIES.INTELLIGENT: rulerWhishedPercentage = 10; break;
        case ENUM_PERSONALITIES.KIND: rulerWhishedPercentage = 4; break;
        case ENUM_PERSONALITIES.LAZY: rulerWhishedPercentage = 2; break;
        case ENUM_PERSONALITIES.NAIVE: rulerWhishedPercentage = 10; break;
        case ENUM_PERSONALITIES.PARANOID: rulerWhishedPercentage = 16; break;
        case ENUM_PERSONALITIES.RELIGIOUS: rulerWhishedPercentage = 8; break;
    }
    if (percentage >= rulerWhishedPercentage) { return true }
    return false
}


module.exports = {
    isWithinBudget
}

