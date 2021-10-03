const { ENUM_PERSONALITIES, ENUM_PERSONALITY_DEALS_RESULT, ENUM_PERSONALITY_DEALS_TYPE } = require('../generic/enums')
const { tryToUnderstandEachOther } = require('./language')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')

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

const traitsChecks = [
    {
        trait: ENUM_PERSONALITIES.AMBITIOUS,
        likes: ENUM_PERSONALITIES.GIFTED,
        dislikes: ENUM_PERSONALITIES.LAZY
    },
    {
        trait: ENUM_PERSONALITIES.INTELLIGENT,
        likes: ENUM_PERSONALITIES.AMBITIOUS,
        dislikes: ENUM_PERSONALITIES.RELIGIOUS
    },
    {
        trait: ENUM_PERSONALITIES.GIFTED,
        likes: ENUM_PERSONALITIES.INTELLIGENT,
        dislikes: ENUM_PERSONALITIES.GREEDY
    },
    {
        trait: ENUM_PERSONALITIES.KIND,
        likes: ENUM_PERSONALITIES.RELIGIOUS,
        dislikes: ENUM_PERSONALITIES.CRUEL
    },
    {
        trait: ENUM_PERSONALITIES.CRUEL,
        likes: ENUM_PERSONALITIES.NAIVE,
        dislikes: ENUM_PERSONALITIES.GREEDY
    },
    {
        trait: ENUM_PERSONALITIES.LAZY,
        likes: ENUM_PERSONALITIES.NAIVE,
        dislikes: ENUM_PERSONALITIES.AMBITIOUS
    },
    {
        trait: ENUM_PERSONALITIES.NAIVE,
        likes: ENUM_PERSONALITIES.RELIGIOUS,
        dislikes: ENUM_PERSONALITIES.CRUEL
    },
    {
        trait: ENUM_PERSONALITIES.PARANOID,
        likes: ENUM_PERSONALITIES.NONE,
        dislikes: ENUM_PERSONALITIES.ALL
    },
    {
        trait: ENUM_PERSONALITIES.RELIGIOUS,
        likes: ENUM_PERSONALITIES.KIND,
        dislikes: ENUM_PERSONALITIES.GREEDY
    },
    {
        trait: ENUM_PERSONALITIES.GREEDY,
        likes: ENUM_PERSONALITIES.CRUEL,
        dislikes: ENUM_PERSONALITIES.INTELLIGENT
    }
]

const dislikes = trait => {
    return traitsChecks.find(t => t.trait === trait).dislikes
}

const likes = trait => {
    return traitsChecks.find(t => t.trait === trait).likes
}


/**
 * 
 * @param {Object} charA 
 * @param {Object} charB 
 */
const compabilityCheck = (charA, charB) => {
    let i = 1;
    try {
        if (likes(charA.personality) === ENUM_PERSONALITIES.ALL) { i += 1 }
        if (likes(charB.personality) === ENUM_PERSONALITIES.ALL) { i += 1 }
        if (dislikes(charA.personality) === ENUM_PERSONALITIES.ALL) { i -= 1 }
        if (dislikes(charB.personality) === ENUM_PERSONALITIES.ALL) { i -= 1 }
        if (likes(charA.personality) === charB.personality) { i += 2 }
        if (likes(charB.personality) === charA.personality) { i += 2 }
        if (dislikes(charA.personality) === charB.personality) { i -= 1 }
        if (dislikes(charB.personality) === charA.personality) { i -= 1 }
        if ((charA.personality === ENUM_PERSONALITIES.RELIGIOUS || 
            charB.personality === ENUM_PERSONALITIES.RELIGIOUS) &&
            (charA.religion != charB.religion)) {
                i -= 2
            }
            if ((charA.personality === ENUM_PERSONALITIES.RELIGIOUS && 
                charB.personality === ENUM_PERSONALITIES.RELIGIOUS) &&
                (charA.religion == charB.religion)) {
                    i += 2
                }


        if (tryToUnderstandEachOther(charA, charB)) { i += 1 }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'compabilityCheck'
        err.message = e.message
        logError(err)
    }
    return i
}

/**
 * returns how a character deals with situation
 * @param {ENUM_PERSONALITIES} personality 
 * @param {ENUM_PERSONALITY_DEALS_TYPE} type 
 * @returns {ENUM_PERSONALITY_DEALS_RESULT} result
 */
const personalityDealsWith = (personality, type) => {
    switch (type) {
        case ENUM_PERSONALITY_DEALS_TYPE.STRESS: 
            switch (personality) {
                case ENUM_PERSONALITIES.AMBITIOUS: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.NAIVE: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.PARANOID: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
            break
        case ENUM_PERSONALITY_DEALS_TYPE.PLANNING: 
            switch (personality) {
                case ENUM_PERSONALITIES.PARANOID: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.CRUEL: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.INTELLIGENT: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.LAZY: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
            break
        case ENUM_PERSONALITY_DEALS_TYPE.INITIATIVE: 
            switch (personality) {
                case ENUM_PERSONALITIES.PARANOID: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.GIFTED: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.LAZY: return ENUM_PERSONALITY_DEALS_RESULT.BAD
                case ENUM_PERSONALITIES.NAIVE: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
            break
        case ENUM_PERSONALITY_DEALS_TYPE.STRATEGY: 
            switch (personality) {
                case ENUM_PERSONALITIES.GREEDY: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.INTELLIGENT: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.RELIGIOUS: return ENUM_PERSONALITY_DEALS_RESULT.BAD
                case ENUM_PERSONALITIES.KIND: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
            break
    }
    

    return ENUM_PERSONALITY_DEALS_RESULT.NORMAL
}

module.exports = {
    compabilityCheck,
    personalityDealsWith
}