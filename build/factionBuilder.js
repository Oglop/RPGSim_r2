const objects = require('../generic/objects')
const { generateID, copyObject, getRandomNumberInRange, getRandomElementFromArray } = require('../lib/utils')
const { listGods } = require('../persistance').queries
const { 
    ENUM_RACE_NAMES,
    ENUM_FACTION_RELATION_STATUS,
    ENUM_COMMANDS
} = require('../generic/enums')
const objects = require('../generic/objects')
const { getHumanFactionName,
    getDwarfFactionName,
    getWoodElfFactionName,
    getHighElfFactionName,
    getDarkElfFactionName} = require('../generic/names')
const { executeCommands } = require('../persistance/commandQueue')

/**
 * builds factions for world
 * @param {{}} options 
 */
module.exports.build = async (options = {}) => {
    let numberOfFactions = 0;
    const factionRaces = [ ]
    const factions = []

    const gods = await listGods()

    // Human race
    numberOfFactions = getRandomNumberInRange(4, 8)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.human)
    }

    // Dwarf race
    numberOfFactions = getRandomNumberInRange(2, 5)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.dwarf)
    }

    // Darkelves race
    numberOfFactions = getRandomNumberInRange(1, 2)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.darkElf)
    }

    // Woodelves race
    numberOfFactions = getRandomNumberInRange(2, 4)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.woodElf)
    }

    // HighElf race
    numberOfFactions = getRandomNumberInRange(3, 5)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.highElf)
    }

    // Halfling race
    numberOfFactions = getRandomNumberInRange(1, 3)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.halfling)
    }

    // Vile race
    numberOfFactions = getRandomNumberInRange(2, 8)
    for (let i = 0; i < numberOfFactions; i++) {
        factionRaces.push(ENUM_RACE_NAMES.vile)
    }

    numberOfFactions.forEach(race => {
        factions.push(createFaction(race), gods )
    })


    const relations = createFactionRelations(factions)

    const commands = []
    factions.forEach(f => commands.push({ command: ENUM_COMMANDS.INSERT_FACTION, data: f }))
    relations.forEach(r => commands.push({ command: ENUM_COMMANDS.INSERT_FACTION_RELATION, data: r }))

    await executeCommands(commands)
    
}

/**
 * create faction of race
 * @param {ENUM_RACE_NAMES} race 
 * @param {[ { id:String } ]} gods
 * @returns { {id: String} } faction
 */
const createFaction = (race, gods) => {
    const faction = copyObject(objects.faction)
    const god = getRandomElementFromArray(gods)
    faction.id = generateID()
    faction.race = race
    faction.godId = god.id
    faction.name = createFactionName(race)
    return faction
}

/**
 * 
 * @param {*} factions 
 * @returns {[]} relations
 */
const createFactionRelations = (factions) => {
    const relations = []
    for (let i = 0; i < factions.length; i++) {
        for (let j = i + 1; j < factions.length; j++) {
            const factionRelation = copyObject(objects.factionRelations)
            factionRelation.id = generateID()
            factionRelation.factionId = factions[i].id
            factionRelation.relationFactionId = factions[j].id
            factionRelation.status = (
                (factions[i].race == ENUM_RACE_NAMES.vile && factions[j].race != ENUM_RACE_NAMES.vile) ||
                (factions[i].race != ENUM_RACE_NAMES.vile && factions[j].race == ENUM_RACE_NAMES.vile)
            ) ? ENUM_FACTION_RELATION_STATUS.WAR : ENUM_FACTION_RELATION_STATUS.UNKNOWN
            relations.push(factionRelation)
        }
    }
    return relations
}

/**
 * get name faction for given race
 * @param {ENUM_RACE_NAMES} race 
 * @returns string faction name
 */
const createFactionName = (race) => {
    switch (race) {
        case ENUM_RACE_NAMES.human: return getHumanFactionName()
        case ENUM_RACE_NAMES.dwarf: return getDwarfFactionName()
        case ENUM_RACE_NAMES.darkElf: return getDarkElfFactionName()
        case ENUM_RACE_NAMES.highElf: return getHighElfFactionName()
        case ENUM_RACE_NAMES.woodElf: return getWoodElfFactionName()
        case ENUM_RACE_NAMES.halfling: return getHumanFactionName()
        case ENUM_RACE_NAMES.vile: return getVileFactionName()
    }
    return ''
}

