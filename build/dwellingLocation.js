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
const { getRandomReligion } = require('../generic/religions')


const locationFirstName = () => {
    const i = getRandomNumberInRange(3, 21)
    switch(i) {
        case 3: return get('dwelling-location-name-first-running')
        case 4: return get('dwelling-location-name-first-green')
        case 5: return get('dwelling-location-name-first-iron')
        case 6: return get('dwelling-location-name-first-standing')
        case 7: return get('dwelling-location-name-first-crimson')
        case 8: return get('dwelling-location-name-first-polite')
        case 9: return get('dwelling-location-name-first-lucky')
        case 10: return get('dwelling-location-name-first-secret')
        case 11: return get('dwelling-location-name-first-olde')
        case 12: return get('dwelling-location-name-first-poor')
        case 13: return get('dwelling-location-name-first-queens')
        case 14: return get('dwelling-location-name-first-shattered')
        case 15: return get('dwelling-location-name-first-wandering')
        case 16: return get('dwelling-location-name-first-red')
        case 17: return get('dwelling-location-name-first-bards')
        case 18: return get('dwelling-location-name-first-dancing')
        case 19: return get('dwelling-location-name-first-drunken')
        case 20: return get('dwelling-location-name-first-barking')
        case 21: return get('dwelling-location-name-first-golden')
    }

}

const locationSecondName = () => {
    const i = getRandomNumberInRange(0, 24)
    switch(i) {
        case 0: return get('dwelling-location-name-second-hamster')
        case 1: return get('dwelling-location-name-second-hound')
        case 2: return get('dwelling-location-name-second-arms')
        case 3: return get('dwelling-location-name-second-axe')
        case 4: return get('dwelling-location-name-second-fox')
        case 5: return get('dwelling-location-name-second-pony')
        case 6: return get('dwelling-location-name-second-hen')
        case 7: return get('dwelling-location-name-second-dragon')
        case 8: return get('dwelling-location-name-second-goblin')
        case 9: return get('dwelling-location-name-second-miner')
        case 10: return get('dwelling-location-name-second-grotto')
        case 11: return get('dwelling-location-name-second-glory')
        case 12: return get('dwelling-location-name-second-anvil')
        case 13: return get('dwelling-location-name-second-barrel')
        case 14: return get('dwelling-location-name-second-flagon')
        case 15: return get('dwelling-location-name-second-ogre')
        case 16: return get('dwelling-location-name-second-haven')
        case 17: return get('dwelling-location-name-second-house')
        case 18: return get('dwelling-location-name-second-gate')
        case 19: return get('dwelling-location-name-second-rest')
        case 20: return get('dwelling-location-name-second-lantern')
        case 21: return get('dwelling-location-name-second-cup')
        case 22: return get('dwelling-location-name-second-horn')
        case 23: return get('dwelling-location-name-second-crow')
        case 24: return get('dwelling-location-name-second-sleep')
    }
}

const getTempleName = () => {
    let desc = ''
    let temple = ''
    let religion = getRandomReligion()
    const i = getRandomNumberInRange(0, 3)
    const j = getRandomNumberInRange(0, 6)

    switch (i) {
        case 0: temple = get( 'dwelling-location-temple' ); break;
        case 1: temple = get( 'dwelling-location-church' ); break;
        case 2: temple = get( 'dwelling-location-cathedral' ); break;
        case 3: temple = get( 'dwelling-location-chapel'); break;
    }
    
    switch (j) {
        case 0: desc = get( 'dwelling-location-temple-description-high' ); break;
        case 1: desc = get( 'dwelling-location-temple-description-grand' ); break;
        case 2: desc = get( 'dwelling-location-temple-description-secret' ); break;
        case 3: desc = get( 'dwelling-location-temple-description-first' ); break;
        case 4: desc = get( 'dwelling-location-temple-description-great' ); break;
        case 5: desc = get( 'dwelling-location-temple-description-elated' ); break;
        case 6: desc = get( 'dwelling-location-temple-description-exalted' ); break;
    }
    return get('dwelling-location-temple-name', [ desc, temple, religion.name ])
}


const getLocationName = (dwellingName, location) => {
    if (location.type === ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE) {
        return get('dwelling-location-name-guardhouse', [ dwellingName ])
    }
    if (location.type === ENUM_DWELLING_LOCATION_TYPE.TRAINING_GROUNDS) {
        let name = dwellingName
        if (chance(40)) {
            name = `${location.npcs[0].name}´s`
        }
        return get('dwelling-location-name-traininggrounds', [ name ])
    }
    if (location.type === ENUM_DWELLING_LOCATION_TYPE.INN || location.type === ENUM_DWELLING_LOCATION_TYPE.TAVERN) {
        return get('dwelling-location-name', [ locationFirstName(), locationSecondName() ])
    }
    if (location.type === ENUM_DWELLING_LOCATION_TYPE.TEMPLE) {
        return getTempleName()
    }
    if (location.type === ENUM_DWELLING_LOCATION_TYPE.SMITH) {
        const name = location.npcs[0].name
        return get('dwelling-location-name-smith', [ name ])
    }
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