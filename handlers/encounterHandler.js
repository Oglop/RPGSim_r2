const {
    ENUM_ENEMY_TYPE,
    ENUM_GAME_MODE,
    ENUM_ENEMY_STRENGTH,
    ENUM_ENCOUNTER_ACTION_TYPE
} = require('../generic/enums')
const { EncounterEndedError } = require('../exceptions')
const { 
    copyObject,
    getRandomNumberInRange
} = require('../lib/utils')
const objects = require('../generic/objects')
const { 
    executeEncounterActions } = require('../models/encounter')

const bMonster = require('../build/monster')

/**
 * 
 * options: {
 *  enemyType: ENUM_ENEMY_TYPE,
 *  difficultyModifyer: int 0 | 10
 * }
 * @param {{id: string, members:[{id: string, stats: {}}]}} party 
 * @param {{ enemyType: ENUM_ENEMY_TYPE, difficultyModifyer: Number, enemies: [] }} options 
 */
const randomEncounter = (party, options) => {
    let step = 'start'

    // build encounter
    const encounter = copyObject(objects.encounter, true)
    encounter.party = party
    const enemyType = options.enemyType ? options.enemyType : ENUM_ENEMY_TYPE.WILD
    const difficultyModifyer = options.difficultyModifyer ? options.difficultyModifyer : getRandomNumberInRange(0, 4)

    step = 'build enemies'
    // build enemies
    if (options.enemies) {
        encounter.enemies = options.enemies
    } else {
        encounter.enemies.push(bMonster.build({
            mode: ENUM_GAME_MODE.ADVENTURE,
            type: enemyType,
            strength: ENUM_ENEMY_STRENGTH.WEAK
        }))
    }
    
    step = 'before encounter loop'
    let nextTurn = true
    try {
        while (nextTurn) {
            const actionQueue = setInitiativeOrder(encounter)
            // generate helper fields
            step = 'executeEncounterActions(encounter, actionQueue, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)'
            executeEncounterActions(encounter, actionQueue, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
            step = 'executeEncounterActions(encounter, actionQueue, ENUM_ENCOUNTER_ACTION_TYPE.RANGED)'
            executeEncounterActions(encounter, actionQueue, ENUM_ENCOUNTER_ACTION_TYPE.RANGED)
            step = 'executeEncounterActions(encounter, actionQueue, ENUM_ENCOUNTER_ACTION_TYPE.MAGIC)'
            executeEncounterActions(encounter, actionQueue, ENUM_ENCOUNTER_ACTION_TYPE.MAGIC)
    
            nextTurn = false
        }

    } catch (e) {
        if (!e instanceof(EncounterEndedError)){
            const err = objects.error
            err.file = __filename
            err.function = 'randomEncounter'
            err.step = step
            err.message = e.message
            logError(err)
        }
    }

    

}


module.exports = {
    randomEncounter
}
