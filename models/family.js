const { compabilityCheck } = require('../models/personality')
const { chance, copyObject, getRandomNumberInRange, getIndexOfObjectInArrayById, getRandomElementFromArray } = require('../lib/utils')
const { logError } = require('../data/errorFile')
const { validateCharacterCompabilityForMarige, setRelation, checkForOldAge } = require('./character')
const objects = require('../generic/objects')
const { ENUM_GENDER, ENUM_JOB_NAMES } = require('../generic/enums')
const characterBuilder = require('../build/character')
const { NoAliveCharacterInArray } = require('../exceptions')
const { character, family } = require('../generic/objects')

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

const getRulingMember = (family, options = {}) => {
    const c = family.members.find(m => m.id == family.ruler)
    if (!c || !c.isAlive) {
        // TODO find new ruler
    }
    return c
}

/**
 * retuirn all families with dwelling id = dwellingId in families
 * 
 * @param {Array} families 
 * @param {String} dwellingId 
 * @returns {Array} families with dwellingId
 */
const getFamiliesByDwellingId = (families, dwellingId) => {
    const fams = []
    for (let i = 0; i < families.length; i++) {
        if (families[i].dwellingId == dwellingId) {
            fams.push(families[i])
        }
    }
    return fams
}

/**
 * 
 * @param {Objects} families 
 * @param {String} famId Id of family of re distribution
 * @param {*} amount 
 */
const distributInfluence = (families, famId, amount, characterId = undefined) => {
    if (characterId) {
        famId = getFamilyIdByCharacterId(families, characterId)
    }
    const dist = Math.floor( amount / (families.length - 1) )
    for (let i = 0; i < families.length; i++) {
        if (families[i].id == famId) { families[i].influence += amount }
        else { families[i].influence -= dist }
    }
}

/**
 * Returns oldest person in family with highest influence by dwelling id
 * @param {Array} families 
 * @param {string} dwellingId 
 * @returns {Object} character
 */
const getLeaderByDwellingId = (families, dwellingId) => {
    let rulingFamily = undefined
    for (let i = 0; i < families.length; i++) {
        if (families[i].dwellingId == dwellingId) {
            if (!rulingFamily) { rulingFamily = families[i] }
            if (rulingFamily.id != families[i].id && families[i].influence > rulingFamily.id ) { rulingFamily = families[i] }
        }
    }
    if (rulingFamily) {
        const c = getRulingMember(rulingFamily)
        return c
    }
    throw new Error('No leader found')
}

/**
 * @param {Array} families
 * @param {String} characterId
 * @returns {String} familyId
 */
const getFamilyIdByCharacterId = (families, characterId) => {
    for (let i = 0; i < families.length; i++) {
        if (families[i].ruler == characterId) {
            return families[i].id
        } else {
            if (families.members.find(m => m.id == characterId) != undefined) {
                return families[i].id
            }
        }
    }
    throw new Error('No family for characterId')
}

/**
 * 
 * @param {Object} family 
 * @returns {Object} character
 */
const getRandomAlivePerson = (family) => {
    const alive = []
    for (character of family.members) {
        if (character.isAlive) { alive.push(character) }
    }
    if (alive.length) {
        return getRandomElementFromArray(alive)
    }
    throw new NoAliveCharacterInArray('getRandomAlivePerson')
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
    const compatibel = { char1: undefined, char2: undefined }
    const arr = []

    for (let i = 0; i < family1.members.length; i++) {
        for (let j = 0; j < family2.members.length; j++) {
            // console.log(`i ${i}:${family1.members.length}, j ${family2.members.length} ${j}`)

            if (validateCharacterCompabilityForMarige(family1.members[i], family2.members[j])) {
                if (chance(50)) {
                    const compPoints = compabilityCheck(family1.members[i], family2.members[j])
                    setRelation(family1.members[i], family2.members[j], compPoints)
                    const o = copyObject(compatibel)
                    o.char1 = family1.members[i]
                    o.char2 = family2.members[j]
                    arr.push(o)  
                    // marriage(family1.members[i], family2.members[j], family1, family2)
                }
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        marriage(arr[i].char1, arr[i].char2, family1, family2)
    }
}

/**
 * Remove dead characters from families
 * 
 * @param {Array} family 
 * @param {Object} output 
 */
const burial = (family, dead, output) => {
    let foundDeadPeople = true
    try {
        while(foundDeadPeople) {
            foundDeadPeople = false
            for (let i = 0; i < family.members.length; i++) {
                if (!family.members[i].isAlive) {
                    dead.push(family.members[i])
                    output.print(`${family.members[i].name} of ${family.name} died from ${family.members[i].diedFrom}.` )
                    family.members.splice(i, 1)

                    foundDeadPeople = true
                    break
                }               
            }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'burial'
        err.message = e.message
        logError(err)
    }
}

/**
 * Remove dead characters
 * 
 * @param {Array} families 
 * @param {Object} output 
 */
const removeDead = (families, dead, output) => {
    for (let family of families) {
        burial(family, output)
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
    try {
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
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'marriage'
        err.message = e.message
        logError(err)
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
 * @param {Array} families Array of families
 * @param {Object} data  current date
 */
const checkPregnancies = (families, date) => {
    try {
        for (let i = 0; i < families.length; i++) {
            for (let j = 0; j < families[i].members.length; j++) {
                if (families[i].members[j].pregnant == true) {
                    if (families[i].members[j].pregnantTime >= 9) {
                        families[i].members[j].pregnant = false
                         families[i].members[j].pregnantTime = 0
                        const baby = characterBuilder.build({
                            job: ENUM_JOB_NAMES.noble,
                            race: families[i].members[j].race,
                            age:0,
                            mother: families[i].members[j].id,
                            father: families[i].members[j].marriedTo,
                            religion: families[i].members[j].religion,
                            date
                        })
                        families[i].members.push(baby)
                    }
                    families[i].members[j].pregnantTime += 1
                } else if (families[i].members[j].pregnant == false &&
                    families[i].members[j].gender == ENUM_GENDER.FEMALE &&
                    families[i].members[j].marriedTo) {
                        const result = []
                        for(member of families[i].members) { if(member.mother === families[i].members[j].id) { result.push('.')}}
                        const pregnancyCheck = 80 - families[i].members[j].age - (result.length * 10)
                        if(chance(pregnancyCheck)) {  
                            families[i].members[j].pregnant = true
                            families[i].members[j].pregnantTime = 0
                        } // if chance
                } // else if
            }// for j
        }// for i
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'checkPregnancies'
        err.message = e.message
        logError(err)
    }
}

const checkFamiliesForAge = (families) => {
    for (let family of families) {
        for (let member of family.members) {
            if (member.isAlive) { checkForOldAge(member) }
        }
    }
}



module.exports = {
    checkMarriages,
    checkPregnancies,
    socialize,
    getLeaderByDwellingId,
    getRulingMember,
    getFamiliesByDwellingId,
    distributInfluence,
    getFamilyIdByCharacterId,
    getRandomAlivePerson,
    checkFamiliesForAge,
    removeDead
}