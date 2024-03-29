const { 
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE,
    ENUM_OVERSPENDING_ACTION,
    ENUM_DWELLING_LOCATION_STATUS,
    ENUM_DWELLING_LOCATION_TYPE,
    ENUM_UNDERSPANDING_ACTION
} = require('../generic/enums')
const { tryToUnderstandEachOther } = require('./language')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { noOfAliveMembers } = require('./party')
const { copyObject, getRandomNumberInRange, chance } = require('../lib/utils')
const { 
    MAX_RELATIONSHIP_VALUE, 
    MIN_RELATIONSHIP_VALUE,
    TAX_RATE_MAX,
    TAX_RATE_MIN,
} = require('../generic/statics')
const { get } = require('../localization')
const { locationExists } = require('./dwellingLocation')


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
 * returns integer chance based on personality
 * @param {ENUM_PERSONALITIES} personality 
 * @returns integer
 */
const getChanceOfDowngrade = (personality) => {
    switch (personality) {
        case ENUM_PERSONALITIES.AMBITIOUS : return 30;
        case ENUM_PERSONALITIES.CRUEL : return 40;
        case ENUM_PERSONALITIES.GIFTED : return 30;
        case ENUM_PERSONALITIES.GREEDY : return 80;
        case ENUM_PERSONALITIES.INTELLIGENT : return 60;
        case ENUM_PERSONALITIES.KIND : return 50;
        case ENUM_PERSONALITIES.LAZY : return 90;
        case ENUM_PERSONALITIES.NAIVE : return 50;
        case ENUM_PERSONALITIES.PARANOID : return 30;
        case ENUM_PERSONALITIES.RELIGIOUS : return 80;
    }
    return 100
}

const dealWithUnderSpending = (personality, taxRate, advisorResult, ongoingProjects) => {
    if (personality == ENUM_PERSONALITIES.AMBITIOUS) {
        if(ongoingProjects.length < 4) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION
        }
        if(advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD && chance(40)) {
            return ENUM_UNDERSPANDING_ACTION.SEEK_TRADE
        }
        if(advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL  && chance(40)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_MILITARY
        }
    }

    if (personality == ENUM_PERSONALITIES.CRUEL) {
        if (chance(50) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        if (chance(50) && advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_MILITARY;
        }
        if (chance(70) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL) && ongoingProjects.length <= 1) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
        if (chance(30) && advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD && ongoingProjects.length <= 1) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
    }

    if (personality == ENUM_PERSONALITIES.GIFTED) {
        if((advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL) && ongoingProjects.length < 3) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION
        }
        if (chance(40) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_DEFENCES;
        }
        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }
        if(taxRate > TAX_RATE_MIN && chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.DECREASE_TAX;
        }
    }

    if (personality == ENUM_PERSONALITIES.GREEDY) {
        if (chance(70) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_TREASURY;
        }
        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }
        if (chance(70) && ongoingProjects.length <= 1) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
    }

    if (personality == ENUM_PERSONALITIES.INTELLIGENT) {
        if (chance(40) && ongoingProjects.length <= 1 && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
        if (chance(40) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.SEEK_TRADE;
        }
        if (chance(40) && taxRate > TAX_RATE_MIN && advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            return ENUM_UNDERSPANDING_ACTION.DECREASE_TAX;
        }
        if (chance(20)) {
            return ENUM_UNDERSPANDING_ACTION.TOURNEY;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }
        
    }

    if (personality == ENUM_PERSONALITIES.KIND) {
        if (chance(80) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.DECREASE_TAX;
        }
        if (chance(50)&& (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD)) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
        if (taxRate > TAX_RATE_MIN && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }
    }

    if (personality == ENUM_PERSONALITIES.LAZY) {
        
        if (chance(10) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD)) {
            return ENUM_UNDERSPANDING_ACTION.TOURNEY;
        }
        if (chance(20)) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
    }

    if (personality == ENUM_PERSONALITIES.NAIVE) {
        if (taxRate > TAX_RATE_MIN && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.DECREASE_TAX;
        }
        if (chance(60) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }
        if (chance(40) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
        if (chance(60)) {
            return ENUM_UNDERSPANDING_ACTION.SEEK_TRADE;
        }
    }

    if (personality == ENUM_PERSONALITIES.PARANOID) {
        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_DEFENCES;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_MILITARY;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }
    }

    if (personality == ENUM_PERSONALITIES.RELIGIOUS) {
        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_TREASURY;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            return ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION;
        }

        if(chance(50) && (advisorResult == ENUM_PERSONALITY_DEALS_RESULT.GOOD || advisorResult == ENUM_PERSONALITY_DEALS_RESULT.NORMAL)) {
            
        }
        
    }
    return ENUM_UNDERSPANDING_ACTION.NONE;
}


