const objects = require('../generic/objects')
const { generateID, copyObject, getRandomNumberInRange, chance } = require('../lib/utils')
const { 
    ENUM_DWELLING_SIZE,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_DWELLING_PRODUCTION_TYPE
} = require('../generic/enums')

module.exports.build = (type, dwellingId) => {
    const p = copyObject(objects.dwellingProduction)
    p.dwellingId = dwellingId
    p.id = generateID()
    p.type = type
    p.production = (chance(20)) ? 2 : 1
    return p
}