const { migrate } = require('./infrastructure/migrate')
const { insertRoom } = require('./commands/insertRoom')
const { insertDwelling } = require('./commands/insertDwelling')
const { updateRoom } = require('./commands/updateRoom')
const { updateDwelling } = require('./commands/updateDwelling')
const { getRoomByCoordinates } = require('./queries/getRoomByCoordinates')
const { getDwellingByCoordinates } = require('./queries/getDwellingByCoordinates')
const { getDwellingById } = require('./queries/getDwellingById')
const { insertCharacter } = require('./commands/insertCharacter')
const { updateCharacter } = require('./commands/updateCharacter')
const { insertWorld } = require('./commands/insertWorld')
const { updateWorldDate } = require('./commands/updateWorldDate')
const { getWorldById } = require('./queries/getWorldById')

module.exports = {
    commands: {
        insertCharacter: (character) => insertCharacter(character),
        insertRoom: (room) => insertRoom(room),
        insertDwelling: (dwelling) => insertDwelling(dwelling),
        insertWorld: (world) => insertWorld(world),
        updateCharacter: (character) => updateCharacter(character),
        updateRoom: (room) => updateRoom(room),
        updateDwelling: (dwelling) => updateDwelling(dwelling),
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