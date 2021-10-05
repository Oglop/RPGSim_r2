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
    ENUM_PERSONALITIES,
    ENUM_SEASONS
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
    event.items.push(i1)

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
                i2.resolutionText = `${hero.name} is supprises a wild ${monster.name}. After a tough battle ${hero.name} defeats the beast.`
                i2.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            } else {
                i2.resolutionText = `${hero.name} is supprised by a wild ${monster.name}! The fight is over before it is started. ${hero.name} is killed.`
                i2.resolution = ENUM_EVENT_ITEM_STATUS.FAILURE
                event.active = false
            }
        }
    }
    event.items.push(i2)

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
    event.items.push(i3)
    return event
}

const powerStrife = (event, world) => {
    
}

/*  ENVIRONMENT  */

/**
 * 
 */
const badWeather = (event, world) => {
    const i1 = copyObject(objects.eventItem)
    const season = getSeason(world.date)
    const dwellings = getDwellingsFromMap(world.map)
    const dwelling = getRandomElementFromArray(dwellings)
    const leader =  getLeaderByDwellingId(world.families, dwelling.id)
    let adjust = 0
    if (season == ENUM_SEASONS.winter) {
        i1.description = `A blizzard burries ${dwelling.name} in snow.`
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.RESOLUTION)
        if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            adjust = 8
            i1.resolutionText = `${leader.name} organizes the towns people to dig out the vital functions of the town.`
        } else {
            adjust = -6
            i1.resolutionText = `${leader.name} fails to rally the people of ${dwelling.name} and some older citizens are lost in the cold.`
        }
        
    } else if (season == ENUM_SEASONS.summer) {
        i1.description = `A great thunder storm hits ${dwelling.name}. The food storage catches fire after lightning hits the roof`
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.INITIATIVE)
        if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            i1.resolutionText = `${leader.name} quickly rallies the people of ${dwelling.name} to put out the fire.`
            adjust = -8
        } else {
            i1.resolutionText = `After some time the fire burns out, lots of food are lost.`
            adjust = -10
        }

        i1.resolutionText = `Due to early initiative the ${monster.name} raiders are fought off, a great victory for ${leader.name}.`
    } else {
        i1.description = `A great storm hits ${dwelling.name} and causes the river banks to flood`
        const result = personalityDealsWith(leader.personality, ENUM_PERSONALITY_DEALS_TYPE.PREPERATIONS)
        if (result == ENUM_PERSONALITY_DEALS_RESULT.GOOD) {
            i1.resolutionText = `Carefull preperations leads the water away from the city.`
            adjust = 6
        } else {
            i1.resolutionText = `Water floods the streets of ${dwelling.name} destroying buildings.`
            adjust = -6
        }
    }
    i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
    const fams = getFamiliesByDwellingId(world.families, dwelling.id)
    distributInfluence(fams, undefined, adjust, leader.id)
    event.items.push(i1)
    return event
}

const plauge = (event, world) => {

}


/**
 * 
 * 
 * @param {Object} event event 
 * @param {Object} world 
 * @returns {Object} event
 */
const getHistoryEvent = (event, world, options) => {
    const i = getRandomNumber(3)
    switch(i) {
        case 1: event = raiders(event, world); break;
        case 2: event = questingKnight(event, world); break;
        case 3: event = badWeather(event, world); break;
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

