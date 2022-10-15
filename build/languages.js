const { ENUM_LANGUAGES, ENUM_MASTERY_LEVELS, ENUM_RACE_NAMES, ENUM_JOB_NAMES } = require('../generic/enums')
const { copyObject, chance, getRandomNumberInRange, generateID } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
 
const getMastery = (level) => {
    switch (level) {
        case ENUM_MASTERY_LEVELS.NOVICE : return getRandomNumberInRange(1, 5)
        case ENUM_MASTERY_LEVELS.SKILLED : return getRandomNumberInRange(5, 9)
        case ENUM_MASTERY_LEVELS.MASTER : return getRandomNumberInRange(10, 15)
    }
}

const checkAndAddLanguage = (language, lang, level) => {
    if (lang.find(l => l.language === language) === undefined) {
        const m = getMastery(level)
        const l = copyObject(objects.language)
        l.id = generateID()
        l.mastery = m
        l.language = language
        lang.push(l)
    }
}


/**
 * Accepts Object of type character
 * 
 * @param {Object} c Object of type Character
 * @returns {Array} list of Object of type Languages
 */
module.exports.build = (c) => {
    const lang = []
    try {
        if (c.race == ENUM_RACE_NAMES.human) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.MASTER)
        }
        if (c.race == ENUM_RACE_NAMES.dwarf) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.SKILLED)
            checkAndAddLanguage(ENUM_LANGUAGES.dwarven, lang, ENUM_MASTERY_LEVELS.MASTER)
        }
        if (c.race == ENUM_RACE_NAMES.halfElf) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.MASTER)
            checkAndAddLanguage(ENUM_LANGUAGES.commonElven , lang, ENUM_MASTERY_LEVELS.SKILLED)
        }
        if (c.race == ENUM_RACE_NAMES.darkElf) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.NOVICE)
            checkAndAddLanguage(ENUM_LANGUAGES.commonElven , lang, ENUM_MASTERY_LEVELS.SKILLED)
            checkAndAddLanguage(ENUM_LANGUAGES.darkElven , lang, ENUM_MASTERY_LEVELS.MASTER)
        }
        if (c.race == ENUM_RACE_NAMES.highElf) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.SKILLED)
            checkAndAddLanguage(ENUM_LANGUAGES.highElven, lang, ENUM_MASTERY_LEVELS.MASTER)
            checkAndAddLanguage(ENUM_LANGUAGES.woodElven, lang, ENUM_MASTERY_LEVELS.SKILLED)
            if (chance(50)) {
                checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.SKILLED)
            } else {
                checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if (c.race == ENUM_RACE_NAMES.woodElf) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.SKILLED)
            checkAndAddLanguage(ENUM_LANGUAGES.woodElven, lang, ENUM_MASTERY_LEVELS.MASTER)
            checkAndAddLanguage(ENUM_LANGUAGES.commonElven, lang, ENUM_MASTERY_LEVELS.SKILLED)
            if (chance(50)) {
                checkAndAddLanguage(ENUM_LANGUAGES.highElven, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
            if (chance(50)) {
                checkAndAddLanguage(ENUM_LANGUAGES.dwarven, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if(c.race == ENUM_RACE_NAMES.halfling) {
            checkAndAddLanguage(ENUM_LANGUAGES.common, lang, ENUM_MASTERY_LEVELS.MASTER)
            if (chance(50)) {
                checkAndAddLanguage(ENUM_LANGUAGES.commonElven, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
            if (chance(50)) {
                checkAndAddLanguage(ENUM_LANGUAGES.dwarven, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if (c.job === ENUM_JOB_NAMES.cleric) {
            if (chance(30)) {
                checkAndAddLanguage(ENUM_LANGUAGES.orcen, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
            if (chance(40)) {
                checkAndAddLanguage(ENUM_LANGUAGES.commonElven, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if (c.job === ENUM_JOB_NAMES.fighter) {
            if (chance(40)) {
                checkAndAddLanguage(ENUM_LANGUAGES.orcen, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if (c.job === ENUM_JOB_NAMES.knight) {
            if (chance(60)) {
                checkAndAddLanguage(ENUM_LANGUAGES.nobility, lang, ENUM_MASTERY_LEVELS.SKILLED)
            }
        }
        if (c.job === ENUM_JOB_NAMES.monk) {
            if (chance(30)) {
                checkAndAddLanguage(ENUM_LANGUAGES.ancient, lang, ENUM_MASTERY_LEVELS.SKILLED)
            }
        }
        if (c.job === ENUM_JOB_NAMES.noble) {
            checkAndAddLanguage(ENUM_LANGUAGES.nobility, lang, ENUM_MASTERY_LEVELS.MASTER)
        }
        if (c.job === ENUM_JOB_NAMES.peseant) {
            if (chance(30)) {
                checkAndAddLanguage(ENUM_LANGUAGES.orcen, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if (c.job === ENUM_JOB_NAMES.ranger) {
            if (chance(30)) {
                checkAndAddLanguage(ENUM_LANGUAGES.orcen, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
            
        }
        if (c.job === ENUM_JOB_NAMES.rouge) {
            
        }
        if (c.job === ENUM_JOB_NAMES.thief) {
            if (chance(20)) {
                checkAndAddLanguage(ENUM_LANGUAGES.nobility, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
        }
        if (c.job === ENUM_JOB_NAMES.wizard) {
            if (chance(60)) {
                checkAndAddLanguage(ENUM_LANGUAGES.nobility, lang, ENUM_MASTERY_LEVELS.SKILLED)
            }
            if (chance(70)) {
                checkAndAddLanguage(ENUM_LANGUAGES.ancient, lang, ENUM_MASTERY_LEVELS.SKILLED)
            }
            if (chance(30)) {
                checkAndAddLanguage(ENUM_LANGUAGES.black, lang, ENUM_MASTERY_LEVELS.NOVICE)
            }
            if (chance(80)) {
                checkAndAddLanguage(ENUM_LANGUAGES.highElven, lang, ENUM_MASTERY_LEVELS.SKILLED)
            }
        }
        lang.forEach(l => {
            l.characterId = c.id
        });

        return lang
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
}