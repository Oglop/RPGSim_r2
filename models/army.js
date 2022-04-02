const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { restThreshold, restThresholdMultiplyer } = require('../config')
const { getPercetage, getRandomNumberInRange, copyObject, getRandomElementFromArray, point2d } = require('../lib/utils')
const { 
    ENUM_TROOP_TYPE
} = require('../generic/enums')
const {
    TROOP_ARCHERS_COST,
    TROOP_CATAPULTS_COST,
    TROOP_INFANTRY_COST,
    TROOP_MEN_AT_ARMS_COST,
    TROOP_MERCENARY_COST,
    TROOP_KIGHTS_COST
} = require('../generic/statics')
const { get } = require('../localization')

const getArmyCost = (army) => {
    let cost = 0
    for (let troop of army.troops) {
        switch (troop.type) {
            case ENUM_TROOP_TYPE.ARCHERS: cost += troop.number * TROOP_ARCHERS_COST; break;
            case ENUM_TROOP_TYPE.CATAPULTS: cost += troop.number * TROOP_CATAPULTS_COST; break;
            case ENUM_TROOP_TYPE.INFANTRY: cost += troop.number * TROOP_INFANTRY_COST; break;
            case ENUM_TROOP_TYPE.KNIGHTS: cost += troop.number * TROOP_KIGHTS_COST; break;
            case ENUM_TROOP_TYPE.MEN_AT_ARMS: cost += troop.number * TROOP_MEN_AT_ARMS_COST; break;
            case ENUM_TROOP_TYPE.MERCENARIES: cost += troop.number * TROOP_MERCENARY_COST; break;
        }
    }
    return cost
}

const dwonSizeArmy = (army) => {

}

module.exports = {
    getArmyCost,
    dwonSizeArmy
}