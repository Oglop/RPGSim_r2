const { copyObject, chance, getRandomNumber, getRandomElementFromArray, getRandomNumberInRange } = require('../../lib/utils')
const objects = require('../../generic/objects')
const { checkPartySkill, checkCharacterStat } = require('../../models/skill')
const { 
    ENUM_SEASONS,
    ENUM_EVENT_ITEM_STATUS
} = require('../../generic/enums')
const mCharacter = require('../../models/character')
const { get } = require('../../localization')
const { Output } = require('../../output/output')


const bloodMoon = (event, world, options) => { 
    const i1 = copyObject(objects.eventItem)
    i1.execute = (party) => {
        i1.description = get('event-date-bloodmoon-description')
        i1.resolution = ENUM_EVENT_ITEM_STATUS.RESOLVED
        i1.resolutionText = get('event-date-bloodmoon-resolution')
    }
    event.items.push(i1)
    return event
}

module.exports = {
    bloodMoon
}
