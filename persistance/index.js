const { migrate } = require('./infrastructure/migrate')

const { loadParty, saveParty } = require('./aggregates/party')

const { deleteAdvisor } = require('./commands/deleteAdvisor')
const { deleteCharacter } = require('./commands/deleteCharacter')
const { deleteTrade } = require('./commands/deleteTrade')
const { deleteTroop } = require('./commands/deleteTroop')
const { deleteQuest } = require('./commands/deleteQuest')
const { deleteParty } = require('./commands/deleteParty')
const { deletePartyMember } = require('./commands/deletePartyMember')
const { deleteRumor } = require('./commands/deleteRumor')
const { deleteDwellingRumor } = require('./commands/deleteDwellingRumor')
const { deletePartyRumor } = require('./commands/deletePartyRumor')
const { deleteItem } = require('./commands/deleteItem')

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
const { insertQuest } = require('./commands/insertQuest')
const { insertParty } = require('./commands/insertParty')
const { insertPartyMember } = require('./commands/insertPartyMember')
const { insertRumor } = require('./commands/insertRumor')
const { insertDwellingRumor } = require('./commands/insertDwellingRumor')
const { insertPartyRumor } = require('./commands/insertPartyRumor')
const { insertItem } = require('./commands/insertItem')

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
const { updateQuest } = require('./commands/updateQuest')
const { updateParty } = require('./commands/updateParty')
const { updateSkill } = require('./commands/updateSkill')
const { updateRumor } = require('./commands/updateRumor')
const { updateItem } = require('./commands/updateItem')

const { getCharacterById } = require('./queries/getCharacterById')
const { getDwellingLocationsByDwellingId } = require('./queries/getDwellingLocationsByDwellingId')
//const { getRoomByCoordinates } = require('./queries/getRoomByCoordinates')
const { getDwellingByCoordinates } = require('./queries/getDwellingByCoordinates')
const { getDwellingIdsFromRoom } = require('./queries/getDwellingIdsFromRoom')
const { getDwellingById } = require('./queries/getDwellingById')
const { getDwellingRumorsByDwellingId } = require('./queries/getDwellingRumorsByDwellingId')
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
const { getQuestById } = require('./queries/getQuestById')
const { getRumorById } = require('./queries/getRumorById')
const { getItemById } = require('./queries/getItemById')
//const { quest } = require('../generic/objects')
//const { getPartyById } = require('./queries/getPartyById')
const { getPartyMembersByPartyId } = require('./queries/getPartyMembersByPartyId')
const { getPartyRumorByPartyId } = require('./queries/getPartyRumorByPartyId')
const { getPartyMemberByCharacterId } = require('./queries/getPartyMemberByCharacterId')

//const { listParties } = require('./queries/listParties')

module.exports = {
    commands: {
        deleteAdvisor: (id) => deleteAdvisor(id),
        deleteCharacter: (id) => deleteCharacter(id),
        deleteTrade: (id) => deleteTrade(id),
        deleteTroop: (id) => deleteTroop(id),
        deleteQuest: (id) => deleteQuest(id),
        deleteParty: (id) => deleteParty(id),
        deletePartyMember: (id) => deletePartyMember(id),
        deleteRumor: (id) => deleteRumor(id),
        deleteDwellingRumor: (rumorId) => deleteDwellingRumor(rumorId),
        deletePartyRumor: (rumorId) => deletePartyRumor(rumorId),
        deleteItem: (id) => deleteItem(id),

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
        insertQuest: (quest) => insertQuest(quest),
        insertParty: (party) => insertParty(party),
        insertPartyMember: (data) => insertPartyMember(data),
        insertRumor: (data) => insertRumor(data),
        insertDwellingRumor: (dwellingRumor) => insertDwellingRumor(dwellingRumor),
        insertPartyRumor: (partyRumor) => insertPartyRumor(partyRumor),
        insertItem: (item) => insertItem(item),

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
        updateWorldDate: (world) => updateWorldDate(world),
        updateQuest: (quest) => updateQuest(quest),
        updateParty: (party) => updateParty(party),
        updateSkill: (skill) => updateSkill(skill),
        updateRumor: (rumor) => updateRumor(rumor),
        updateItem: (item) => updateItem(item),
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
        getRumorById: (id) => getRumorById(id),
        //getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y),
        getSkillByCharacterId: (id) => getSkillByCharacterId(id),
        getStory: () => getStory(),
        getTradeByDwellingId: (id) => getTradeByDwellingId(id),
        getTroopsByArmyId: (armyId) => getTroopsByArmyId(armyId),
        getWorldById: (id) => getWorldById(id),
        getQuestById: (id) => getQuestById(id),
        //getPartyById: (id) => getPartyById(id),
        getPartyMembersByPartyId: (partyId) => getPartyMembersByPartyId(partyId),
        getPartyMemberByCharacterId: (characterId) => getPartyMemberByCharacterId(characterId),
        getPartyRumorByPartyId: (partyId) => getPartyRumorByPartyId(partyId),
        getDwellingRumorsByDwellingId: (dwellingId) => getDwellingRumorsByDwellingId(dwellingId),
        getItemById: (id) => getItemById(id)
        //listParties: () => listParties()
    },
    aggregates: {
        loadParty: (id) => loadParty(id),
        saveParty: (party) => saveParty(party)
    },
    infrastructure: {
        migrate: () => migrate()
    }
}
