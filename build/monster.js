const { ENUM_GAME_MODE, ENUM_ENEMY_TYPE, ENUM_ENEMY_STRENGTH } = require('../generic/enums')
const { getRandomElementFromArray, copyObject, generateID } = require('../lib/utils')
const enemies = require('../generic/enemies')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')

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
        let template = {}
        if (type === ENUM_ENEMY_TYPE.VILE) {
            template = (strength == ENUM_ENEMY_STRENGTH.WEAK) ? getRandomElementFromArray(enemies.VILE.WEAK) : 
            (strength == ENUM_ENEMY_STRENGTH.MEDIUM) ? getRandomElementFromArray(enemies.VILE.MEDIUM) :
            (strength == ENUM_ENEMY_STRENGTH.STRONG) ? getRandomElementFromArray(enemies.VILE.STRONG) : getRandomElementFromArray(enemies.VILE.EPIC)
        } else if (type === ENUM_ENEMY_TYPE.WILD) {
            template = (strength == ENUM_ENEMY_STRENGTH.WEAK) ? getRandomElementFromArray(enemies.WILD.WEAK) : 
            (strength == ENUM_ENEMY_STRENGTH.MEDIUM) ? getRandomElementFromArray(enemies.WILD.MEDIUM) :
            (strength == ENUM_ENEMY_STRENGTH.STRONG) ? getRandomElementFromArray(enemies.WILD.STRONG) : getRandomElementFromArray(enemies.WILD.EPIC)
        } else {
            template = (strength == ENUM_ENEMY_STRENGTH.WEAK) ? getRandomElementFromArray(enemies.ANCIENT.WEAK) : 
            (strength == ENUM_ENEMY_STRENGTH.MEDIUM) ? getRandomElementFromArray(enemies.ANCIENT.MEDIUM) :
            (strength == ENUM_ENEMY_STRENGTH.STRONG) ? getRandomElementFromArray(enemies.ANCIENT.STRONG) : getRandomElementFromArray(enemies.ANCIENT.EPIC)
        }

        enemy = { ...enemy, ...template }
        // if in history mode we only need to know the name of the enemy
        if (mode ==  ENUM_GAME_MODE.HISTORY) {
            return enemy
        }
        // TODO adventure mode enemy

        return enemy

    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    


}