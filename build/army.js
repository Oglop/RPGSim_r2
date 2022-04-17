// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_TROOP_TYPE, ENUM_DWELLING_SIZE
} = require('../generic/enums')
const { 
    copyObject, 
    getRandomFloatInRange,
    generateID} = require('../lib/utils')
const {
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


const buildTroop = (armyId, type, number) => {
    const t = copyObject(troop)
    t.id = generateID();
    t.armyId = armyId
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

const buildArmy = (dwelling) => {
    const a = copyObject(objects.army)
    a.id = generateID()
    a.dwellingId = dwelling.id
    const disposable = Math.floor( dwelling.citizens * 0.05 )

    let noOfArchers = 0
    let noOfInfantry = 0
    let noOfMenAtArms = 0
    let noOfKnights = 0
    let noOfMercenaries = 0
    let noOfCatapults = 0

    if (dwelling.size == ENUM_DWELLING_SIZE.VILLAGE) {
        noOfArchers = Math.floor(disposable * 0.4)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.ARCHERS, noOfArchers))
        noOfInfantry = Math.floor(disposable * 0.3)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.INFANTRY, noOfInfantry))
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.TOWN) {
        noOfArchers = Math.floor(disposable * 0.3)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.ARCHERS, noOfArchers))
        noOfInfantry = Math.floor(disposable * 0.5)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.INFANTRY, noOfInfantry))
        noOfMenAtArms = Math.floor(disposable * 0.4)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.MEN_AT_ARMS, noOfMenAtArms))
        noOfKnights = Math.floor(disposable * 0.1)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.KNIGHTS, noOfKnights))
    }
    if (dwelling.size == ENUM_DWELLING_SIZE.CITY || dwelling.size == ENUM_DWELLING_SIZE.CAPITAL) {
        noOfArchers = Math.floor(disposable * 0.5) 
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.ARCHERS, noOfArchers))
        noOfInfantry = Math.floor(disposable * 0.7)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.INFANTRY, noOfInfantry))
        noOfMenAtArms = Math.floor(disposable * 0.6)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.MEN_AT_ARMS, noOfMenAtArms))
        noOfKnights = Math.floor(disposable * 0.4)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.KNIGHTS, noOfKnights))
        noOfMercenaries = Math.floor(disposable * 0.6)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.MERCENARIES, noOfMercenaries))
        noOfCatapults = Math.floor(disposable * 0.02)
        a.troops.push(buildTroop(a.id, ENUM_TROOP_TYPE.CATAPULTS, noOfCatapults))
    }
    return a
}

module.exports = {
    buildTroop,
    buildArmy
}