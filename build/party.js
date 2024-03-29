const objects = require('../generic/objects')
const characterBuilder = require('./character')
const equipmentBuilder = require('./equipment')
const { ENUM_JOB_NAMES, ENUM_QUEST_STATUS } = require('../generic/enums')
const { copyObject, generateID, getRandomNumberInRange } = require('../lib/utils')
const { logError } = require('../data/errorFile')
const { get } = require('../localization')
const { partySize } = require('../config')
const m = require('../models/party')

const { executeCommands } = require('../persistance/commandQueue')
const { getStoryEntry } = require('../build/story')
const { ENUM_COMMANDS, ENUM_STORY_TYPE, ENUM_STORY_TAGS } = require('../generic/enums')
const { getPartyName } = require('../generic/names')

/**
 * Builds party object
 * 
 * @param {object} options {
 *  startingPoints* Array
 *  partySize* int
 * }
 * @returns {object} party
 */
module.exports.build = async (options = {}) => {
    const commands = []
    const noOfMembers = (options.partySize) ? options.partySize : partySize
    if (noOfMembers == 0) { noOfMembers = 1 } 
    const party = copyObject(objects.party)
    party.id = generateID()
    party.food = 0
    party.crowns = 0
    party.karma += getRandomNumberInRange(10,20)
    party.questStatus = ENUM_QUEST_STATUS.SEEK_QUEST

    for (let i = 0; i < noOfMembers; i++) {
        const character = characterBuilder.build({
            date: options.date
        })
        equipmentBuilder.equipCharacter(character)
        party.members.push(character)

    }
    for (let i = 0; i < noOfMembers; i++) {
        if (party.members[i].job == ENUM_JOB_NAMES.cleric) {
            party.food += getRandomNumberInRange(2,4)
            party.crowns += getRandomNumberInRange(3,6)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.fighter) {
            
            party.food += getRandomNumberInRange(3,6)
            party.crowns += getRandomNumberInRange(3,6)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.knight) {
            party.food += getRandomNumberInRange(2,4)
            party.crowns += getRandomNumberInRange(6,9)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.monk) {
            party.karma += getRandomNumberInRange(5,10)
            party.food += getRandomNumberInRange(3,5)
            party.crowns += getRandomNumberInRange(1,3)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.noble) {
            party.food += getRandomNumberInRange(2,4)
            party.crowns += getRandomNumberInRange(6,10)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.peseant) {
            party.food += getRandomNumberInRange(5,8)
            party.crowns += getRandomNumberInRange(1,3)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.ranger) {
            party.food += getRandomNumberInRange(6,10)
            party.crowns += getRandomNumberInRange(1,3)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.rouge) {
            party.food += getRandomNumberInRange(2,5)
            party.crowns += getRandomNumberInRange(3,5)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.thief) {
            party.food += getRandomNumberInRange(2,4)
            party.crowns += getRandomNumberInRange(3,9)
        }
        if (party.members[i].job == ENUM_JOB_NAMES.wizard) {
            party.food += getRandomNumberInRange(2,4)
            party.crowns += getRandomNumberInRange(5,9)
        }
    }
    party.name = getPartyName(party.members[0].name)
    party.position.x = -1
    party.position.y = -1

    commands.push({
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-adventure-party-formed', [ party.name ]), party.id, ENUM_STORY_TYPE.ADVENTURE, { tag: ENUM_STORY_TAGS.HEADER_3 })
    })

    for (let i = 0; i < party.members.length; i++) {
        commands.push({
            command: ENUM_COMMANDS.INSERT_STORY,
            data: getStoryEntry(get('story-adventure-part-member', [ party.members[i].name, party.members[i].race, party.members[i].job, party.members[i].description ]), party.id, ENUM_STORY_TYPE.ADVENTURE, { tag: ENUM_STORY_TAGS.PARAGRAPH })
        })
    }
    await executeCommands(commands)
    return party
}

