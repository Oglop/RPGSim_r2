const { copyObject, chance, getRandomNumber, getRandomElementFromArray, getRandomNumberInRange } = require('../../lib/utils')
const objects = require('../../generic/objects')
const { checkPartySkill, checkCharacterStat } = require('../skill')
const { 
    ENUM_SEASONS,
    ENUM_STAT_NAMES,
    ENUM_SKILL_NAMES,
    ENUM_EVENT_TYPE, ENUM_ENEMY_STRENGTH, 
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
} = require('../../generic/enums')
const { getDwellingsFromMap } = require('../map')
const { partyExtraRelationshipRoll } = require('../personality')
const mCharacter = require('../character')
/*const { 
    getLeaderByDwellingId,
    getFamiliesByDwellingId,
    distributInfluence,
    getFamilyIdByCharacterId,
    getRandomAlivePerson } = require('../../models/family')
const { personalityDealsWith } = require('../../models/personality')
const { getSeason } = require('../../lib/time')
const { getPersonName } = require('../../generic/names')*/
const { get } = require('../../localization')
const { getSeason } = require('../../lib/time')
const { Output } = require('../../output/output')

const story = (event, world, options) => { 
    
    const i1 = copyObject(objects.eventItem)
    i1.execute = (party) => {
        const storyTeller = getRandomElementFromArray(party.members)
        const successes = checkCharacterStat(storyTeller, ENUM_STAT_NAMES.cha)
        i1.description = get('event-rest-story-description', [storyTeller.name])
        if (successes.length) {
            partyExtraRelationshipRoll(party, 1)
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('event-rest-story-success')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('event-rest-story-fail')
        }
    }
    event.items.push(i1)
    return event
}

const darkNight = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.execute = (party) => {
        const character = getRandomElementFromArray(party.members)
        i1.description = get('event-rest-darkNight-description', [ party.name ])
        if (1 == 1) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('')
        }
    }
    event.items.push(i1)
    return event
}

const seasonalEffect = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    const season = getSeason(world.date)
    const i = getRandomNumberInRange(0, 3)
    let dir = ''
    switch(i) {
        case 0: dir = get('dir-east'); break;
        case 1: dir = get('dir-north'); break;
        case 2: dir = get('dir-west'); break;
        case 3: dir = get('dir-south'); break;
    }
    i1.description = get('event-rest-season-description', [ party.name ])
    i1.execute = (party) => {
        if (season == ENUM_SEASONS.fall) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('event-rest-season-fall', [ dir ])
        } else if (season == ENUM_SEASONS.spring) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('event-rest-season-spring', [ dir ])
        } else if (season == ENUM_SEASONS.winter) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('event-rest-season-winter', [ dir ])
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('event-rest-season-summer', [ dir ])
        }
    }
    event.items.push(i1)
    return event
}

const deepSleep = (event, world, options) => { 
    const season = getSeason(world.date)
    const i1 = copyObject(objects.eventItem)
    i1.description = get('event-rest-deepsleep-description', [ season ])
    i1.execute = (party) => {
        const c = getRandomElementFromArray(party.members)
        mCharacter.restCharacter(c)
        i1.description = get('event-rest-deepsleep-description', [ season ])
        i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
        i1.resolutionText = get('event-rest-deepsleep-resolve', [ c.name ])
    }
    event.items.push(i1)
    return event
}

const argument = (event, world,  options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('event-rest-argument-description', [ party.name ])
    i1.execute = (party) => {
        const successes = checkPartySkill(party, ENUM_SKILL_NAMES.leadership)
        if (successes.length) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('event-rest-argument-success')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            const character = getRandomElementFromArray(party.members)
            for (let i = 0; i < character.relationships.length; i++) {
                character.relationships[i].points -= getRandomNumberInRange(1, 5)
            }
            i1.resolutionText = get('event-rest-argument-resolved')
        }
    }
    event.items.push(i1)
    return event
}

const eventlessNight = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('event-rest-eventless-description', [ party.name ])
    i1.execute = (party) => {
        i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
        i1.resolutionText = get('event-rest-eventless-success')
    }
    event.items.push(i1)
    return event
}

const weaponPractice = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = (party) => {
        
        if (1 == 1) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('')
        }
    }
    event.items.push(i1)
    return event
}

const travelers = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = (party) => {
        if (1 == 1) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('')
        }
    }
    event.items.push(i1)
    return event
}

const hunting = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = (party) => {
        if (1 == 1) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('')
        }
    }
    event.items.push(i1)
    return event
}

const dreams = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = (party) => {
        if (1 == 1) {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.SUCCESS
            i1.resolutionText = get('')
        } else {
            i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
            i1.resolutionText = get('')
        }
    }
    event.items.push(i1)
    return event
}

module.exports = {
    story,
    darkNight,
    seasonalEffect,
    deepSleep,
    eventlessNight,
    argument,
    weaponPractice,
    travelers,
    hunting,
    dreams
}