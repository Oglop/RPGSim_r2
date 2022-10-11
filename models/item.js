const {
    ENUM_ITEM_TYPE,
    ENUM_STAT_NAMES
} = require('../generic/enums')

/**
 * returns stat that is the base for the weapon or item
 * @param {ENUM_ITEM_TYPE} itemType 
 * @returns {ENUM_STAT_NAMES} stat
 */
const weaponStatBase = itemType => {
    switch (itemType) {
        case ONE_HAND_SWORD: return ENUM_STAT_NAMES.str
        case TWO_HAND_SWORD: return ENUM_STAT_NAMES.str
        case DAGGER: return ENUM_STAT_NAMES.agi
        case BOW: return ENUM_STAT_NAMES.agi
        case SPEAR: return ENUM_STAT_NAMES.str
        case STAFF: return ENUM_STAT_NAMES.int
        case MACE: return ENUM_STAT_NAMES.str
        case AXE: return ENUM_STAT_NAMES.str
    }
}

module.exports = { weaponStatBase }