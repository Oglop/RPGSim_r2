const { ENUM_NPC_TYPE, ENUM_GENDER } = require('../generic/enums')
const { getPersonName } = require('../generic/names')
const objects = require('../generic/objects')
const { copyObject, generateID, chance, capitalizeFirstLetter } = require('../lib/utils')
const { get } = require('../localization/en')

const getNpcDescription = (npc) => {
    switch (npc.type) {
        case ENUM_NPC_TYPE.INN_KEEPER:  return get('npc-description-inn-keeper',  [ npc.name ] )
        case ENUM_NPC_TYPE.ADMINISTRATOR: return get('npc-description-administrator',  [ npc.name ] )
        case ENUM_NPC_TYPE.ADVENTURER: return get('npc-description-adventurer',  [ npc.name ] )
        case ENUM_NPC_TYPE.BAR_KEEPER: return get('npc-description-bar-keeper',  [ npc.name ] )
        case ENUM_NPC_TYPE.BOUNCER: return get('npc-description-bouncer',  [ npc.name ] )
        case ENUM_NPC_TYPE.BOY: return get('npc-description-boy',  [ npc.name ] )
        case ENUM_NPC_TYPE.DWARF: return get('npc-description-dwarf',  [ npc.name ] )
        case ENUM_NPC_TYPE.ELF: return get('npc-description-elf',  [ npc.name ] )
        case ENUM_NPC_TYPE.FIGHTER: return get('npc-description-fighter',  [ npc.name ] )
        case ENUM_NPC_TYPE.GIRL: return get('npc-description-girl',  [ npc.name ] )
        case ENUM_NPC_TYPE.GUARD: return get('npc-description-guard',  [ npc.name ] )
        case ENUM_NPC_TYPE.HALFLING: return get('npc-description-halfling',  [ npc.name ] )
        case ENUM_NPC_TYPE.KNIGHT: return get('npc-description-knight',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.MASTER: return get('npc-description-master',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.NOBLE: return get('npc-description-noble',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.SMITH: return get('npc-description-smith',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.TEEN: return get('npc-description-teen',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.WIZARD: return get('npc-description-wizard',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.APRENTICE: return get('npc-description-aprentice',  [ npc.name ] ) 
        case ENUM_NPC_TYPE.PRIEST: return get('npc-description-priest',  [ npc.name ] ) 
    }
    return npc.name
}

module.exports.build = (type) => {
    const npc = copyObject(objects.npc)
    npc.id = generateID()
    npc.type = type
    npc.name = getPersonName( (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE )
    npc.description = getNpcDescription(npc)
    capitalizeFirstLetter( npc.description )
    return npc
}