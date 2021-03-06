const { copyObject, chance, generateID, getRandomNumberInRange, getIndexOfObjectInArrayById } = require('../lib/utils')
const { ENUM_GENDER, ENUM_RACE_NAMES, ENUM_DWELLINGS, ENUM_JOB_NAMES, ENUM_BIOMES } = require('../generic/enums')
const { addYear, getAgeSimple } = require('../lib/time')
const { getDwellingName } = require('../generic/names')
const objects = require('../generic/objects')
const familyBuilder = require('../build/families')
const characterBuilder = require('../build/character')
const { MAX_MARRIAGE_AGE_GAP, 
    MIN_MARRIAGE_AGE
} = require('../generic/statics')
const { logError } = require('../data/errorFile')
const text = require('../localization')
const { NoPositionAvailableError } = require('../exceptions')

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

const checkUnmarriedFamilyMembers = (family1, family2, currentDate, output) => {
    const i = getRandomNumberInRange(0, family1.members.length - 1)
    const j = getRandomNumberInRange(0, family2.members.length - 1)
    if (validateCharacterCompabilityForMarige(family1.members[i], family2.members[j], currentDate)) {
        if (chance(20)) {
            try {
                family1.members[i].marriedTo = family2.members[j].id
                family2.members[j].marriedTo = family1.members[i].id
                if (family1.members[i].gender === ENUM_GENDER.MALE) {
                    try {
                        output.print(`${family2.members[j].name} got married to ${family1.members[i].name} and joins house ${family1.name}`)
                        let toBeremoved = getIndexOfObjectInArrayById(family2.members, family2.members[j].id)
                        family1.members.push(family2.members[j])
                        family2.members.splice(toBeremoved, 1)
                    } catch(e) {
                        console.log(e.message)
                    }
                    
                } else {
                    try {
                        output.print(`${family1.members[i].name} got married to ${family2.members[j].name} and joins house ${family2.name}`)
                    let toBeremoved = getIndexOfObjectInArrayById(family1.members, family1.members[i].id)
                    family2.members.push(family1.members[i])
                    family1.members.splice(toBeremoved, 1)
                    } catch(e) {
                        console.log(e.message)
                    }
                    
                }
            } catch (e) {
                const err = objects.error
                err.file = __filename
                err.function = 'checkUnmarriedFamilyMembers'
                err.message = e.message
                logError(err)
            }
            
        }
    }
}

