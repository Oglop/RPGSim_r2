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
        trait: ENUM_PERSONALITIES.egoistic,
        likes: ENUM_PERSONALITIES.loudmouth,
        dislikes: ENUM_PERSONALITIES.leader
    },
    {
        trait: ENUM_PERSONALITIES.currious,
        likes: ENUM_PERSONALITIES.clumpsy,
        dislikes: ENUM_PERSONALITIES.stoic
    },
    {
        trait: ENUM_PERSONALITIES.friendly,
        likes: ENUM_PERSONALITIES.all,
        dislikes: ENUM_PERSONALITIES.egoistic
    },
    {
        trait: ENUM_PERSONALITIES.lonewolf,
        likes: ENUM_PERSONALITIES.friendly,
        dislikes: ENUM_PERSONALITIES.all
    },
    {
        trait: ENUM_PERSONALITIES.stoic,
        likes: ENUM_PERSONALITIES.leader,
        dislikes: ENUM_PERSONALITIES.religious
    },
    {
        trait: ENUM_PERSONALITIES.leader,
        likes: ENUM_PERSONALITIES.meddler,
        dislikes: ENUM_PERSONALITIES.leader
    },
    {
        trait: ENUM_PERSONALITIES.loudmouth,
        likes: ENUM_PERSONALITIES.meddler,
        dislikes: ENUM_PERSONALITIES.lonewolf
    },
    {
        trait: ENUM_PERSONALITIES.clumpsy,
        likes: ENUM_PERSONALITIES.friendly,
        dislikes: ENUM_PERSONALITIES.currious
    },
    {
        trait: ENUM_PERSONALITIES.meddler,
        likes: ENUM_PERSONALITIES.none,
        dislikes: ENUM_PERSONALITIES.none
    },
    {
        trait: ENUM_PERSONALITIES.religious,
        likes: ENUM_PERSONALITIES.lonewolf,
        dislikes: ENUM_PERSONALITIES.stoic
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
        if (likes(charA.personality) === ENUM_PERSONALITIES.all) { i += 1 }
        if (likes(charB.personality) === ENUM_PERSONALITIES.all) { i += 1 }
        if (dislikes(charA.personality) === ENUM_PERSONALITIES.all) { i -= 1 }
        if (dislikes(charB.personality) === ENUM_PERSONALITIES.all) { i -= 1 }
        if (likes(charA.personality) === charB.personality) { i += 2 }
        if (likes(charB.personality) === charA.personality) { i += 2 }
        if (dislikes(charA.personality) === charB.personality) { i -= 1 }
        if (dislikes(charB.personality) === charA.personality) { i -= 1 }
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
                case ENUM_PERSONALITIES.leader: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.meddler: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.loudmouth: return ENUM_PERSONALITY_DEALS_RESULT.BAD
                case ENUM_PERSONALITIES.egoistic: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
        case ENUM_PERSONALITY_DEALS_TYPE.PLANNING: 
            switch (personality) {
                case ENUM_PERSONALITIES.leader: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.meddler: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
        
    }


    return ENUM_PERSONALITY_DEALS_RESULT.NORMAL
}

module.exports = {
    compabilityCheck,
    personalityDealsWith
}