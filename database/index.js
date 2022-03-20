const { migrate } = require('./infrastructure/migrate')

const { insertRoom } = require('./commands/insertRoom')
const { insertDwelling } = require('./commands/insertDwelling')
const { insertCharacter } = require('./commands/insertCharacter')
const { insertWorld } = require('./commands/insertWorld')
const { insertCourt } = require('./commands/insertCourt')
const { insertAdvisor } = require('./commands/insertAdvisor')

const { updateRoom } = require('./commands/updateRoom')
const { updateDwelling } = require('./commands/updateDwelling')
const { updateCharacter } = require('./commands/updateCharacter')
const { updateWorldDate } = require('./commands/updateWorldDate')

const { getRoomByCoordinates } = require('./queries/getRoomByCoordinates')
const { getDwellingByCoordinates } = require('./queries/getDwellingByCoordinates')
const { getDwellingById } = require('./queries/getDwellingById')
const { getWorldById } = require('./queries/getWorldById')

module.exports = {
    commands: {
        insertAdvisor: (advisor) => insertAdvisor(advisor),
        insertCharacter: (character) => insertCharacter(character),
        insertCourt: (court) => insertCourt(court),
        insertDwelling: (dwelling) => insertDwelling(dwelling),
        insertRoom: (room) => insertRoom(room),
        insertWorld: (world) => insertWorld(world),
        updateCharacter: (character) => updateCharacter(character),
        updateDwelling: (dwelling) => updateDwelling(dwelling),
        updateRoom: (room) => updateRoom(room),
        updateWorldDate: (world) => updateWorldDate(world)
    },
    queries: {
        getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y),
        getDwellingByCoordinates: (x, y) => getDwellingByCoordinates(x, y),
        getDwellingById: (id) => getDwellingById(id),
        getWorldById: (id) => getWorldById(id)
    },
    infrastructure: {
        migrate: () => migrate()
    }
}