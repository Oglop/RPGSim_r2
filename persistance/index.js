const { migrate } = require('./infrastructure/migrate')


const { deleteAdvisor } = require('./commands/deleteAdvisor')
const { deleteCharacter } = require('./commands/deleteCharacter')
const { deleteTrade } = require('./commands/deleteTrade')
const { deleteTroop } = require('./commands/deleteTroop')

const { insertRoom } = require('./commands/insertRoom')
const { insertDwelling } = require('./commands/insertDwelling')
const { insertDwellingLocation } = require('./commands/insertDwellingLocation')


const { insertCharacter } = require('./commands/insertCharacter')
const { insertWorld } = require('./commands/insertWorld')
const { insertCourt } = require('./commands/insertCourt')
const { insertAdvisor } = require('./commands/insertAdvisor')
const { insertLanguage } = require('./commands/insertLanguage')
const { insertSkill } = require('./commands/insertSkill')
const { insertRelation } = require('./commands/insertRelation')
const { insertProduction } = require('./commands/insertProduction')
const { insertArmy } = require('./commands/insertArmy')
const { insertTroop } = require('./commands/insertTroop')
const { insertLoan } = require('./commands/insertLoan')
const { insertNpc } = require('./commands/insertNpc')
const { insertStory } = require('./commands/insertStory')
const { insertTrade } = require('./commands/insertTrade')


const { updateRoom } = require('./commands/updateRoom')
const { updateDwelling } = require('./commands/updateDwelling')
const { updateDwellingLocationStatus } = require('./commands/updateDwellingLocationStatus')
const { updateCharacter } = require('./commands/updateCharacter')
const { updateWorldDate } = require('./commands/updateWorldDate')
const { updateLanguageMastery } = require('./commands/updateLanguageMastery')
const { updateRelationPoints } = require('./commands/updateRelationPoints')
const { updateProduction } = require('./commands/updateProduction')
const { updateTroop } = require('./commands/updateTroop')
const { updateLoan } = require('./commands/updateLoan')
const { updateRulerInCourt } = require('./commands/updateRulerInCourt')
const { updateTrade } = require('./commands/updateTrade')

const { getCharacterById } = require('./queries/getCharacterById')
const { getDwellingLocationsByDwellingId } = require('./queries/getDwellingLocationsByDwellingId')
const { getRoomByCoordinates } = require('./queries/getRoomByCoordinates')
const { getDwellingByCoordinates } = require('./queries/getDwellingByCoordinates')
const { getDwellingIdsFromRoom } = require('./queries/getDwellingIdsFromRoom')
const { getDwellingById } = require('./queries/getDwellingById')
const { getLanguageByCharacterId } = require('./queries/getLanguageByCharacterId')
const { getWorldById } = require('./queries/getWorldById')
const { getSkillByCharacterId } = require('./queries/getSkillByCharacterId')
const { getAdvisorsByCourtId } = require('./queries/getAdvisorsByCourtId')
const { getCourtByDwellingId } = require('./queries/getCourtByDwellingId')
const { getRelationByCharacterId } = require('./queries/getRelationByCharacterId')
const { getProductionsByDwellingId } = require('./queries/getProductionsByDwellingId')
const { getArmyByDwellingId } = require('./queries/getArmyByDwellingId')
const { getTroopsByArmyId } = require('./queries/getTroopsByArmyId')
const { getLoansByCourtId } = require('./queries/getLoansByCourtId')
const { getNpcsByDwellingLocationId } = require('./queries/getNpcsByDwellingLocationId')
const { getStory } = require('./queries/getStory')
const { getTradeByDwellingId } = require('./queries/getTradeByDwellingId')

module.exports = {
    commands: {
        deleteAdvisor: (id) => deleteAdvisor(id),
        deleteCharacter: (id) => deleteCharacter(id),
        deleteTrade: (id) => deleteTrade(id),
        deleteTroop: (id) => deleteTroop(id),

        insertArmy: (army) => insertArmy(army),
        insertAdvisor: (advisor) => insertAdvisor(advisor),
        insertCharacter: (character) => insertCharacter(character),
        insertCourt: (court) => insertCourt(court),
        insertDwelling: (dwelling) => insertDwelling(dwelling),
        insertDwellingLocation: (dwelling) => insertDwellingLocation(dwelling),
        insertProduction: (production) => insertProduction(production),
        insertLanguage: (language) => insertLanguage(language),
        insertLoan: (loan) => insertLoan(loan),
        insertNpc: (npc) => insertNpc(npc),
        insertRelation: (relation) => insertRelation(relation),
        insertRoom: (room) => insertRoom(room),
        insertSkill: (skill) => insertSkill(skill),
        insertStory: (story) => insertStory(story),
        insertWorld: (world) => insertWorld(world),
        insertTrade: (trade) => insertTrade(trade),
        insertTroop: (troop) => insertTroop(troop),
        
        updateCharacter: (character) => updateCharacter(character),
        updateDwelling: (dwelling) => updateDwelling(dwelling),
        updateDwellingLocationStatus: (dwelling) => updateDwellingLocationStatus(dwelling),
        updateProduction: (dwelling) => updateProduction(dwelling),
        updateLanguageMastery: (language) => updateLanguageMastery(language),
        updateLoan: (loan) => updateLoan(loan),
        updateRelationPoints: (relation) => updateRelationPoints(relation),
        updateRoom: (room) => updateRoom(room),
        updateRulerInCourt: (court) => updateRulerInCourt(court),
        updateTrade: (trade) => updateTrade(trade),
        updateTroop: (troop) => updateTroop(troop),
        updateWorldDate: (world) => updateWorldDate(world)
    },
    queries: {
        getArmyByDwellingId: (dwellingId) => getArmyByDwellingId(dwellingId),
        getDwellingLocationsByDwellingId: (dwellingId) => getDwellingLocationsByDwellingId(dwellingId),
        getAdvisorsByCourtId: (id) => getAdvisorsByCourtId(id),
        getCharacterById: (id) => getCharacterById(id),
        getCourtByDwellingId: (id) => getCourtByDwellingId(id),
        getDwellingByCoordinates: (x, y) => getDwellingByCoordinates(x, y),
        getDwellingIdsFromRoom: () => getDwellingIdsFromRoom(),
        getDwellingById: (id) => getDwellingById(id),
        getProductionsByDwellingId: (dwellingId) => getProductionsByDwellingId(dwellingId),
        getLanguageByCharacterId: (id) => getLanguageByCharacterId(id),
        getLoansByCourtId: (courtId) => getLoansByCourtId(courtId),
        getNpcsByDwellingLocationId: (dwellingLocationId) => getNpcsByDwellingLocationId(dwellingLocationId),
        getRelationByCharacterId: (characterId) => getRelationByCharacterId(characterId),
        getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y),
        getSkillByCharacterId: (id) => getSkillByCharacterId(id),
        getStory: () => getStory(),
        getTradeByDwellingId: (id) => getTradeByDwellingId(id),
        getTroopsByArmyId: (armyId) => getTroopsByArmyId(armyId),
        getWorldById: (id) => getWorldById(id)
    },
    aggregates: {
        
    },
    infrastructure: {
        migrate: () => migrate()
    }
}
