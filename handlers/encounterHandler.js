const {
    ENUM_ENEMY_TYPE,
    ENUM_GAME_MODE,
    ENUM_ENEMY_STRENGTH
} = require('../generic/enums')
const { 
    copyObject,
    getRandomNumberInRange
} = require('../lib/utils')
const objects = require('../generic/objects')
const { 
    insertInitativeSort,
    advanceRange, 
    escape, 
    retreatRange } = require('../models/encounter')

const bMonster = require('../build/monster')





/**
 * 
 * options: {
 *  enemyType: ENUM_ENEMY_TYPE,
 *  difficultyModifyer: int 0 | 10
 * }
 * @param {object} party 
 * @param {object} options 
 */
const randomEncounter = (party, options) => {
    // build encounter
    const encounter = copyObject(objects.encounter, true)
    encounter.party = party
    const enemyType = options.enemyType ? options.enemyType : ENUM_ENEMY_TYPE.WILD
    const difficultyModifyer = options.difficultyModifyer ? options.difficultyModifyer : getRandomNumberInRange(0, 4)


    // build enemies
    encounter.enemies.push(bMonster.build({
        mode: ENUM_GAME_MODE.ADVENTURE,
        type: enemyType,
        strength: ENUM_ENEMY_STRENGTH.WEAK
    }))

    // TURN LOOP STARTS
    let nextTurn = true
    
    while (nextTurn) {
        const actionQueue = setInitiativeOrder(encounter)
        // generate helper fields


        nextTurn = false
    }
    
    // TURN LOOP END

}


module.exports = {
    randomEncounter
}
