// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_TROOP_TYPE
} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomFloatInRange,
    getRandomElementFromArray, 
    generateID} = require('../lib/utils')
const {
    TROOP_KIGHTS_COST,
    TROOP_MEN_AT_ARMS_COST,
    TROOP_ARCHERS_COST,
    TROOP_MERCENARY_COST,
    TROOP_INFANTRY_COST,
    TROOP_CATAPULTS_COST,
    TROOP_KIGHTS_POWER_MIN,
    TROOP_MEN_AT_ARMS_POWER_MIN,
    TROOP_ARCHERS_POWER_MIN,
    TROOP_MERCENARY_POWER_MIN,
    TROOP_INFANTRY_POWER_MIN,
    TROOP_CATAPULTS_POWER_MIN,
    TROOP_KIGHTS_POWER_MAX,
    TROOP_MEN_AT_ARMS_POWER_MAX,
    TROOP_ARCHERS_POWER_MAX,
    TROOP_MERCENARY_POWER_MAX,
    TROOP_INFANTRY_POWER_MAX,
    TROOP_CATAPULTS_POWER_MAX
} = require('../generic/statics')
const { troop } = require('../generic/objects')

// STANDARD IMPORTS


const buildTroop = (type, number) => {
    const t = copyObject(troop)
    t.id = generateID();
    t.type = type
    t.number = number
    switch (type) {
        case ENUM_TROOP_TYPE.ARCHERS: t.power = getRandomFloatInRange(TROOP_ARCHERS_POWER_MIN, TROOP_ARCHERS_POWER_MAX); break;
        case ENUM_TROOP_TYPE.INFANTRY: t.power = getRandomFloatInRange(TROOP_INFANTRY_POWER_MIN,TROOP_INFANTRY_POWER_MAX); break;
        case ENUM_TROOP_TYPE.KNIGHTS: t.power = getRandomFloatInRange(TROOP_KIGHTS_POWER_MIN, TROOP_KIGHTS_POWER_MAX); break;
        case ENUM_TROOP_TYPE.MEN_AT_ARMS: t.power = getRandomFloatInRange(TROOP_MEN_AT_ARMS_POWER_MIN, TROOP_MEN_AT_ARMS_POWER_MAX); break;
        case ENUM_TROOP_TYPE.MERCENARIES: t.power = getRandomFloatInRange(TROOP_MERCENARY_POWER_MIN, TROOP_MERCENARY_POWER_MAX); break;
        case ENUM_TROOP_TYPE.CATAPULTS: t.power = getRandomFloatInRange(TROOP_CATAPULTS_POWER_MIN, TROOP_CATAPULTS_POWER_MAX); break;
    }
    switch (type) {
        case ENUM_TROOP_TYPE.ARCHERS: t.name = get('troop-archers'); break;
        case ENUM_TROOP_TYPE.INFANTRY: t.name = get('troop-infantry'); break;
        case ENUM_TROOP_TYPE.KNIGHTS: t.name = get('troop-knights'); break;
        case ENUM_TROOP_TYPE.MEN_AT_ARMS: t.name = get('troop-men-at-arms'); break;
        case ENUM_TROOP_TYPE.MERCENARIES: t.name = get('troop-mercenaries'); break;
        case ENUM_TROOP_TYPE.CATAPULTS: t.name = get('troop-catapults'); break;
    }
    return t
} 

const buildArmy = (dwellingId, cost) => {
    const a = copyObject(objects.army)
    a.dwellingId = dwellingId
    
}

module.exports = () => {
    buildTroop,
    buildArmy
}