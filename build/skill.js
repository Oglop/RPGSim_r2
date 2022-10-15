const { copyObject, getRandomNumberInRange, generateID } = require('../lib/utils')
const { ENUM_SKILL_NAMES, ENUM_STAT_NAMES, ENUM_JOB_NAMES, ENUM_RACE_NAMES } = require('../generic/enums')
const objects = require('../generic/objects')
const m = require('../models/skill')

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
    o.id = generateID()
    switch (skill) {
        case ENUM_SKILL_NAMES.axe:
            o.name = ENUM_SKILL_NAMES.axe
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.axe)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.bow:
            o.name = ENUM_SKILL_NAMES.bow
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.bow)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.cooking:
            o.name = ENUM_SKILL_NAMES.cooking
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.cooking)
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.dagger:
            o.name = ENUM_SKILL_NAMES.dagger
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.dagger)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.lockPicking:
            o.name = ENUM_SKILL_NAMES.lockPicking
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.lockPicking)
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.steal:
            o.name = ENUM_SKILL_NAMES.steal
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.steal)
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.oneHandSword:
            o.name = ENUM_SKILL_NAMES.oneHandSword
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.oneHandSword)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.twoHandSword:
            o.name = ENUM_SKILL_NAMES.twoHandSword
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.twoHandSword)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.staff:
            o.name = ENUM_SKILL_NAMES.staff
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.staff)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.shield:
            o.name = ENUM_SKILL_NAMES.shield
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.shield)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.mace:
            o.name = ENUM_SKILL_NAMES.mace
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.mace)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.spear:
            o.name = ENUM_SKILL_NAMES.spear
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.spear)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.fishing:
            o.name = ENUM_SKILL_NAMES.fishing
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.fishing)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.tracking:
            o.name = ENUM_SKILL_NAMES.tracking
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.tracking)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.persuade:
            o.name = ENUM_SKILL_NAMES.persuade
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.persuade)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.swim:
            o.name = ENUM_SKILL_NAMES.swim
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.swim)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.lightArmor:
            o.name = ENUM_SKILL_NAMES.lightArmor
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.lightArmor)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.heavyArmor:
            o.name = ENUM_SKILL_NAMES.heavyArmor
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.heavyArmor)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.robes:
            o.name = ENUM_SKILL_NAMES.robes
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.robes)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.scout:
            o.name = ENUM_SKILL_NAMES.scout
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.scout)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.findTraps:
            o.name = ENUM_SKILL_NAMES.findTraps
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.findTraps)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.healing:
            o.name = ENUM_SKILL_NAMES.healing
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.healing)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.hunting:
            o.name = ENUM_SKILL_NAMES.hunting
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.hunting)
            o.luckTest = true
            break
        case ENUM_SKILL_NAMES.woodWorking:
            o.name = ENUM_SKILL_NAMES.woodWorking
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.woodWorking)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.scholar:
            o.name = ENUM_SKILL_NAMES.scholar
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.scholar)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.leadership:
            o.name = ENUM_SKILL_NAMES.leadership
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.leadership)
            o.luckTest = false
            break
        case ENUM_SKILL_NAMES.sneak:
            o.name = ENUM_SKILL_NAMES.sneak
            o.statsBase = m.getStatBaseBySkillName(ENUM_SKILL_NAMES.sneak)
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
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.sneak)))
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
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.sneak)))
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
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.sneak)))
    }
    if (c.job === ENUM_JOB_NAMES.thief) {
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.dagger)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lightArmor)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.lockPicking)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.steal)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.findTraps)))
        c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.sneak)))
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
    if (c.race === ENUM_RACE_NAMES.halfling) {
        if (c.skills.find(e => e.name == ENUM_SKILL_NAMES.sneak) === undefined) {
            c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.sneak)))
        }
    }
    if (c.race === ENUM_RACE_NAMES.highElf) {
        if (c.skills.find(e => e.name == ENUM_SKILL_NAMES.scholar) === undefined) {
            c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.scholar)))
        }
    }
    if (c.race === ENUM_RACE_NAMES.darkElf) {
        if (c.skills.find(e => e.name == ENUM_SKILL_NAMES.leadership) === undefined) {
            c.skills.push(copyObject(getSkill(ENUM_SKILL_NAMES.leadership)))
        }
    }
    setStartMasteryPoints(c)
    c.skills.forEach(s => {
        s.characterId = c.id
    });
}