const dealWithOverSpending = (personality, taxRate, advisorResult, ongoingProjects) => {
    if (personality == ENUM_PERSONALITIES.AMBITIOUS) {
        if (chance(30)) {
            return ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.CRUEL) {
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.GIFTED) {
        if (chance(100 - getChanceOfDowngrade(personality))) {
            return ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.GREEDY) {
        if (chance(70)) {
            return ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        if (chance(70)) {
            return ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.INTELLIGENT) {
        if (chance(40)) {
            return ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        if (chance(80)) {
            return ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.KIND) {
        if (chance(80)) {
            return ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY;
        }
        if (chance(50)) {
            return ENUM_OVERSPENDING_ACTION.RELIGIOUS_FUNDS;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.LAZY) {
        
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        if (chance(20)) {
            return ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.NAIVE) {
        if (chance(70)) {
            return ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN;
        }
        if (chance(60)) {
            return ENUM_OVERSPENDING_ACTION.RELIGIOUS_FUNDS;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        if (chance(60)) {
            return ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.PARANOID) {
        
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }

    if (personality == ENUM_PERSONALITIES.RELIGIOUS) {
        if (chance(80)) {
            return ENUM_OVERSPENDING_ACTION.RELIGIOUS_FUNDS;
        }
        if (chance(100 - getChanceOfDowngrade(personality)) && taxRate < TAX_RATE_MAX) {
            return ENUM_OVERSPENDING_ACTION.INCREASE_TAX;
        }
        return ENUM_OVERSPENDING_ACTION.NONE;
    }
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
                case ENUM_PERSONALITIES.LAZY: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.PARANOID: return ENUM_PERSONALITY_DEALS_RESULT.BAD
                case ENUM_PERSONALITIES.GREEDY: return ENUM_PERSONALITY_DEALS_RESULT.BAD
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
        case ENUM_PERSONALITY_DEALS_TYPE.PREPERATIONS: 
            switch (personality) {
                case ENUM_PERSONALITIES.KIND: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.CRUEL: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.GIFTED: return ENUM_PERSONALITY_DEALS_RESULT.BAD
                case ENUM_PERSONALITIES.LAZY: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
            break
        case ENUM_PERSONALITY_DEALS_TYPE.RESOLUTION: 
            switch (personality) {
                case ENUM_PERSONALITIES.AMBITIOUS: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.CRUEL: return ENUM_PERSONALITY_DEALS_RESULT.GOOD
                case ENUM_PERSONALITIES.KIND: return ENUM_PERSONALITY_DEALS_RESULT.BAD
                case ENUM_PERSONALITIES.GIFTED: return ENUM_PERSONALITY_DEALS_RESULT.BAD
            }
            break
    }
    

    return ENUM_PERSONALITY_DEALS_RESULT.NORMAL
}

const getNonExisitinghCityFunction = (dwelling) => {
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.MARKET)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.MARKET, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.INN)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.INN, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BLACKSMITH)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.BLACKSMITH, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TRAINING_GROUNDS)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.TRAINING_GROUNDS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.SQUARE)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.SQUARE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BATHS)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.BATHS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.SEWERS)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.SEWERS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.STABLES)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.STABLES, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BAKER)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.BAKER, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.CEMETARY)) {
        return { type: ENUM_DWELLING_LOCATION_TYPE.CEMETARY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
    }
    
}

