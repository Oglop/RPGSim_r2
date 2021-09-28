const { getRandomNumber } = require('../lib/utils')
const { ENUM_LANGUAGES } = require('../generic/enums')
const { logError } = require('../data/errorFile')

/**
 * 
 * 
 * @param {Object} character 
 * @param {ENUM_LANGUAGES} language 
 */
const languageCheck = (character, language) => {
    try {
        let i = 0
        const lang = character.languages.find(l => l.name === language)
        if (lang != undefined) {    
            if (getRandomNumber(20) <= lang.mastery) {
                return true
            }
        }
        return false
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'languageCheck'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    languageCheck
}