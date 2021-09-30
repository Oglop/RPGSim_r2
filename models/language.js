const { getRandomNumber } = require('../lib/utils')
const { ENUM_LANGUAGES } = require('../generic/enums')
const { logError } = require('../data/errorFile')


const tryToUnderstandEachOther = (char1, char2) => {
    try {
        for(l1 of char1.languages) {
            for(l2 of char2.languages) {
                if (l1.name === l2.name) {
                    if(languageCheck(char1, l1.name) || languageCheck(char2, l2.name)) {
                        return true
                    }
                }
            }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'tryToUnderstandEachOther'
        err.message = e.message
        logError(err)
    }
    return false;
}


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
    languageCheck,
    tryToUnderstandEachOther
}