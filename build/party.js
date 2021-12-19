const objects = require('../generic/objects')
const characterBuilder = require('./character')
const equipmentBuilder = require('./equipment')
const { ENUM_JOB_NAMES, ENUM_QUEST_STATUS } = require('../generic/enums')
const { chance, copyObject, generateID, getRandomNumberInRange } = require('../lib/utils')
const { logError } = require('../data/errorFile')

/**
 * Builds party object
 * 
 * @param {Array} startingPoints
 * @param {object} options 
 * @returns {object} party
 */
module.exports.build = (startingPoints, options) => {
    const noOfMembers = (options.partySize) ? options.partySize : 6
    if (noOfMembers == 0) { noOfMembers = 1 } 
    const party = copyObject(objects.party)
    party.id = generateID()
    party.food = 0
    party.crowns = 0
    party.karma += getRandomNumberInRange(10,20)
    party.questStatus = ENUM_QUEST_STATUS.SEEK_QUEST

    for (let i = 0; i < noOfMembers; i++) {
        const character = characterBuilder.build()
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

    return party
}

