const { 
    ENUM_GAME_MODE, 
    ENUM_ENEMY_TYPE, 
    ENUM_ENEMY_STRENGTH,
    ENUM_ENEMY_ATTACK,
    ENUM_STAT_NAMES
} = require('../generic/enums')
const enemies = require('../generic/enemies')
const bAttack = require('../build/enemyAttack')
const { 
    copyObject,
    getRandomElementFromArray, 
    getRandomNumberInRange 
} = require('../lib/utils')
const {
    getRandomAliveCharacter
} = require('./party')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')


/**
 * 
 * @param {object} enemy 
 */
const setStats = (enemy) => {
    enemy.stats = copyObject(objects.enemyStats)
    if (enemy.name == 'goblin') {
        enemy.stats.str = getRandomNumberInRange(2, 4)
        enemy.stats.agi = getRandomNumberInRange(4, 5)
        enemy.stats.vit = getRandomNumberInRange(1, 2)
        enemy.stats.int = getRandomNumberInRange(2, 4)
        enemy.stats.luc = getRandomNumberInRange(2, 8)
        enemy.health = getRandomNumberInRange(4, 6)
    } else if (enemy.name == 'orc') {
        enemy.stats.str = getRandomNumberInRange(5, 7)
        enemy.stats.agi = getRandomNumberInRange(3, 4)
        enemy.stats.vit = getRandomNumberInRange(3, 4)
        enemy.stats.int = getRandomNumberInRange(2, 3)
        enemy.stats.luc = getRandomNumberInRange(1, 2)
        enemy.health = getRandomNumberInRange(7, 9)
    } else if (enemy.name == 'troll') {
        enemy.stats.str = getRandomNumberInRange(9, 13)
        enemy.stats.agi = getRandomNumberInRange(1, 3)
        enemy.stats.vit = getRandomNumberInRange(4, 6)
        enemy.stats.int = getRandomNumberInRange(1, 2)
        enemy.stats.luc = getRandomNumberInRange(1, 2)
        enemy.health = getRandomNumberInRange(16, 21)
    }
}

/**
 * 
 * @param {{id: string, stats: { str: Number, agi: Number, vit: Number, int: Number, luc: Number }}} enemy 
 */
const modifyStats = enemy => {
    enemy.stats.str += getRandomNumberInRange(1,5) - 3
    enemy.stats.agi += getRandomNumberInRange(1,5) - 3
    enemy.stats.vit += getRandomNumberInRange(1,5) - 3
    enemy.stats.int += getRandomNumberInRange(1,5) - 3
    enemy.stats.luc += getRandomNumberInRange(1,5) - 3
}


/**
 * push attack objects to enemy object
 * @param {object} enemy 

 const setAttacks = (enemy) => {
    if (enemy.name == 'goblin') {
        enemy.actions.push(bAttack.build(ENUM_ENCOUNTER_ACTION.ATTACK))
    } else if (enemy.name == 'orc') {
        enemy.actions.push(bAttack.build(ENUM_ENCOUNTER_ACTION.ATTACK))
    } else if (enemy.name == 'troll') {
        enemy.actions.push(bAttack.build(ENUM_ENCOUNTER_ACTION.ATTACK))
    }
} */

const getEffectScaling = (enemy, action) => {
    let stat = 1
    switch (action.statBase) {
        case ENUM_STAT_NAMES.str: stat = enemy.str; break;
        case ENUM_STAT_NAMES.agi: stat = enemy.agi; break;
        case ENUM_STAT_NAMES.vit: stat = enemy.vit; break;
        case ENUM_STAT_NAMES.int: stat = enemy.int; break;
    }
    if (stat < 8) { return 1.0 }
    if (stat >= 8 && stat < 12) { return 1.1 }
    if (stat >= 12 && stat < 16) { return 1.2 }
    if (stat >= 16 && stat < 20) { return 1.3 }
    else { return 1.4 }
}

const attackEffect = (enemy, action) => {
    const effect = getRandomNumberInRange(action.min, action.max)
    const scaledEffect = parseInt(effect * getEffectScaling(enemy, action))
    return scaledEffect
}

const attack = (enemy, party) => {
    const commands = []
    try {
        
        const action = getRandomElementFromArray(enemy.attacks) 
        const target = getRandomAliveCharacter(party.members)
        const effect = attackEffect(enemy, action)  

        //const 

    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'attack'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    setStats,
    setAttacks,
    attack,
    getEffectScaling,
    attackEffect,
    modifyStats
}