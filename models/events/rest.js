const { copyObject, chance, getRandomNumber, getRandomElementFromArray } = require('../../lib/utils')
const objects = require('../../generic/objects')
const { checkPartySkill, checkCharacterStat } = require('../../models/skill')
const { 
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
    ENUM_PERSONALITIES,
    ENUM_SEASONS
} = require('../../generic/enums')
const { getDwellingsFromMap } = require('../../models/map')

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


const story = (event, world, party, options) => { 
    
    const i1 = copyObject(objects.eventItem)
    i1.description = get('event-rest-story-description', [storyTeller.name])

    i1.execute = () => {
        const storyTeller = getRandomElementFromArray(party.members)
        const successes = checkCharacterStat(storyTeller, ENUM_STAT_NAMES.cha)
        if (successes.length) {
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

const darkNight = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const seasonalEffect = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const deepSleep = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const argument = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const coldNight = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const weaponPractice = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const travelers = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const hunting = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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

const dreams = (event, world, party, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.description = get('')
    i1.execute = () => {
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
    coldNight,
    argument,
    weaponPractice,
    travelers,
    hunting,
    dreams
}