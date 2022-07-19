const { ENUM_SPELLS } = require('../generic/enums')
const objects = require('../generic/objects')
const { copyObject } = require('../lib/utils')
const { get } = require('../localization')


const getName = (type) => {
    switch (type) {
        case ENUM_SPELLS.THIRD_EYE: return get('spell-third-eye-name')
    }
}

const getSpellCost = (type) => {
    switch (type) {
        case ENUM_SPELLS.THIRD_EYE: return 2;
    }
}

/**
 * build a spell object
 * 
 * @param {ENUM_SPELLS} type 
 * @returns {object: spell}
 */
module.exports.build = (type) => {
    const s = copyObject(objects.spell)
    s.type = type
    s.name = getName(type)
    s.cost = getSpellCost(type)
    return s
}