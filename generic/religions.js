const { ENUM_GODS } = require('../generic/enums')
const { copyObject, getRandomNumberInRange } = require('../lib/utils')
const objects = require('../generic/objects')

const getRandomReligion = () => {
    const i = getRandomNumberInRange(0,7)
    const r = copyObject(objects.god)
    if (i === 0) {
        r.name = 'Gaeleath'
        r.description = 'Blood and Murder'
        r.type = ENUM_GODS.Gaeleath
    } else if (i === 1) {
        r.name = 'Eyrnid'
        r.description = 'Wealth and War'
        r.type = ENUM_GODS.Eyrnid
    } else if (i === 2) {
        r.name = 'Zinzu'
        r.description = 'Trade and Deceit'
        r.type = ENUM_GODS.Zinzu
    } else if (i === 3) {
        r.name = 'Norneiros'
        r.description = 'Labor and Truth'
        r.type = ENUM_GODS.Norneiros
    } else if (i === 4) {
        r.name = 'Norfaes'
        r.description = 'Dusk and Death'
        r.type = ENUM_GODS.Norfaes
    } else if (i === 5) {
        r.name = 'Neybne'
        r.description = 'Dawn and Birth'
        r.type = ENUM_GODS.Neybne
    } else if (i === 6) {
        r.name = 'Nerimoira'
        r.description = 'Travel and Willpower'
        r.type = ENUM_GODS.Nerimoira
    } else if (i === 7) {
        r.name = 'Wrezar'
        r.description = 'Storms and Rivers'
        r.type = ENUM_GODS.Wrezar
    }
}

module.exports = {
    getRandomReligion
}