const { ENUM_STAT_NAMES, ENUM_SKILL_NAMES } = require('../generic/enums')
const { getRandomNumber } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
/**
 * Check if skill exists in two array of skill
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @param {string} skill
 * @returns {bool} 
 */
const checkMatchingSkills = (arr1, arr2, skill) => {
    const t1 = arr1.find(s => s.name === skill)
    const t2 = arr2.find(s => s.name === skill)
    if (t1.name === t2.name && t2.name === skill) {
        return true
    }
    return false
}

/**
 * returns true if luck check should be done with skill
 * @param {ENUM_SKILL_NAME} skill 
 * @return {boolean}
 */
const doLuckRollForSkill = (skill) => {
    switch (skill) {
        case ENUM_SKILL_NAMES.fishing: return true;
        case ENUM_SKILL_NAMES.scout: return true;
        case ENUM_SKILL_NAMES.findTraps: return true;
        case ENUM_SKILL_NAMES.hunting: return true;
    }
    return false
}

/**
 * return 1 if successfull, 0 if failed
 * @param {{ character: { id: string, stats: {} } }}} character
 * @param { ENUM_STAT_NAMES } stat 
 * @returns {number} successes
 */
const checkCharacterSkill = (character, stat) => {
    try {
        let i = 0
        switch (stat) {
            case ENUM_STAT_NAMES.agi: i = character.stats.agi; break;
            case ENUM_STAT_NAMES.cha: i = character.stats.cha; break;
            case ENUM_STAT_NAMES.int: i = character.stats.int; break;
            case ENUM_STAT_NAMES.luc: i = character.stats.luc; break;
            case ENUM_STAT_NAMES.str: i = character.stats.str; break;
            case ENUM_STAT_NAMES.vit: i = character.stats.vit; break;
            case ENUM_STAT_NAMES.wis: i = character.stats.wis; break;
        }

        if (getRandomNumber(20) <= i) {
            return 1
        }
        return 0
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'checkCharacterSkill'
        err.message = e.message
        logError(err)
    }
    return 0
}

/**
 * returns stat base of skill
 * @param {ENUM_SKILL_NAME} skill 
 * @returns {ENUM_STAT_NAMES}
 */
const getStatBaseBySkillName = (skill) => {
    switch (skill) {
        case ENUM_SKILL_NAMES.axe: return ENUM_STAT_NAMES.str;
        case ENUM_SKILL_NAMES.bow: return ENUM_STAT_NAMES.agi
        case ENUM_SKILL_NAMES.cooking: return ENUM_STAT_NAMES.wis
        case ENUM_SKILL_NAMES.dagger: return ENUM_STAT_NAMES.agi
        case ENUM_SKILL_NAMES.lockPicking: return ENUM_STAT_NAMES.agi
        case ENUM_SKILL_NAMES.steal: return ENUM_STAT_NAMES.agi
        case ENUM_SKILL_NAMES.sneak: return ENUM_STAT_NAMES.agi
        case ENUM_SKILL_NAMES.oneHandSword: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.twoHandSword: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.staff: return ENUM_STAT_NAMES.int
        case ENUM_SKILL_NAMES.shield: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.mace: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.spear: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.fishing: return ENUM_STAT_NAMES.wis
        case ENUM_SKILL_NAMES.tracking: return ENUM_STAT_NAMES.wis
        case ENUM_SKILL_NAMES.persuade: return ENUM_STAT_NAMES.cha
        case ENUM_SKILL_NAMES.swim: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.lightArmor: return ENUM_STAT_NAMES.agi
        case ENUM_SKILL_NAMES.heavyArmor: return ENUM_STAT_NAMES.str
        case ENUM_SKILL_NAMES.robes: return ENUM_STAT_NAMES.int
        case ENUM_SKILL_NAMES.scout: return ENUM_STAT_NAMES.wis
        case ENUM_SKILL_NAMES.findTraps: return ENUM_STAT_NAMES.int
        case ENUM_SKILL_NAMES.healing: return ENUM_STAT_NAMES.wis
        case ENUM_SKILL_NAMES.hunting: return ENUM_STAT_NAMES.wis
        case ENUM_SKILL_NAMES.woodWorking: return ENUM_STAT_NAMES.vit
        case ENUM_SKILL_NAMES.scholar: return ENUM_STAT_NAMES.int
        case ENUM_SKILL_NAMES.leadership: return ENUM_STAT_NAMES.cha
    }
}

const characterKnowsSkill = (character, skill) => {
    return character.skills.find(s => s.name === skill)
}

/**
 * returns number of successes
 * @param {{ party: {members: []} }}} p arty 
 * @param {ENUM_SKILL_NAMES} skill 
 * @returns {int}
 */
const checkPartySkill = (party, skill) => {
    try {
        const successes = []
        const stat = getStatBaseBySkillName(skill)
        for (let j = 0; j < p.members.length; j++) {
            if (characterKnowsSkill(p.members[j], skill)) {
                let i = 0
                switch (stat) {
                    case ENUM_STAT_NAMES.agi: i = p.members[j].stats.agi; break;
                    case ENUM_STAT_NAMES.cha: i = p.members[j].stats.cha; break;
                    case ENUM_STAT_NAMES.int: i = p.members[j].stats.int; break;
                    case ENUM_STAT_NAMES.luc: i = p.members[j].stats.luc; break;
                    case ENUM_STAT_NAMES.str: i = p.members[j].stats.str; break;
                    case ENUM_STAT_NAMES.vit: i = p.members[j].stats.vit; break;
                    case ENUM_STAT_NAMES.wis: i = p.members[j].stats.wis; break;
                }
                if (getRandomNumber(20) <= i) {
                    successes.push(p.members[j])
                } else {
                    if (doLuckRollForSkill(skill)) {
                        if (getRandomNumber(20) <= p.members[j].stats.luc) {
                            successes.push(p.members[j])
                        }
                    }
                }
            }
        }
        return successes
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'checkPartySkill'
        err.message = e.message
        logError(err)
    }
    return []
}

/**
 * return character object if stat check is successful
 * @param {{ id:Text, stats: {} }} character 
 * @param { ENUM_STAT_NAMES } stat 
 * @returns {[{ id:Text, stats: {} }]} character
 */
const checkCharacterStat = (character, stat) => {
    try {
        const successes = []
        let i = 0
        switch (stat) {
            case ENUM_STAT_NAMES.agi: i = character.stats.agi; break;
            case ENUM_STAT_NAMES.cha: i = character.stats.cha; break;
            case ENUM_STAT_NAMES.int: i = character.stats.int; break;
            case ENUM_STAT_NAMES.luc: i = character.stats.luc; break;
            case ENUM_STAT_NAMES.str: i = character.stats.str; break;
            case ENUM_STAT_NAMES.vit: i = character.stats.vit; break;
            case ENUM_STAT_NAMES.wis: i = character.stats.wis; break;
        }
        if (getRandomNumber(20) <= i) {
            successes.push(character)
        }
        return successes
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'checkCharacterStat'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    checkCharacterSkill,
    checkPartySkill,
    characterKnowsSkill,
    getStatBaseBySkillName,
    checkCharacterStat
}