const { ENUM_PERSONALITIES } = require('../generic/enums')
const { getRandomNumberInRange } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')

/*
AMBITIOUS, // starts projects wants to be ruler
INTELLIGENT, // reasons
GIFTED, // solves problems
KIND, // meddles
CRUEL, // wants
LAZY, // ignores issues
NAIVE, // easy to manipulate
PARANOID, // defensive
RELIGIOUS, // good at chrisis
GREEDY // manipulative
 */
const getRandomPersonality = () => {
    try {
        const i = getRandomNumberInRange(0, 9)
        switch (i) {
            case 0: return ENUM_PERSONALITIES.AMBITIOUS;
            case 1: return ENUM_PERSONALITIES.INTELLIGENT;
            case 2: return ENUM_PERSONALITIES.GIFTED;
            case 3: return ENUM_PERSONALITIES.KIND;
            case 4: return ENUM_PERSONALITIES.CRUEL;
            case 5: return ENUM_PERSONALITIES.LAZY;
            case 6: return ENUM_PERSONALITIES.NAIVE;
            case 7: return ENUM_PERSONALITIES.PARANOID;
            case 8: return ENUM_PERSONALITIES.RELIGIOUS;
            case 9: return ENUM_PERSONALITIES.GREEDY;
        }
        if (i > 9 || i < 0) { throw new Error('random number generated not withing range') }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'getRandomPersonality'
        err.message = e.message
        logError(err)
    }
    
}

/**
 * 
 * @param {Object} character 
 * @param {Object} options 
 */
module.exports.build = (character, options = {}) => {
    character.personality = (options.personality) ? options.personality : getRandomPersonality()
}