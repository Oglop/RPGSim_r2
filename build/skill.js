const { copyObject, chance } = require('../lib/utils')
const { ENUM_SKILL_NAMES, ENUM_STAT_NAMES } = require('../generic/enums')
const objects = require('../generic/objects')

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
            o.name = ENUM_SKILL_NAMES-lockPicking
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
}


module.exports.build = (c) => {
    
}