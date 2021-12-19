const { copyObject, getRandomNumberInRange } = require('../lib/utils')
const { ENUM_SKILL_NAMES, ENUM_STAT_NAMES, ENUM_JOB_NAMES, ENUM_RACE_NAMES } = require('../generic/enums')
const objects = require('../generic/objects')

/**
 * 
 * @param {Object} c 
 */
const setStartMasteryPoints = (c) => {
    for (let i  = 0; i < c.skills.length; i++) {
        switch (c.skills[i].statsBase) {
            case ENUM_STAT_NAMES.agi: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.agi) / 2, c.stats.agi); break;
            case ENUM_STAT_NAMES.cha: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.cha) / 2, c.stats.cha); break;
            case ENUM_STAT_NAMES.int: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.int) / 2, c.stats.int); break;
            case ENUM_STAT_NAMES.luc: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.luc) / 2, c.stats.luc); break;
            case ENUM_STAT_NAMES.str: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.str) / 2, c.stats.str); break;
            case ENUM_STAT_NAMES.vit: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.vit) / 2, c.stats.vit); break;
            case ENUM_STAT_NAMES.wis: c.skills[i].mastery = getRandomNumberInRange(Math.floor(c.stats.wis) / 2, c.stats.wis); break;
        }
    }


}

/**
 * return object of type skill
 * @param {Object} skill 
 */
const getSkill = skill => {
    const o = copyObject(objects.skill)
    switch (skill) {
        case ENUM_SKILL_NAMES.axe:
            o.name = ENUM_SKILL_NAMES.axe
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.bow:
            o.name = ENUM_SKILL_NAMES.bow
            o.statsBase = ENUM_STAT_NAMES.agi
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.cooking:
            o.name = ENUM_SKILL_NAMES.cooking
            o.statsBase = ENUM_STAT_NAMES.wis
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.dagger:
            o.name = ENUM_SKILL_NAMES.dagger
            o.statsBase = ENUM_STAT_NAMES.agi
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.lockPicking:
            o.name = ENUM_SKILL_NAMES.lockPicking
            o.statsBase = ENUM_STAT_NAMES.agi
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.steal:
            o.name = ENUM_SKILL_NAMES.steal
            o.statsBase = ENUM_STAT_NAMES.agi
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.oneHandSword:
            o.name = ENUM_SKILL_NAMES.oneHandSword
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.twoHandSword:
            o.name = ENUM_SKILL_NAMES.twoHandSword
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.staff:
            o.name = ENUM_SKILL_NAMES.staff
            o.statsBase = ENUM_STAT_NAMES.int
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.shield:
            o.name = ENUM_SKILL_NAMES.shield
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.mace:
            o.name = ENUM_SKILL_NAMES.mace
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.spear:
            o.name = ENUM_SKILL_NAMES.spear
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.fishing:
            o.name = ENUM_SKILL_NAMES.fishing
            o.statsBase = ENUM_STAT_NAMES.wis
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.tracking:
            o.name = ENUM_SKILL_NAMES.tracking
            o.statsBase = ENUM_STAT_NAMES.wis
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.persuade:
            o.name = ENUM_SKILL_NAMES.persuade
            o.statsBase = ENUM_STAT_NAMES.cha
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.swim:
            o.name = ENUM_SKILL_NAMES.swim
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.lightArmor:
            o.name = ENUM_SKILL_NAMES.lightArmor
            o.statsBase = ENUM_STAT_NAMES.agi
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.heavyArmor:
            o.name = ENUM_SKILL_NAMES.heavyArmor
            o.statsBase = ENUM_STAT_NAMES.str
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.robes:
            o.name = ENUM_SKILL_NAMES.robes
            o.statsBase = ENUM_STAT_NAMES.int
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.scout:
            o.name = ENUM_SKILL_NAMES.scout
            o.statsBase = ENUM_STAT_NAMES.wis
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.findTraps:
            o.name = ENUM_SKILL_NAMES.findTraps
            o.statsBase = ENUM_STAT_NAMES.int
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.healing:
            o.name = ENUM_SKILL_NAMES.healing
            o.statsBase = ENUM_STAT_NAMES.wis
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.hunting:
            o.name = ENUM_SKILL_NAMES.hunting
            o.statsBase = ENUM_STAT_NAMES.wis
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.woodWorking:
            o.name = ENUM_SKILL_NAMES.woodWorking
            o.statsBase = ENUM_STAT_NAMES.vit
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.scholar:
            o.name = ENUM_SKILL_NAMES.scholar
            o.statsBase = ENUM_STAT_NAMES.int
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.leadership:
            o.name = ENUM_SKILL_NAMES.leadership
            o.statsBase = ENUM_STAT_NAMES.cha
            o.luckTest = false
            break
    }
    return o
}

/**
 * Set skills to character
 * @param {Object} c 
 */
module.exports.build = (c) => {
    if (c.job === ENUM_JOB_NAMES.cleric) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.mace)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.shield)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scholar)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.healing)))
    }
    if (c.job === ENUM_JOB_NAMES.fighter) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.oneHandSword)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.twoHandSword)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.axe)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.heavyArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.shield)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scout)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.hunting)))
    }
    if (c.job === ENUM_JOB_NAMES.knight) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.spear)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.shield)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.oneHandSword)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.heavyArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.leadership)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.persuade)))
    }
    if (c.job === ENUM_JOB_NAMES.monk) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.staff)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.cooking)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.robes)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scholar)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.woodWorking)))
    }
    if (c.job === ENUM_JOB_NAMES.noble) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.oneHandSword)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.shield)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.leadership)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.persuade)))
    }
    if (c.job === ENUM_JOB_NAMES.peseant) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.dagger)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.axe)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.cooking)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.fishing)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.swim)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.tracking)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.woodWorking)))
    }
    if (c.job === ENUM_JOB_NAMES.ranger) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.bow)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.spear)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.hunting)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scout)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.tracking)))
    }
    if (c.job === ENUM_JOB_NAMES.rouge) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.bow)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.oneHandSword)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scout)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lockPicking)))
    }
    if (c.job === ENUM_JOB_NAMES.thief) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.dagger)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lockPicking)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.steal)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lockPicking)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.findTraps)))
    }
    if (c.job === ENUM_JOB_NAMES.wizard) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.staff)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.robes)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.leadership)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scholar)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.persuade)))
    }
    if (c.race === ENUM_RACE_NAMES.dwarf) {
        if (c.skills.find(e => e.name == ENUM_SKILL_NAMES.axe) === undefined) {
            c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.axe)))
        }
    }
    setStartMasteryPoints(c)
}