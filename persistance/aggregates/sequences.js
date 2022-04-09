
const { ENUM_COMMANDS } = require('../../generic/enums')
const commands = require('../index').commands
const { logError } = require('../../data/errorFile')
const objects = require('../../generic/objects')

const executeCommands = async (queue) => {
    if (typeof queue === 'object') {
        const o = JSON.parse(JSON.stringify(queue))
        queue = [o]
    }
    for (let item of queue) {
        try {
            switch (item.command) {
                case ENUM_COMMANDS.DELETEADVISOR: await commands.deleteAdvisor(item.data); break;
                case ENUM_COMMANDS.DELETECHARACTER: await commands.deleteCharacter(item.data); break;
                case ENUM_COMMANDS.INSERTROOM: await commands.insertRoom(item.data); break;
                case ENUM_COMMANDS.INSERTDWELLING: await commands.insertDwelling(item.data); break;
                case ENUM_COMMANDS.INSERT_DWELLING_LOCATION: await commands.insertDwellingLocation(item.data); break;
                case ENUM_COMMANDS.INSERTCHARACTER: await commands.insertCharacter(item.data); break;
                case ENUM_COMMANDS.INSERTWORLD: await commands.insertWorld(item.data); break;
                case ENUM_COMMANDS.INSERTCOURT: await commands.insertCourt(item.data); break;
                case ENUM_COMMANDS.INSERTADVISOR: await commands.insertAdvisor(item.data); break;
                case ENUM_COMMANDS.INSERTLANGUAGE: await commands.insertLanguage(item.data); break;
                case ENUM_COMMANDS.INSERTSKILL: await commands.insertSkill(item.data); break;
                case ENUM_COMMANDS.INSERTRELATION: await commands.insertRelation(item.data); break;
                case ENUM_COMMANDS.INSERTPRODUCTION: await commands.insertProduction(item.data); break;
                case ENUM_COMMANDS.INSERTARMY: await commands.insertArmy(item.data); break;
                case ENUM_COMMANDS.INSERTTROOP: await commands.insertTroop(item.data); break;
                case ENUM_COMMANDS.INSERTLOAN: await commands.insertLoan(item.data); break;
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
            }
        } catch (e) {
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