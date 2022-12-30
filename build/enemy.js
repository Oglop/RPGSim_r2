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
const { modifyStats } = require('../models/enemy')



/**
 * returns type of enemy 
 * @param {ENUM_ENEMY_TYPE} type 
 * @returns {string} type
 */
const getTypeName = type => {
    switch (type) {
        case ENUM_ENEMY_TYPE.VILE: return 'VILE';
        case ENUM_ENEMY_TYPE.ANCIENT: return 'ANCIENT';
        case ENUM_ENEMY_TYPE.WILD: return 'WILD';
        case ENUM_ENEMY_TYPE.ORDER: return 'HOSTILE';
    }
}

/**
 * options {
 *  ?mode: ENUM_GAME_MODE = ENUM_GAME_MODE.ADVENTURE
 * ?type: ENUM_ENEMY_STRENGTH = ENUM_ENEMY_TYPE.WILD
 * ?strength: ENUM_ENEMY_STRENGTH = ENUM_ENEMY_STRENGTH.WEAK
 * }
 * 
 * @param {{ mode: ENUM_GAME_MODE, type: ENUM_ENEMY_TYPE, strength: ENUM_ENEMY_STRENGTH }} options 
 * @returns {{id:string, name:string, stats: {}}} enemy
 */
module.exports.build = (options) => {
    try {
        const mode = (options.mode || options.mode == 0) ? options.mode : ENUM_GAME_MODE.ADVENTURE
        const type = (options.type || options.type == 0) ? options.type : ENUM_ENEMY_TYPE.WILD
        const strength = (options.strength || options.strength == 0) ? options.strength : ENUM_ENEMY_STRENGTH.WEAK
        
        let enemy = copyObject(objects.character)
        enemy.id = generateID()

        const template = (strength == ENUM_ENEMY_STRENGTH.WEAK) ? getRandomElementFromArray(enemies.TYPES[getTypeName(type)].WEAK) : 
        (strength == ENUM_ENEMY_STRENGTH.MEDIUM) ? getRandomElementFromArray(enemies.TYPES[getTypeName(type)].MEDIUM) :
        (strength == ENUM_ENEMY_STRENGTH.STRONG) ? getRandomElementFromArray(enemies.TYPES[getTypeName(type)].STRONG) : getRandomElementFromArray(enemies.TYPES[getTypeName(type)].EPIC)
        enemy = { ...enemy, ...template }
        // if in history mode we only need to know the name of the enemy
        if (mode ==  ENUM_GAME_MODE.HISTORY) {
            return enemy
        }
        // TODO adventure mode enemy
        modifyStats(enemy)
        //setAttacks(enemy)
        return enemy
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    


}