const {
    ENUM_ENCOUNTER_RANGE,
    ENUM_ENCOUNTER_QUEUE_ITEM_TYPE
} = require('../generic/enums')
const { getRandomNumber } = require('../lib/utils')
const { INITIATIVE_TEST_INCREASE } = require('../generic/statics')

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
        insertInitativeSort(queue, {
            id: member.id,
            initiative: member.stats.agi + getRandomNumber(INITIATIVE_TEST_INCREASE),
            type: ENUM_ENCOUNTER_QUEUE_ITEM_TYPE.HERO
        })
    }
    for (let enemy of encounter.enemies) {
        insertInitativeSort(queue, {
            id: enemy.id,
            initiative: enemy.stats.agi + getRandomNumber(INITIATIVE_TEST_INCREASE),
            type: ENUM_ENCOUNTER_QUEUE_ITEM_TYPE.MONSTER
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
    const n = queue.length
    for (let i = 0; i < n; i++) {
        if (item.initiative >= queue[i].initiative) {
            queue.splice(i, 0, item)
            inserted = true
            break
        }
    }
    if (!inserted) { queue.push(item) }
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