const getConstructionPreference = (personality, dwelling) => {
    try {
        const locationUnderProduction = dwelling.locations.filter(l => l.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION)
        const locationsDestroyed = dwelling.locations.filter(l => l.status == ENUM_DWELLING_LOCATION_STATUS.DESTROYED)
    
        if (personality == ENUM_PERSONALITIES.AMBITIOUS) {
            
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BANK)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.BANK, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.COURT)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.COURT, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.GUILD)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.GUILD, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.MAGIC_ACADEMY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.MAGIC_ACADEMY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TREASAURY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TREASAURY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.SEWERS)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.SEWERS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.CRUEL) {
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.JAIL)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.JAIL, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.COURT)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.COURT, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.ARENA)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.ARENA, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TREASAURY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TREASAURY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TOURNAMENT_FIELD)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TOURNAMENT_FIELD, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.GIFTED) {
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.PALACE)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.PALACE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.LIBRARY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.LIBRARY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.UNIVERSITY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.UNIVERSITY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TOWN_HALL)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TOWN_HALL, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.WIZARDS_TOWER)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.WIZARDS_TOWER, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.MAGIC_ACADEMY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.MAGIC_ACADEMY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.GREEDY) {
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BANK)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.BANK, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.GUILD)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.GUILD, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.MARKET)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.MARKET, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.INTELLIGENT) {
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.UNIVERSITY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.UNIVERSITY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.LIBRARY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.LIBRARY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TOWN_HALL)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TOWN_HALL, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.MAGIC_ACADEMY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.MAGIC_ACADEMY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.KIND) {
            if (locationsDestroyed.length > 0) {
                return { type: locationsDestroyedlength[0].type, status: ENUM_DWELLING_LOCATION_STATUS.DESTROYED }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.SEWERS)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.SEWERS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.LIBRARY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.LIBRARY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.PARK)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.PARK, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.LIBRARY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.LIBRARY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BATHS)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.BATHS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
    
        }
        if (personality == ENUM_PERSONALITIES.LAZY) {
            if (chance(60)) { return getNonExisitinghCityFunction(dwelling) }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.PARK)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.PARK, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.PALACE)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.PALACE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.ARENA)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.ARENA, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.NAIVE) {
            if (chance(60)) { return getNonExisitinghCityFunction(dwelling) }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.BANK)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.BANK, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.GUILD)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.GUILD, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.WIZARDS_TOWER)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.WIZARDS_TOWER, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.CATACOMBS)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.CATACOMBS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (locationsDestroyed.length > 0) {
                return { type: locationsDestroyedlength[0].type, status: ENUM_DWELLING_LOCATION_STATUS.DESTROYED }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.PARANOID) {
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.TREASAURY)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TREASAURY, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.JAIL)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.JAIL, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.JAIL)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.JAIL, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
        if (personality == ENUM_PERSONALITIES.RELIGIOUS) {
            if (locationUnderProduction.filter(l => l.status == ENUM_DWELLING_LOCATION_TYPE.TEMPLE) == 0) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.TEMPLE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (locationsDestroyed.length > 0) {
                return { type: locationsDestroyedlength[0].type, status: ENUM_DWELLING_LOCATION_STATUS.DESTROYED }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.CATACOMBS)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.CATACOMBS, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.SHRINE)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.SHRINE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            if (!locationExists(dwelling, ENUM_DWELLING_LOCATION_TYPE.SEWERS)) {
                return { type: ENUM_DWELLING_LOCATION_TYPE.SHRINE, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION }
            }
            return getNonExisitinghCityFunction(dwelling)
        }
    }
    catch(e) {
        const err = copyObject(objects.error)
        err.file = __filename
        err.function = 'getConstructionPreference'
        err.message = e.message
        logError(err)
    }
    
}


