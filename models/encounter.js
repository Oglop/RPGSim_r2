const {
    ENUM_ENCOUNTER_RANGE
} = require('../generic/enums')
const { getRandomNumber } = require('../lib/utils')

const advanceRange = encounter => {
    switch (encounter.range) {
        case ENUM_ENCOUNTER_RANGE.FAR: encounter.range = ENUM_ENCOUNTER_RANGE.LONG; break;
        case ENUM_ENCOUNTER_RANGE.LONG: encounter.range = ENUM_ENCOUNTER_RANGE.SHORT; break;
        case ENUM_ENCOUNTER_RANGE.SHORT: encounter.range = ENUM_ENCOUNTER_RANGE.SHORT; break;
    }
}

const retreatRange = encounter => {
    switch (encounter.range) {
        case ENUM_ENCOUNTER_RANGE.FAR: encounter.range = ENUM_ENCOUNTER_RANGE.FAR; break;
        case ENUM_ENCOUNTER_RANGE.LONG: encounter.range = ENUM_ENCOUNTER_RANGE.FAR; break;
        case ENUM_ENCOUNTER_RANGE.SHORT: encounter.range = ENUM_ENCOUNTER_RANGE.LONG; break;
    }
}

const route = encounter => {

}

const atemptRunAway = encounter => {}

const setInitiativeOrder = encounter => {
    const order = []
    for (let member of encounter.party) {
        // TODO insert sort
        order.push({
            id: member.id,
            initiative: member.stats.agi + getRandomNumber(10)
        })
    }
}

const updateEncounterValues = encounter => {}



module.exports = {
    advanceRange, 
    retreatRange,
    setInitiativeOrder,
    atemptRunAway,
    updateEncounterValues,
    route
}

