const { migrate } = require('./infrastructure/migrate')

const { insertRoom } = require('./commands/insertRoom')
const { insertDwelling } = require('./commands/insertDwelling')
const { insertCharacter } = require('./commands/insertCharacter')
const { insertWorld } = require('./commands/insertWorld')
const { insertCourt } = require('./commands/insertCourt')
const { insertAdvisor } = require('./commands/insertAdvisor')
const { insertLanguage } = require('./commands/insertLanguage')
const { insertSkill } = require('./commands/insertSkill')

const { updateRoom } = require('./commands/updateRoom')
const { updateDwelling } = require('./commands/updateDwelling')
const { updateCharacter } = require('./commands/updateCharacter')
const { updateWorldDate } = require('./commands/updateWorldDate')
const { updateLanguageMastery } = require('./commands/updateLanguageMastery')

const { getRoomByCoordinates } = require('./queries/getRoomByCoordinates')
const { getDwellingByCoordinates } = require('./queries/getDwellingByCoordinates')
const { getDwellingById } = require('./queries/getDwellingById')
const { getLanguageByCharacterId } = require('./queries/getLanguageByCharacterId')
const { getWorldById } = require('./queries/getWorldById')
const { getSkillByCharacterId } = require('./queries/getSkillByCharacterId')
const { getAdvisorsByCourtId } = require('./queries/getAdvisorsByCourtId')
const { getCourtByDwellingId } = require('./queries/getCourtByDwellingId')


module.exports = {
    commands: {
        insertAdvisor: (advisor) => insertAdvisor(advisor),
        insertCharacter: (character) => insertCharacter(character),
        insertCourt: (court) => insertCourt(court),
        insertDwelling: (dwelling) => insertDwelling(dwelling),
        insertLanguage: (language) => insertLanguage(language),
        insertRoom: (room) => insertRoom(room),
        insertSkill: (skill) => insertSkill(skill),
        insertWorld: (world) => insertWorld(world),
        updateCharacter: (character) => updateCharacter(character),
        updateDwelling: (dwelling) => updateDwelling(dwelling),
        updateLanguageMastery: (language) => updateLanguageMastery(language),
        updateRoom: (room) => updateRoom(room),
        updateWorldDate: (world) => updateWorldDate(world)
    },
    queries: {
        getAdvisorsByCourtId: (id) => getAdvisorsByCourtId(id),
        getCourtByDwellingId: (id) => getCourtByDwellingId(id),
        getDwellingByCoordinates: (x, y) => getDwellingByCoordinates(x, y),
        getDwellingById: (id) => getDwellingById(id),
        getLanguageByCharacterId: (id) => getLanguageByCharacterId(id),
        getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y),
        getSkillByCharacterId: (id) => getSkillByCharacterId(id),
        getWorldById: (id) => getWorldById(id)
    },
    infrastructure: {
        migrate: () => migrate()
    }
}