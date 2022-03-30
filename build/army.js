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
    getRandomElementFromArray, 
    generateID} = require('../lib/utils')
const {
    CONDITION_NONE_MULTIPLYER,
    CONDITION_RUINED_MULTIPLYER,
    CONDITION_POOR_MULTIPLYER,
    CONDITION_GOOD_MULTIPLYER,
    CONDITION_PERFECT_MULTIPLYER
} = require('../generic/statics')
const { troop } = require('../generic/objects')

// STANDARD IMPORTS


const buildTroop = (type, power) => {
    const t = copyObject(troop)
    t.id = generateID();
    t.type = type
    t.power
    switch (type) {
        case ENUM_TROOP_TYPE.ARCHERS: 
    }
} 

module.exports = () => {
    buildTroop
}