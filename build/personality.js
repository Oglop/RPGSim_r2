const { ENUM_PERSONALITIES } = require('../generic/enums')
const { getRandomNumberInRange } = require('../lib/utils')

const getRandomPersonality = () => {
    const i = getRandomNumberInRange(0, 9)
    switch (i) {
        case 0: return ENUM_PERSONALITIES.egoistic;
        case 1: return ENUM_PERSONALITIES.currious;
        case 2: return ENUM_PERSONALITIES.friendly;
        case 3: return ENUM_PERSONALITIES.lonewolf;
        case 4: return ENUM_PERSONALITIES.stoic;
        case 5: return ENUM_PERSONALITIES.leader;
        case 6: return ENUM_PERSONALITIES.loudmouth;
        case 7: return ENUM_PERSONALITIES.clumpsy;
        case 8: return ENUM_PERSONALITIES.meddler;
        case 9: return ENUM_PERSONALITIES.religious;
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