const validateFamilyCompability = (family1, family2, checkRace = true) => {
    try {
        if (family1.dwellingId != family2.dwellingId) { return false }
        if (checkRace && (family1.members[0].race != family2.members[0].race)) { return false }
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'validateFamilyCompability'
        err.message = e.message
        logError(err)
    }
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

/**
 * Atempts to marry two people in families
 * 
 * @param {Array} families 
 * @param {object} currentDate 
 * @param {object} output 
 */
const marriages = (families, currentDate, output) => {
    for (let i = 0; i < families.length; i++) {
        for (let j = i + 1; j < families.length; j++) {
            if (families[i].members.length && families[j].members.length) {
                if (validateFamilyCompability(families[i], families[j])){
                    const atempts =  getRandomNumberInRange(1, 5)
                    for (let k = 0; k < atempts; k++) {
                        if(families[i].members.length && families[j].members.length) { 
                            checkUnmarriedFamilyMembers(families[i], families[j], currentDate, output) 
                        }
                    }
                    
                }
            }
            
        }
    }
}

/**
 * remove families that has no members
 * 
 * @param {array} families 
 * @param {object} output 
 * @returns {array} families
 */
const removeDeadFamilies = (families, output) => {
    const alive = []
    for (let family of families) {
        if(family.members.length) {
            alive.push(family)
        } else {
            output.print(text.get('familyTree-removeDeadFamilies-1', [ family.name ]))
        }
    }
    return alive
}

/**
 * returns number of children on mother id
 * @param {Object} family 
 * @param {string} id 
 * @returns {int} noOfKids
 */
const noOfKids = (family, id) => {
    let noOfKids = 0
    try {
        for (let member of family.members) {
            if (member.mother == id) { noOfKids++ }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'noOfKids'
        err.message = e.message
        logError(err)
    }
    return noOfKids
}

/**
 * return no of families with dwelling id 
 * @param {Array} families 
 * @param {string} dwellingId 
 * @returns {int} noOfFamilies
 */
const noOfFamiliesInDwelling = (families, dwellingId) => {
    let noOfFamilies = 0
    try {
        for (let family of families) {
            if (family.dwellingId == dwellingId) { noOfFamilies++ }
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'noOfFamiliesInDwelling'
        err.message = e.message
        logError(err)
    }
    return noOfFamilies
}

const getKids = (families, currentDate, output) => {
    try {
        for(let family of families) {
            for(let member of family.members) {
                if (member.gender == ENUM_GENDER.FEMALE &&
                    member.marriedTo) {
                        const kids = noOfKids(family, member.id)
                        const test = (80 - getAgeSimple(currentDate, member.birthDate)) - (kids * 10)
                        if (chance(test)) {
                            const kid = characterBuilder.build({ 
                                age: 0,
                                race: member.race,
                                job: ENUM_JOB_NAMES.noble,
                                mother: member.id,
                                father: member.marriedTo,
                                enforceMinimumSum: false,
                                date: currentDate,
                                religion: family.religion
                             })
                             output.print(`${member.name} of house ${family.name} gave birth to ${kid.name}.`)
                             family.members.push(kid)
                        }
                        
                }
            }
        }
    } catch(e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getKids'
        err.message = e.message
        logError(err)
    }
}

const moves = (dwellings, families, currentDate, output, options) => {
    const i = 10 - dwellings.length
    if (chance(i)) {
        const d = copyObject(objects.dwelling)
        d.id = generateID()
        d.name = getDwellingName()
        d.type = ENUM_DWELLINGS.TOWN
        d.inhabited = true
        dwellings.push(d)

        const f1 = familyBuilder.createFamily({
            race: ENUM_RACE_NAMES.human,
            dwellingId: d.id,
            date: currentDate
        })
        families.push(f1)
        const f2 = familyBuilder.createFamily({
            race: ENUM_RACE_NAMES.human,
            dwellingId: d.id,
            date: currentDate
        })
        families.push(f2)
        const f3 = familyBuilder.createFamily({
            race: ENUM_RACE_NAMES.human,
            dwellingId: d.id,
            date: currentDate
        })
        families.push(f3)
        output.print(text.get('familyTree-moves-1', [ f1.name, d.name ]))
    }
}

/**
 * 
 * @param {Array} dwellings 
 * @param {Array} families 
 * @param {object} currentDate 
 * @param {object} output 
 * @param {object} options 
 */
const newFamily = (dwellings, families, currentDate, output, options) => {    
    try {
        const dwellingNo = getRandomNumberInRange(0, dwellings.length - 1)
        let test = 100
        test -= (noOfFamiliesInDwelling(families, dwellings[dwellingNo].id) * 10)
        if(dwellings[dwellingNo].type == ENUM_DWELLINGS.TOWN) {
            test -= 30
        }
        if (chance(test)) {
            const f = familyBuilder.createFamily({
                race: options.race || ENUM_RACE_NAMES.human,
                dwellingId: dwellings[dwellingNo].id,
                date: currentDate
            })
            families.push(f)
            output.print(text.get('familyTree-newFamily-1', [ f.name, dwellings[dwellingNo].name ]))
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'newFamily'
        err.message = e.message
        logError(err)
    }
}

/**
 * 
 * 
 * @param {Array} families 
 * @param {object} currentDate 
 * @param {object} output 
 * @param {Array} dead
 * @param {object} options 
 */
const peopleDie = (families, currentDate, output, dead, options) => {
    try {
        for (let family of families) {
            for (let member of family.members) {
                const age = getAgeSimple(currentDate, member.birthDate)
                if (age > 60) {
                    if (chance(10 + (age - 60))) { 
                        output.print(text.get('familyTree-peopleDie-1', [member.name, family.name]))
                        member.isAlive = false 
                    }
                }
            }
            let foundDeadPerson = true
            while (foundDeadPerson && family.members.length) {
                for (let i = 0; i < family.members.length; i++) {
                    if(family.members[i].isAlive === false) {
                        dead.push(family.members[i])
                        family.members.splice( i, 1 )
                        break;
                    }
                    if (i >= family.members.length - 1) { foundDeadPerson = false }
                }
            }   
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'peopleDie'
        err.message = e.message
        logError(err)
    }
}

const getUninhabitedPoint = (map, size, biome) => {
    const points = []
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if ( (biome == map[x][y].biome || (!biome && map[x][y].elevation < 5 && map[x][y].elevation >= 0) ) && !map[x][y].dwelling ) {
                const p = copyObject(objects.point)
                p.x = x
                p.y = y
                points.push(p)
            }
        }
    }
    if (points.length > 0) {
        return points[getRandomNumberInRange( 0, points.length - 1 )]
    }
    else {
        throw new NoPositionAvailableError('No point found')
    }
}
/**
 * 
 * @param {Array} map 
 * @param {int} size 
 * @param {ENUM_BIOMES} biome 
 * @param {object} dwelling 
 */
const drawDwelling = (map, size, biome, dwelling) => {
    try {
        const p = getUninhabitedPoint(map, size, biome)
        map[p.x][p.y].dwelling = dwelling
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'drawDwelling'
        err.message = e.message
        logError(err)
    }
}

/**
 * Place dwellings on map
 * 
 * @param {Array} map 
 * @param {Array} dwellings 
 */
const placeDwellings = (map, dwellings) => {
    try {
        for(let dwelling of dwellings) {
            drawDwelling(map, map.length, ENUM_BIOMES.plains, dwelling)
        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'placeDwellings'
        err.message = e.message
        logError(err)
    }
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
    const years = (options.years) ? options.years : 100
    const noOfStartFamilies = (options.noOfStartFamilies) ? options.noOfStartFamilies : 4
    const noOfStartDwellings = (options.noOfStartDwellings) ? options.noOfStartDwellings : 3
    const race = (options.race) ? options.race : ENUM_RACE_NAMES.human

    const dwellings = []
    let families = []

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
        output.print(text.get('familyTree-build-1', [ year ]))
        marriages(families, world.date, output)
        getKids(families, world.date, output)
        newFamily(dwellings, families, world.date, output, {
            race: options.race,

        })
        moves(dwellings, families, world.date, output, {
            race: options.race,

        })
        peopleDie(families, world.date, output, world.dead, {})
        families = removeDeadFamilies(families, output)
        addYear(world.date)
    }
    placeDwellings(world.map, dwellings)
    world.families = families
    

}