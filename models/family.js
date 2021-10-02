const { compabilityCheck } = require('../models/personality')
const { chance, copyObject, getRandomNumberInRange, getIndexOfObjectInArrayById } = require('../lib/utils')
const { logError } = require('../data/errorFile')
const { validateCharacterCompabilityForMarige, setRelation } = require('./character')
const objects = require('../generic/objects')
const { ENUM_GENDER } = require('../generic/enums')

/**
 * return true if families are in same city 
 * 
 * @param {Object} family1 
 * @param {Object} family2 
 * @param {boolean} checkRace check if race is same
 * @returns {Boolean}
 */
const validateFamilyCompability = (family1, family2, checkRace = true) => {
    if (family1.dwellingId != family2.dwellingId) { return false }
    if (checkRace && (family1.members[0].race != family2.members[0].race)) { return false }
    return true
}

/**
 * 
 * 
 * @param {Array} families 
 */
const socialize = (families) => {
    try {
        for (let i = 0; i < families.length; i++) {
            for (let j = i + 1; j < families.length; j++) {
                if (validateFamilyCompability(families[i], families[j], false)) {
                    let socialize = 60
                    while (chance(socialize)) {
                        const i1 = getRandomNumberInRange(0, families[i].members.length -1)
                        const i2 = getRandomNumberInRange(0, families[j].members.length - 1)
                        const compPoints = compabilityCheck(
                            families[i].members[i1],
                            families[j].members[i2]
                        )
                        setRelation(families[i].members[i1], families[j].members[i2], compPoints)
                        socialize -= 10
                    }
                }
            }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'socialize'
        err.message = e.message
        logError(err)
    }
}

/**
 * check family members
 * 
 * @param {Object} family1 
 * @param {Object} family2 
 */
const checkUnmarriedFamilyMembers = (family1, family2) => {
    for (let i = 0; i < family1.members.length; i++) {
        for (let j = i + 1; j < family2.members.length; j++) {
            if (validateCharacterCompabilityForMarige(family1.members[i], family2.members[j])) {
                if (chance(50)) {
                    const compPoints = compabilityCheck(family1.members[i], family2.members[j])
                    setRelation(family1.members[i], family2.members[j], compPoints)
                    marriage(family1.members[i], family2.members[j], family1, family2)
                }
            }
        }
    }
}

/**
 * 
 * 
 * @param {Object} character1 
 * @param {Object} character2 
 * @param {Object} family1 
 * @param {Object} family2 
 */
const marriage = (character1, character2, family1, family2) => {
    let r1 = character1.relationships.find(r => r.id === character2.id)
    let r2 = character2.relationships.find(r => r.id === character1.id)
    let pointsSum = (r1 && r2) ? r1.points + r2.points : 0
    if (chance(pointsSum)) {
        character1.marriedTo = character2.id
        character2.marriedTo = character1.id
        if (character1.gender === ENUM_GENDER.MALE) {
            let toBeremoved = getIndexOfObjectInArrayById(family2.members, character2.id)
            family2.members.splice(toBeremoved, 1)
            family1.members.push(character2)
        } else {
            let toBeremoved = getIndexOfObjectInArrayById(family1.members, character1.id)
            family1.members.splice(toBeremoved, 1)
            family2.members.push(character1)
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
        err.function = 'checkMarriages'
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
    checkPregnancies,
    socialize
}