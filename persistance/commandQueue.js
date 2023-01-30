
const { ENUM_COMMANDS } = require('../generic/enums')
const commands = require('.').commands
const aggregates = require('.').aggregates
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')

/**
 * 
 * @param {{command: ENUM_COMMANDS, data: { }}} queue 
 */
const executeCommands = async (queue) => {
    if (!(queue instanceof Array)) {
        const o = JSON.parse(JSON.stringify(queue))
        queue = [o]
    }
    for (let item of queue) {
        try {
            switch (item.command) {
                case ENUM_COMMANDS.DELETEADVISOR: await commands.deleteAdvisor(item.data); break;
                case ENUM_COMMANDS.DELETECHARACTER: await commands.deleteCharacter(item.data); break;
                case ENUM_COMMANDS.DELETE_TROOP : await commands.deleteTroop(item.data); break;
                case ENUM_COMMANDS.DELETE_QUEST: await commands.deleteQuest(item.data); break;
                case ENUM_COMMANDS.DELETE_PARTY: await commands.deleteParty(item.data); break;
                case ENUM_COMMANDS.DELETE_PARTY_MEMBER: await commands.deletePartyMember(item.data); break;
                case ENUM_COMMANDS.DELETE_RUMOR: await commands.deleteRumor(item.data); break;
                case ENUM_COMMANDS.DELETE_PARTY_RUMOR: await commands.deletePartyRumor(item.data); break;
                case ENUM_COMMANDS.DELETE_DWELLING_RUMOR: await commands.deleteDwellingRumor(item.data); break;
                case ENUM_COMMANDS.INSERTROOM: await commands.insertRoom(item.data); break;
                case ENUM_COMMANDS.INSERTDWELLING: await commands.insertDwelling(item.data); break;
                case ENUM_COMMANDS.INSERT_DWELLING_LOCATION: await commands.insertDwellingLocation(item.data); break;
                case ENUM_COMMANDS.INSERT_DWELLING_RUMOR: await commands.insertDwellingRumor(item.data); break;
                case ENUM_COMMANDS.INSERTCHARACTER: await commands.insertCharacter(item.data); break;
                case ENUM_COMMANDS.INSERTWORLD: await commands.insertWorld(item.data); break;
                case ENUM_COMMANDS.INSERTCOURT: await commands.insertCourt(item.data); break;
                case ENUM_COMMANDS.INSERTADVISOR: await commands.insertAdvisor(item.data); break;
                case ENUM_COMMANDS.INSERTLANGUAGE: await commands.insertLanguage(item.data); break;
                case ENUM_COMMANDS.INSERTSKILL: await commands.insertSkill(item.data); break;
                case ENUM_COMMANDS.INSERT_STORY: await commands.insertStory(item.data); break;
                case ENUM_COMMANDS.INSERTRELATION: await commands.insertRelation(item.data); break;
                case ENUM_COMMANDS.INSERTPRODUCTION: await commands.insertProduction(item.data); break;
                case ENUM_COMMANDS.INSERTARMY: await commands.insertArmy(item.data); break;
                case ENUM_COMMANDS.INSERTTROOP: await commands.insertTroop(item.data); break;
                case ENUM_COMMANDS.INSERTLOAN: await commands.insertLoan(item.data); break;
                case ENUM_COMMANDS.INSERT_NPC: await commands.insertNpc(item.data); break;
                case ENUM_COMMANDS.INSERT_TRADE: await commands.insertTrade(item.data); break;
                case ENUM_COMMANDS.INSERT_QUEST: await commands.insertQuest(item.data); break;
                case ENUM_COMMANDS.INSERT_PARTY: await commands.insertParty(item.data); break;
                case ENUM_COMMANDS.INSERT_PARTY_MEMBER: await commands.insertPartyMember(item.data); break;
                case ENUM_COMMANDS.INSERT_RUMOR: await commands.insertRumor(item.data); break;
                case ENUM_COMMANDS.INSERT_PARTY_RUMOR: await commands.insertPartyRumor(item.data); break;
                case ENUM_COMMANDS.UPDATEROOM: await commands.updateRoom(item.data); break;
                case ENUM_COMMANDS.UPDATEDWELLING: await commands.updateDwelling(item.data); break;
                case ENUM_COMMANDS.UPDATE_DWELLING_LOCATION: await commands.updateDwellingLocationStatus(item.data); break;
                case ENUM_COMMANDS.UPDATECHARACTER: await commands.updateCharacter(item.data); break;
                case ENUM_COMMANDS.UPDATEWORLDDATE: await commands.updateWorldDate(item.data); break;
                case ENUM_COMMANDS.UPDATELANGUAGEMASTERY: await commands.updateLanguageMastery(item.data); break;
                case ENUM_COMMANDS.UPDATERELATIONPOINTS: await commands.updateRelationPoints(item.data); break;
                case ENUM_COMMANDS.UPDATEPRODUCTION: await commands.updateProduction(item.data); break;
                case ENUM_COMMANDS.UPDATETROOP: await commands.updateTroop(item.data); break;
                case ENUM_COMMANDS.UPDATELOAN: await commands.updateLoan(item.data); break;
                case ENUM_COMMANDS.UPDATERULERINCOURT: await commands.updateRulerInCourt(item.data); break;
                case ENUM_COMMANDS.UPDATE_QUEST: await commands.updateQuest(item.data); break;
                case ENUM_COMMANDS.UPDATE_SKILL: await commands.updateSkill(item.data); break;
                case ENUM_COMMANDS.UPDATE_RUMOR: await commands.updateRumor(item.data); break;
                case ENUM_COMMANDS.SAVE_PARTY: await aggregates.saveParty(item.data); break;
                default: throw Error(`command ${item.command} was not found.`)
            }
        } catch (e) {
            console.log(e.stack)
            const err = objects.error
            err.file = __filename
            err.function = 'executeCommands'
            err.message = e.message
            logError(err)
        }
    }
}

module.exports = {
    executeCommands
}