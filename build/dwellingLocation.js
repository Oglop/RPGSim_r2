// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_DWELLING_LOCATION_STATUS,
    ENUM_DWELLING_LOCATION_TYPE,
    ENUM_NPC_TYPE
} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray, 
    generateID} = require('../lib/utils')

// STANDARD IMPORTS

const bNPC = require('./npc')

const getLocationName = (name, location) => {

}

const setNPCsForLocation = (location) => {
    if (location.type == ENUM_DWELLING_LOCATION_TYPE.INN) {
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.INN_KEEPER) )
        if (chance(60)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.HALFLING) ) }
        if (chance(40)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.FIGHTER) ) }
        if (chance(40)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.TEEN) ) }
    }
    if (location.type == ENUM_DWELLING_LOCATION_TYPE.TAVERN) {
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.BAR_KEEPER) )
        if (chance(90)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.BOUNCER) ) }
        if (chance(70)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.HALFLING) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.FIGHTER) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.TEEN) ) }
        if (chance(40)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.ADVENTURER) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.DWARF) ) }
        if (chance(30)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.ELF) ) }
        if (chance(30)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.NOBLE) ) }
    }
    if (location.type == ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE) {
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.GUARD) )
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.GUARD) )
        if (chance(60)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.KNIGHT) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.ADMINISTRATOR) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.GUARD) ) }
    }
    if (location.type == ENUM_DWELLING_LOCATION_TYPE.SMITH) {
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.SMITH) )
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.DWARF) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.BOY) ) }
    }
    if (location.type == ENUM_DWELLING_LOCATION_TYPE.TRAINING_GROUNDS) {
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.MASTER) )
        if (chance(70)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.APRENTICE) ) }
        if (chance(30)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.ADVENTURER) ) }
    }
    if (location.type == ENUM_DWELLING_LOCATION_TYPE.TEMPLE) {
        location.npcs.push( bNPC.build(ENUM_NPC_TYPE.PRIEST) )
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.GIRL) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.BOY) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.KNIGHT) ) }
        if (chance(20)) { location.npcs.push( bNPC.build(ENUM_NPC_TYPE.GUARD) ) }
    }
}

module.exports.build = (dwelling, options = {}) => {
    try {
        const type = (options.type) ? options.type : ENUM_DWELLING_LOCATION_TYPE.TAVERN
        const status = (options.status) ? options.status : ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION
        const dl = copyObject(objects.dwellingLocation)
        dl.status = status
        dl.type = type
        dl.id = generateID()
        dl.dwellingId = dwelling.id
        setNPCsForLocation(dl)
        dl.name = getLocationName(dwelling.name, dl)
        return dl
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message                                                                                                                      
        logError(err)
    }
}