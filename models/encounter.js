const {
    ENUM_ENCOUNTER_RANGE,
    ENUM_ENCOUNTER_QUEUE_ITEM_TYPE,
    ENUM_ENCOUNTER_ACTION_TYPE,
    ENUM_ENCOUNTER_ACTION
} = require('../generic/enums')
const { 
    getRandomNumber, 
    getObjectByidInArray,
    getRandomElementFromArray
} = require('../lib/utils')
const {
    validate
} = require('./encounterRulesEngine/encounterEngine')
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

const route = encounter => {}

const atemptRunAway = encounter => {}

const setInitiativeOrder = encounter => {
    const queue = []
    for (let member of encounter.party) {
        insertInitativeSort(queue, {
            id: member.id,
            initiative: member.stats.agi + getRandomNumber(INITIATIVE_TEST_INCREASE),
            type: ENUM_ENCOUNTER_QUEUE_ITEM_TYPE.HERO,
            acted: 0
        })
    }
    for (let enemy of encounter.enemies) {
        insertInitativeSort(queue, {
            id: enemy.id,
            initiative: enemy.stats.agi + getRandomNumber(INITIATIVE_TEST_INCREASE),
            type: ENUM_ENCOUNTER_QUEUE_ITEM_TYPE.MONSTER,
            acted: 0
        })
    }
}

/**
 * 
 * @param {{ id:string, range:number, party: Array, enemies: Array }} encounter 
 * @param {array} actionQueue 
 * @param {ENUM_ENCOUNTER_ACTION_TYPE} encounterActionType 
 */
const executeEncounterActions = (encounter, actionQueue, encounterActionType) => {
    for (encounterItem of actionQueue) {
        const source = getObjectByidInArray(actionQueue, encounterItem.id)
        const action = validate(source, encounterActionType)
        if (action.type != ENUM_ENCOUNTER_ACTION.PASS) {
            encounterItem.hasActed++
            action.execute(source, encounter)
        }

    }
}

/**
 * 
 * @param {{ id:string, range:number, party: Array, enemies: Array }} encounter 
 * @param {{ id:string, initiative: number, type: ENUM_ENCOUNTER_QUEUE_ITEM_TYPE, acted: number }} encounterItem 
 */
const getAliveEncounterItem = (encounter, encounterItem) => {
    if (encounterItem.type == ENUM_ENCOUNTER_QUEUE_ITEM_TYPE.HERO) {
        const enemies = encounter.enemies.filter(e => e.health > 0)
        if (enemies.length > 0) {  
            return getRandomElementFromArray(enemies)
        }
        return undefined
    } else {
        const members = encounter.party.filter(e => e.health > 0)
        if (members.length > 0) {  
            return getRandomElementFromArray(members)
        }
        return undefined
    }
}

/**
 * 
 * @param {array} queue 
 * @param {{id:string, initiative:number, type: ENUM_ENCOUNTER_QUEUE_ITEM_TYPE, acted: number}} item 
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
    insertInitativeSort,
    executeEncounterActions
}

