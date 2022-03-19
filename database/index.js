const { migrate } = require('./infrastructure/migrate')
const { insertRoom } = require('./commands/insertRoom')
const { insertDwelling } = require('./commands/insertDwelling')
const { updateRoom } = require('./commands/updateRoom')
const { updateDwelling } = require('./commands/updateDwelling')
const { getRoomByCoordinates } = require('./queries/getRoomByCoordinates')
const { getDwellingByCoordinates } = require('./queries/getDwellingByCoordinates')
const { getDwellingById } = require('./queries/getDwellingById')
const { insertCharacter } = require('./commands/insertCharacter')

module.exports = {
    commands: {
        insertCharacter: (character) => insertCharacter(character),
        insertRoom: (room) => insertRoom(room),
        insertDwelling: (dwelling) => insertDwelling(dwelling),
        updateRoom: (room) => updateRoom(room),
        updateDwelling: (dwelling) => updateDwelling(dwelling)
    },
    queries: {
        getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y),
        getDwellingByCoordinates: (x, y) => getDwellingByCoordinates(x, y),
        getDwellingById: (id) => getDwellingById(id)
    },
    infrastructure: {
        migrate: () => migrate()
    }
}