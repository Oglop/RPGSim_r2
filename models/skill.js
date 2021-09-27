const { ENUM_STAT_NAMES } = require('../generic/enums')
const { getRandomNumber } = require('../lib/utils')
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
 * 
 * @param {Object} c Character
 * @param {ENUM_STAT_NAMES} stat 
 */
const checkCharacterSkill = (c, stat) => {
    try {
        let i = 0
        switch (stat) {
            case ENUM_STAT_NAMES.agi: i = c.stats.agi; break;
            case ENUM_STAT_NAMES.cha: i = c.stats.cha; break;
            case ENUM_STAT_NAMES.int: i = c.stats.int; break;
            case ENUM_STAT_NAMES.luc: i = c.stats.luc; break;
            case ENUM_STAT_NAMES.str: i = c.stats.str; break;
            case ENUM_STAT_NAMES.vit: i = c.stats.vit; break;
            case ENUM_STAT_NAMES.wis: i = c.stats.wis; break;
        }

        if (getRandomNumber(20) <= i) {
            return true
        }
        return false
    } catch (e) {

    }
}

moodule.exports = {
    checkCharacterSkill
}