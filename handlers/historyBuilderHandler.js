const { getListOfPointsByBiome } = require('../models/map')
const { getRandomElementFromArray, chance, getRandomNumberInRange, generateID, copyObject } = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_RACE_NAMES, ENUM_BIOMES, ENUM_GENDER } = require('../generic/enums')
const { getPersonName, getFamilyName } = require('../generic/names')
const dwellingBuilder = require('../build/dwelling')

const coatOfArmsBuilder = require('../build/coatOfArms')


const createWorldHistory = (world) => {
    const history = initializeHistory(world)
    
        // för varje faction
        for (let faction of world.factions) {
            progressFaction(faction, world.map)
        }

        // tick doom

        // ticka time
    
}

const progressFaction = (faction, map) => {

    // faction event

    // ruler event

    // skapa hus

    //
}

/**
 * 
 * @param {*} world 
 * @returns Array of factionDwellings and families
 */
const initializeHistory = world => {
    const factionDwelling = {
        faction: undefined,
        dwelling: undefined 
    }

    const history = {
        factionDwellings: [],
        families: [],
        messages: []
    }
    let startingPosition = {}

    for (let faction of world.factions) {
        // find city location
        if (faction.race == ENUM_RACE_NAMES.human) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.plains, ENUM_BIOMES.hills ])
        } else if (faction.race == ENUM_RACE_NAMES.dwarf) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.mountains, ENUM_BIOMES.hills ])
        } else if (faction.race == ENUM_RACE_NAMES.halfling) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.forest ])
        } else if (faction.race == ENUM_RACE_NAMES.woodElf) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.forest ])
        } else if (faction.race == ENUM_RACE_NAMES.highElf) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.hills, ENUM_BIOMES.forest ])
        } else if (faction.race == ENUM_RACE_NAMES.darkElf) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.mountains, ENUM_BIOMES.swamp ])
        } else if (faction.race == ENUM_RACE_NAMES.vile) {
            startingPosition = findPositionFromTypes(world.map, [ ENUM_BIOMES.mountains, ENUM_BIOMES.badlands ])
        }
        try {
            const dwelling = dwellingBuilder.buildSimple(startingPosition, faction.race)
        }catch (e) {
            console.log(e.message)
        }
        

        const fd = copyObject(factionDwelling)
        fd.faction = faction
        fd.dwelling = dwelling
        history.factionDwellings.push(fd)

        // create family

        const family = {
            id: generateID(),
            coatOfArms: coatOfArmsBuilder.build(),
            name: getFamilyName(),
            dwellingId: dwelling.id,
            members: []
        }

        // create leader

        const rulerGender = (chance(50)) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE
        const spouseGender =  (ruler.gender == ENUM_GENDER.FEMALE) ? ENUM_GENDER.MALE : ENUM_GENDER.FEMALE

        const ruler = {
            id: generateID(),
            race: faction.race,
            gender: rulerGender,
            name: getPersonName(rulerGender)
        }
        
        const spouse = {
            id: generateID(),
            marriedTo: ruler.id,
            race: faction.race,
            gender: spouseGender,
            name: getPersonName(spouseGender)
        }
        ruler.marriedTo = spouse.id,

        family.members.push(spouse)
        family.members.push(ruler)

        history.families.push(family)
    }
    return history
}

const createNewSettlement = (faction, map) => {

}

const createNewNobleHouse = () => {

}

const checkDoom = () => {
    
}

const factionEvent = () => {

}

const rulerEvent = () => {

}

/**
 * @param {[]} map
 * @param {[ENUM_BIOMES}] biomes
 */
const findPositionFromTypes = (map, biomes) => {
    const possiblePoints = []
    for (let i = 0, j = biomes.length; i<j; i++) {
        const points = getListOfPointsByBiome(map, biomes[i])
        for (point of points) {
            possiblePoints.push(point)
        }
    }
    // for (let biome in biomes) {
    //     const points = getListOfPointsByBiome(map, biome)
    //     for (point of points) {
    //         possiblePoints.push(point)
    //     }
    // }
    return getRandomElementFromArray(possiblePoints)
}


module.exports = {
    createWorldHistory
}