/**
 * 
 * @param {object} character1 
 * @param {object} character2 
 * @param {number} value 
 */
const addOrUpdateRelations = (character1, character2, value) => {
    let relation1 = {}
    if (character1.relationships.find(c => c.id == character2.id) != undefined) {
        relation1 = character1.relationships.find(c => c.id == character2.id)
    }
    else {
        relation1 = copyObject(objects.relation)
        relation1.characterId = character1.id
        relation1.id = character2.id
        character1.relationships.push(relation1)
    }

    let relation2 = {}
    if (character2.relationships.find(c => c.id == character1.id) != undefined) {
        relation2 = character2.relationships.find(c => c.id == character1.id)
    }
    else {
        relation2 = copyObject(objects.relation)
        relation2.characterId = character2.id
        relation2.id = character1.id
        character2.relationships.push(relation2)
    }

    relation1.points += value
    relation2.points += value
    if (relation1.points > MAX_RELATIONSHIP_VALUE) { relation1.points = MAX_RELATIONSHIP_VALUE }
    if (relation2.points > MAX_RELATIONSHIP_VALUE) { relation2.points = MAX_RELATIONSHIP_VALUE }
    if (relation1.points < MIN_RELATIONSHIP_VALUE) { relation1.points = MIN_RELATIONSHIP_VALUE }
    if (relation2.points < MIN_RELATIONSHIP_VALUE) { relation2.points = MIN_RELATIONSHIP_VALUE }
} 

/**
 * 
 * @param {object} party 
 * @param {ENUM_PERSONALITY_DEALS_RESULT} dailyStatus
 */
const partyDailyRelationShipRoll = (party, dailyStatus) =>  {
    const len = noOfAliveMembers(party)
    const dailyValue = (dailyStatus == ENUM_PERSONALITY_DEALS_RESULT.NORMAL) ? 1 : 
                (dailyStatus == ENUM_PERSONALITY_DEALS_RESULT.GOOD) ? 2 : 0
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            testResultValue = compabilityCheck(party.members[i], party.members[j])
            addOrUpdateRelations(party.members[i], party.members[j], testResultValue + dailyValue)
        }
    }
}

const getDescriptionByPersonality = (personality) => {
    switch (personality) {
        case ENUM_PERSONALITIES.AMBITIOUS: return get('personality-description-ambitious');
        case ENUM_PERSONALITIES.CRUEL: return get('personality-description-cruel');
        case ENUM_PERSONALITIES.GIFTED: return get('personality-description-gifted');
        case ENUM_PERSONALITIES.GREEDY: return get('personality-description-greedy');
        case ENUM_PERSONALITIES.INTELLIGENT: return get('personality-description-intelligent');
        case ENUM_PERSONALITIES.KIND: return get('personality-description-kind');
        case ENUM_PERSONALITIES.LAZY: return get('personality-description-lazy');
        case ENUM_PERSONALITIES.NAIVE: return get('personality-description-naive');
        case ENUM_PERSONALITIES.PARANOID: return get('personality-description-paranoid');
        case ENUM_PERSONALITIES.RELIGIOUS: return get('personality-description-religious');
    }
}
/**
 * 
 * @param {*} party 
 * @param {*} value 
 */
const partyExtraRelationshipRoll = (party, value) => {
    for (let i = 0; i < party.members.length; i++) {
        for (let j = i + 1; j < len; j++) {
            addOrUpdateRelations(party.members[i], party.members[j], value)
        }
    }
}

module.exports = {
    compabilityCheck,
    personalityDealsWith,
    partyDailyRelationShipRoll,
    partyExtraRelationshipRoll,
    getDescriptionByPersonality,
    getChanceOfDowngrade,
    dealWithOverSpending,
    dealWithUnderSpending,
    getConstructionPreference
}