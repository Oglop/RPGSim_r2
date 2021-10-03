const { copyObject, chance, getRandomNumber, getRandomElementFromArray } = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_EVENT_TYPE, ENUM_ENEMY_STRENGTH, 
    ENUM_ENEMY_TYPE, 
    ENUM_GAME_MODE, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_EVENT_ITEM_STATUS,
    ENUM_GENDER, 
    ENUM_JOB_NAMES, 
    ENUM_RACE_NAMES, 
    ENUM_LANGUAGES, 
    ENUM_PERSONALITIES
} = require('../generic/enums')
const { getDwellingsFromMap } = require('../models/map')
const { 
    getLeaderByDwellingId,
    getFamiliesByDwellingId,
    distributInfluence,
    getFamilyIdByCharacterId } = require('../models/family')
const { personalityDealsWith } = require('../models/personality')
const { getSeason } = require('../lib/time')
const monsterBuilder = require('../build/monster')
const charachterBuilder = require('../build/character')
const familyBuilder = require('../build/families')
const { event, world } = require('../generic/objects')



/*  MONSTER FIGHTING  */


const raiders = (event, world) => {
    const dwellings = getDwellingsFromMap(world.map)
    const dwelling = getRandomElementFromArray(dwellings)
    const monster = monsterBuilder.build({
        mode: ENUM_GAME_MODE.HISTORY,
        strength: ENUM_ENEMY_STRENGTH.WEAK,
        type: ENUM_ENEMY_TYPE.VILE
    })

    const i1 = copyObject(objects.eventItem)
    i1.description = `Scouts from ${dwelling.name} report of a raiding party of ${monster.name}s approaching.`    
    i1.execute = (previousResult) => {
        const leader =  getLeaderByDwellingId(world.families, dwelling.id)
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.INITIATIVE)
        if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = `${leader.name} prepares a force to ambush the ${monster.name}s`
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = `${dwelling.name} scrambles it´s defenses.`
        }
    }
    event.items.push(i1)

    const i2 = copyObject(objects.eventItem)
    i2.description = `The defenders of ${dwelling.name} are riding out to meet the threat.`
    i2.execute = (previousResult) => {
        const leader =  getLeaderByDwellingId(world.families, dwelling.id)
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.STRATEGY)
        if (previousResult == ENUM_EVENT_ITEM_STATUS.SUCCESS) {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i2.resolutionText = `Due to early initiative the ${monster.name} raiders are fought off, a great victory for ${leader.name}.`
            const fams = getFamiliesByDwellingId(world.families, dwelling.id)
            distributInfluence(fams, undefined, 6, leader.id)
        } else if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD || result == ENUM_PERSONALITY_DEALS_RESULT.NORMAL) {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i2.resolutionText = `After some hard fighting the defenders of ${dwelling.name} succeeds in fighting off the ${monster.name} raiders.`
        } else {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.FAILURE
            i2.resolutionText = `Taken by supprise the ${monster.name} raiders defeats the defenders. ${dwelling.name} was sacked!`
            const fams = getFamiliesByDwellingId(world.families, dwelling.id)
            distributInfluence(fams, undefined, -10, leader.id)
        }
    }
    event.items.push(i2)
    return event
}

/* POLITICS */

/**
 * Follows a young knights quest to become start a noble house
 */
const questingKnight = (event, world) => {
    const dwellings = getDwellingsFromMap(world.map)
    const dwelling = getRandomElementFromArray(dwellings)
    const monster = monsterBuilder.build({
        mode: ENUM_GAME_MODE.HISTORY,
        strength: ENUM_ENEMY_STRENGTH.STRONG,
        type: ENUM_ENEMY_TYPE.WILD
    })
    const hero = charachterBuilder.build({
        gender: ENUM_GENDER.MALE,
        job: ENUM_JOB_NAMES.knight,
        age: 16,
        date: world.date
    })
    const i1 = copyObject(objects.eventItem)
    i1.description = `Villagers close to ${dwelling.name} report of a monster terrorizing the farms.`
    i1.execute = (previousResult) => {
        const result = personalityDealsWith(hero.personality, ENUM_PERSONALITY_DEALS_TYPE.PREPERATIONS)
        if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = `${hero.name} makes careful preperations in order slay the beast.`

        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = `The young adventurer ${hero.name} sets out to slay the beast.`
        }
    }
    items.push(i1)

    const i2 = copyObject(objects.eventItem)
    i2.description = `After a long journey ${hero.name} closes in on the beasts lair.`
    i2.execute = (previousResult) => {
        const result = personalityDealsWith(hero.personality, ENUM_PERSONALITY_DEALS_TYPE.RESOLUTION)
        if (previousResult == ENUM_EVENT_ITEM_STATUS.SUCCESS && result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            i2.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i2.resolutionText = `${hero.name} sets a trap. A wild ${monster.name} is caught! ${hero.name} quickly kills the beast.` 
        } else {
            let i = (result == ENUM_PERSONALITY_DEALS_RESULT.BAD) ? 30 : 60
            if (chance(i)) {
                `${hero.name} is supprises a wild ${monster.name}. After a tough battle ${hero.name} defeats the beast.`
                i2.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            } else {
                `${hero.name} is supprised by a wild ${monster.name}! The fight is over before it is started. ${hero.name} is killed.`
                i2.resolution = ENUM_EVENT_ITEM_STATUS.FAILURE
                event.active = false
            }
        }
    }
    items.push(i2)

    const i3 = copyObject(objects.eventItem)
    i3.description = `${hero.name} returs to ${dwelling.name}.`
    i3.execute = (previousResult) => {
        const f = familyBuilder.create({
            character: hero,
            dwellingId: dwelling.id
        })
        world.families.push(f)
        i3.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
        i3.resolutionText = `${f.name} is reqognized amoung the noble houses of ${dwelling.name}.`
    }
    items.push(i3)
    return event
}

const powerStrife = (event, world) => {
    
}

/*  ENVIRONMENT  */

/**
 * 
 */
const badWeather = (event, world) => {

}

/**
 * 
 * @param {*} event 
 * @param {*} world 
 * @param {*} options 
 * @returns 
 */


/**
 * 
 * 
 * @param {Object} event event 
 * @param {Object} world 
 * @returns {Object} event
 */
const getHistoryEvent = (event, world, options) => {
    const i = getRandomNumber(1)
    switch(i) {
        case 1: event = raiders(event, world); break;
        case 2: event = questingKnight(event, world); break;
    }
    
    return event
}

/**
 * 
 * 
 * @param {Object} world 
 * @param {Object} output 
 * @param {ENUM_EVENT_TYPE} eventType 
 * @param {Obejct} options 
 * 
 * @returns {Object} event
 */
module.exports.build = (world, output, eventType, options) => {
    const e = copyObject(objects.event)
    e.output = output
    switch (eventType) {
        case ENUM_EVENT_TYPE.HISTORY: return getHistoryEvent(e, world)
    }

}

