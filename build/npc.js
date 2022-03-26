const { ENUM_NPC_TYPE, ENUM_GENDER } = require('../generic/enums')
const { getPersonName } = require('../generic/names')
const objects = require('../generic/objects')
const { copyObject, getRandomNumberInRange, generateID, chance } = require('../lib/utils')

const getNpcDescription = (npc) => {

    return ''
}

module.exports.build = (type) => {
    const npc = copyObject(objects.npc)
    npc.id = generateID()
    npc.type = type
    npc.name = getPersonName( (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE )
    npc.description = getNpcDescription(npc)
    return npc

}