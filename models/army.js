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

const getTroopCost = (troop) => {
    switch (troop.type) {
        case ENUM_TROOP_TYPE.ARCHERS: return troop.number * TROOP_ARCHERS_COST;
        case ENUM_TROOP_TYPE.CATAPULTS: return troop.number * TROOP_CATAPULTS_COST;
        case ENUM_TROOP_TYPE.INFANTRY: return troop.number * TROOP_INFANTRY_COST;
        case ENUM_TROOP_TYPE.KNIGHTS: return troop.number * TROOP_KIGHTS_COST;
        case ENUM_TROOP_TYPE.MEN_AT_ARMS: return troop.number * TROOP_MEN_AT_ARMS_COST;
        case ENUM_TROOP_TYPE.MERCENARIES: return troop.number * TROOP_MERCENARY_COST;
    }
}


module.exports = {
    getArmyCost,
    getTroopCost
}