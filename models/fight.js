const { ENUM_ENCOUNTER_QUEUE_ITEM_TYPE } = require('../generic/enums')
const { getRandomNumberInRange } = require('../lib/utils')
const { getCharacterStatValue } = require('./character')
const { getStatBaseBySkillName } = require('./skill')
/**
 * 
 * @param {{id:string, stats:{}, name:string }} attacker 
 * @param {ENUM_ENCOUNTER_QUEUE_ITEM_TYPE} attackerType 
 * @param {{id:string, stats:{}, name:string }} defender 
 */
const attack = (attacker, attackerType, defender) => {
    let attackPower
    let defencePower
    let chanceToHit
    let chanceToDodge

    if (attackerType == ENUM_ENCOUNTER_QUEUE_ITEM_TYPE.HERO) {
        attackPower = getAttackFromHero(attacker, attackerType)
        defencePower = getDefenceFromMonster(defender, attackerType)
    } else {
        attackPower = getAttackFromMonster(attacker, attackerType)
        defencePower = getDefenceFromHero(defender, attackerType)
    }
}

const getAttackFromHero = (character) => {
    const statBonus = getCharacterStatValue(character, getStatBaseBySkillName(character.weaponHand.skillRequired))

    return getRandomNumberInRange(character.weaponHand.min, character.weaponHand.max) + statBonus
}

const getAttackFromMonster = (attacker) => {
    return 0
}

const getDefenceFromHero = (defender) => {
    return 0
}

const getDefenceFromMonster = (defender) => {
    return 0
}

module.exports = {
    attack,
    getAttackFromHero,
    getAttackFromMonster,
    getDefenceFromHero,
    getDefenceFromMonster
}

