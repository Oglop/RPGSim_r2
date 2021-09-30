const { ENUM_PERSONALITIES } = require('../generic/enums')
const { tryToUnderstandEachOther } = require('./language')

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
    if (likes(charA.personality) === ENUM_PERSONALITIES.all) { i += 1 }
    if (likes(charB.personality) === ENUM_PERSONALITIES.all) { i += 1 }
    if (dislikes(charA.personality) === ENUM_PERSONALITIES.all) { i -= 1 }
    if (dislikes(charB.personality) === ENUM_PERSONALITIES.all) { i -= 1 }
    if (likes(charA.personality) === charB.personality) { i += 2 }
    if (likes(charB.personality) === charA.personality) { i += 2 }
    if (dislikes(charA.personality) === charB.personality) { i -= 1 }
    if (dislikes(charB.personality) === charA.personality) { i -= 1 }
    if (tryToUnderstandEachOther(charA, charB)) { i += 1 }
    return i
}

module.exports = {
    compabilityCheck
}