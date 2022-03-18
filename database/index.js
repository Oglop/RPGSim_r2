const { migrate } = require('./infrastructure/migrate')
const { insertRoom } = require('./commands/insertRoom')
const { updateRoom } = require('./commands/updateRoom')
const { getRoom } = require('./queries/getRoomByCoordinates')

module.exports = {
    commands: {
        insertRoom: (room) => insertRoom(room),
        updateRoom: (room) => updateRoom(room)
    },
    queries: {
        getRoomByCoordinates: (x, y) => getRoomByCoordinates(x, y)
    },
    infrastructure: {
        migrate: () => migrate()
    }
}