const { migrate } = require('./infrastructure/migrate')

const { insertRoom } = require('./commands/insertRoom')
const { insertDwelling } = require('./commands/insertDwelling')
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

const { updateRoom } = require('./commands/updateRoom')
const { updateDwelling } = require('./commands/updateDwelling')
const { updateCharacter } = require('./commands/updateCharacter')
const { updateWorldDate } = require('./commands/updateWorldDate')
const { updateLanguageMastery } = require('./commands/updateLanguageMastery')
const { updateRelationPoints } = require('./commands/updateRelationPoints')
const { updateProduction } = require('./commands/updateProduction')
const { updateTroop } = require('./commands/updateTroop')

const { getCharacterById } = require('./queries/getCharacterById')
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

module.exports = {
    commands: {
        insertArmy: (army) => insertArmy(army),
        insertAdvisor: (advisor) => insertAdvisor(advisor),
        insertCharacter: (character) => insertCharacter(character),
        insertCourt: (court) => insertCourt(court),
        insertDwelling: (dwelling) => insertDwelling(dwelling),
        insertProduction: (production) => insertProduction(production),
        insertLanguage: (language) => insertLanguage(language),
        insertRelation: (relation) => insertRelation(relation),
        insertRoom: (room) => insertRoom(room),
        insertSkill: (skill) => insertSkill(skill),
        insertWorld: (world) => insertWorld(world),
        insertTroop: (troop) => insertTroop(troop),
        updateCharacter: (character) => updateCharacter(character),
        updateDwelling: (dwelling) => updateDwelling(dwelling),
        updateProduction: (dwelling) => updateProduction(dwelling),
        updateLanguageMastery: (language) => updateLanguageMastery(language),
        updateRelationPoints: (relation) => updateRelationPoints(relation),
        updateRoom: (room) => updateRoom(room),
        updateTroop: (troop) => updateTroop(troop),
        updateWorldDate: (world) => updateWorldDate(world)
    },
    queries: {
        getArmyByDwellingId: (dwellingId) => getArmyByDwellingId(dwellingId),
        getAdvisorsByCourtId: (id) => getAdvisorsByCourtId(id),
        getCharacterById: (id) => getCharacterById(id),
        getCourtByDwellingId: (id) => getCourtByDwellingId(id),
        getDwellingByCoordinates: (x, y) => getDwellingByCoordinates(x, y),
        getDwellingIdsFromRoom: () => getDwellingIdsFromRoom(),
        getDwellingById: (id) => getDwellingById(id),
        getProductionsByDwellingId: (dwellingId) => getProductionsByDwellingId(dwellingId),
        getLanguageByCharacterId: (id) => getLanguageByCharacterId(id),
        getRelationByCharacterId: (characterId) => getRelationByCharacterId(characterId),
        getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y),
        getSkillByCharacterId: (id) => getSkillByCharacterId(id),
        getTroopsByArmyId: (armyId) => getTroopsByArmyId(armyId),
        getWorldById: (id) => getWorldById(id)
    },
    infrastructure: {
        migrate: () => migrate()
    }
}
