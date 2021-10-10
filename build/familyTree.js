const { copyObject, chance, generateID, getRandomNumberInRange, getIndexOfObjectInArrayById } = require('../lib/utils')
const { ENUM_GENDER, ENUM_RACE_NAMES, ENUM_DWELLINGS } = require('../generic/enums')
const { addYear, getAgeSimple } = require('../lib/time')
const { getDwellingName } = require('../generic/names')
const objects = require('../generic/objects')
const familyBuilder = require('../build/families')
const { MAX_MARRIAGE_AGE_GAP, 
    MIN_MARRIAGE_AGE
} = require('../generic/statics')
const { logError } = require('../data/errorFile')

/**
 * 
 * @param {object} options 
 * @returns {object} dwellings
 */
const newDwelling = (options) => {
    const dwelling = copyObject(objects.dwelling)
    dwelling.name = getDwellingName()
    dwelling.id = generateID()
    dwelling.type = (options.type) ? options.type: ENUM_DWELLINGS.TOWN
    return dwelling
}


const marriage = (character1, character2, family1, family2, output) => {
    try {
        if (character1.gender === ENUM_GENDER.MALE) {
            output.print(`${character2.name} got married to ${character1.name} and joins house ${family1.name}`)
            let toBeremoved = getIndexOfObjectInArrayById(family2.members, character2.id)
            family2.members.splice(toBeremoved, 1)
            family1.members.push(character2)
        } else {
            output.print(`${character1.name} got married to ${character2.name} and joins house ${family2.name}`)
            let toBeremoved = getIndexOfObjectInArrayById(family1.members, character1.id)
            family1.members.splice(toBeremoved, 1)
            family2.members.push(character1)
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'marriage'
        err.message = e.message
        logError(err)
    }
}

const checkUnmarriedFamilyMembers = (family1, family2, currentDate, output) => {
    const compatibel = { char1: undefined, char2: undefined }
    const arr = []
    for (let i = 0; i < family1.members.length; i++) {
        for (let j = 0; j < family2.members.length; j++) {
            if (validateCharacterCompabilityForMarige(family1.members[i], family2.members[j], currentDate)) {
                if (chance(20)) {
                    family1.members[i].marriedTo = family1.members[j].id
                    family2.members[j].marriedTo = family1.members[i].id
                    const o = copyObject(compatibel)
                    o.char1 = family1.members[i]
                    o.char2 = family2.members[j]
                    arr.push(o)  
                }
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        marriage(arr[i].char1, arr[i].char2, family1, family2, output)
    }
}

const validateFamilyCompability = (family1, family2, checkRace = true) => {
    if (family1.dwellingId != family2.dwellingId) { return false }
    if (checkRace && (family1.members[0].race != family2.members[0].race)) { return false }
    return true
}


const validateCharacterCompabilityForMarige = (char1, char2, currentDate) => {
    try {
        if (char1.race != char2.race) { return false }
        if (char1.gender == char2.gender) { return false }
        if (Math.abs(char1.age - char2.age) > MAX_MARRIAGE_AGE_GAP) { return false }
        if (getAgeSimple(currentDate, char1.birthDate) < MIN_MARRIAGE_AGE || getAgeSimple(currentDate, char2.birthDate) < MIN_MARRIAGE_AGE) { return false }
        if (char1.marriedTo || char2.marriedTo) { return false }
        if (!char1.isAlive || !char2.isAlive) { return false }
        if (char1.mother == char2.mother || char1.father == char2.father) { return false }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'validateCharacterCompabilityForMarige'
        err.message = e.message
        logError(err)
    }
    return true
}

const marriages = (families, currentDate, output) => {
    for (let i = 0; i < families.length; i++) {
        for (let j = i + 1; j < families.length; j++) {
            if (validateFamilyCompability(families[i], families[j])){
                checkUnmarriedFamilyMembers(families[i], families[j], currentDate, output)
            }
        }
    }
}

const moves = (dwellings, families) => {

}



/**
 * Genererate options.years worth of hostory
 * options: {
 * noOfStartFamilies: number of start families per dwelling
 * noOfStartDwellings: dwellings if hum,na these will be cities
 *  years: 100
 *  race: ENUM_RACE_NAME
 * }
 * 
 * @param {object} world 
 * @param {object} options 
 */
module.exports.build = (world, output, options) => {
    const years = (options.years) ? options.years : 1000
    const noOfStartFamilies = (options.noOfStartFamilies) ? options.noOfStartFamilies : 4
    const noOfStartDwellings = (options.noOfStartDwellings) ? options.noOfStartDwellings : 3
    const race = (options.race) ? options.race : ENUM_RACE_NAMES.human

    const dwellings = []
    const families = []

    for (let i = 0; i < noOfStartDwellings; i++) {
        const d = newDwelling({ type: ENUM_DWELLINGS.TOWN })
        dwellings.push(d)
        for (let i = 0; i < noOfStartFamilies; i++) {
            const f = familyBuilder.createFamily({
                race,
                dwellingId: d.id,
                date: world.date
            })
            families.push(f)
        }
    }

    for(let year = 0; year < years; year++) {
        const newFamilies = []
        const newDwellings = []
        
        marriages(families, world.date, output)

        addYear(world.date)
    }

}