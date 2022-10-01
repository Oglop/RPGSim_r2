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
    const queue = []
    for (let member of encounter.party) {
        // TODO insert sort
        queue.push({
            id: member.id,
            initiative: member.stats.agi + getRandomNumber(10)
        })
    }
}

/**
 * 
 * @param {array} queue 
 * @param {object} item 
 */
const insertInitativeSort = (queue, item) => {
    let inserted = false
    for (let i = 0; i < queue.length; i++) {
        if (item.initiative < queue[i].initiative) {
            queue.splice(i, 0, item)
        }
    }
    if (!inserted) {
        queue.push(item)
    }
}

const updateEncounterValues = encounter => {}



module.exports = {
    advanceRange, 
    retreatRange,
    setInitiativeOrder,
    atemptRunAway,
    updateEncounterValues,
    route,
    insertInitativeSort
}

