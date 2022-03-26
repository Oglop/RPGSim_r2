// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE } = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray } = require('../lib/utils')

// STANDARD IMPORTS

const { getCharacterById } = require('../database').queries
const { tryToUnderstandEachOther } = require('./language')
const { personalityDealsWith, compabilityCheck } = require('./personality')


const taxesAndExpenses = (dwelling) => {
    const collectedTax = Math.floor( dwelling.citizens * citizenTaxable )
}

const consultAdvisor = async (dwelling) => {
    try {
        const advisorId = getRandomElementFromArray(dwelling.advisors)
        const ruler = await getCharacterById(dwelling.ruler.id)
        const advisor = await getCharacterById(advisorId)
        const advisoryResult = compabilityCheck( ruler, advisor )
        const result = (advisoryResult <= 0) ? ENUM_PERSONALITY_DEALS_RESULT.BAD : 
                        (advisoryResult >= 3) ? ENUM_PERSONALITY_DEALS_RESULT.GOOD : 
                                                ENUM_PERSONALITY_DEALS_RESULT.NORMAL
        return result
    }
    catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'consultAdvisor'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    consultAdvisor,
    taxesAndExpenses
}
