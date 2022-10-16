const { 
    ENUM_GAME_MODE, 
    ENUM_ENEMY_TYPE, 
    ENUM_ENEMY_STRENGTH,
    ENUM_ENEMY_ATTACK
} = require('../generic/enums')
const { getRandomElementFromArray, copyObject, generateID, getRandomNumberInRange } = require('../lib/utils')
const enemies = require('../generic/enemies')
const bAttack = require('./enemyAttack')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { setAttacks, modifyStats } = require('../models/enemy')

/**
 * options {
 *  ?mode: ENUM_GAME_MODE = ENUM_GAME_MODE.ADVENTURE
 * ?type: ENUM_ENEMY_STRENGTH = ENUM_ENEMY_TYPE.WILD
 * ?strength: ENUM_ENEMY_STRENGTH = ENUM_ENEMY_STRENGTH.WEAK
 * }
 * 
 * @param {Object} options 
 * @returns {Object} enemy
 */
module.exports.build = (options) => {
    try {
        const mode = (options.mode || options.mode == 0) ? options.mode : ENUM_GAME_MODE.ADVENTURE
        const type = (options.type || options.type == 0) ? options.type : ENUM_ENEMY_TYPE.WILD
        const strength = (options.strength || options.strength == 0) ? options.strength : ENUM_ENEMY_STRENGTH.WEAK

        let enemy = copyObject(objects.enemy)
        enemy.id = generateID()
        
        const template = (strength == ENUM_ENEMY_STRENGTH.WEAK) ? getRandomElementFromArray(enemies.TYPES[type].WEAK) : 
        (strength == ENUM_ENEMY_STRENGTH.MEDIUM) ? getRandomElementFromArray(enemies.TYPES[type].MEDIUM) :
        (strength == ENUM_ENEMY_STRENGTH.STRONG) ? getRandomElementFromArray(enemies.TYPES[type].STRONG) : getRandomElementFromArray(enemies.TYPES[type].EPIC)

        enemy = { ...enemy, ...template }
        // if in history mode we only need to know the name of the enemy
        if (mode ==  ENUM_GAME_MODE.HISTORY) {
            return enemy
        }
        // TODO adventure mode enemy
        modifyStats(enemy)
        setAttacks(enemy)
        return enemy

    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    


}