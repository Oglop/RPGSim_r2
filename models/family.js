const { compabilityCheck } = require('../models/personality')
const { chance } = require('../lib/utils')
const { logError } = require('../data/errorFile')
const { validateCharacterCompabilityForMarige } = require('./character')




/**
 * return true if families are in same city 
 * 
 * @param {Object} family1 
 * @param {Object} family2 
 * @returns {Boolean}
 */
const validateFamilyCompability = (family1, family2) => {
    if (family1.dwellingId != family2.dwellingId) { return false }
    if (family1[0].race != family2[0].race) { return false }
    return true
}

const checkUnmarriedFamilyMembers = (family1, family2) => {
    
    for (let i = 0; i < family1.members.length; i++) {
        for (let j = i + 1; j < family2.members.length; j++) {
            if (validateCharacterCompabilityForMarige(family1.members[i], family2.members[j])) {
                compabilityCheck(family1.members[i], family2.members[j])
            }
        }
    }
}


/**
 * 
 * 
 * @param {Array} families 
 */
const checkMarriages = (families) => {
    try {
        for (let i = 0; i < families.length; i++) {
            for (let j = i + 1; j < families.length; j++) {
                if (validateFamilyCompability(families[i], families[j])) {
                    checkUnmarriedFamilyMembers(families[i], families[j])
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
}

/**
 * 
 * 
 * @param {Array} families 
 */
const checkPregnancies = (families) => {
    try {

    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'tryToUnderstandEachOther'
        err.message = e.message
        logError(err)
    }
}


module.exports = {
    checkMarriages,
    checkPregnancies
}