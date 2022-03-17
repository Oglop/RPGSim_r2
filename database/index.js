const { migrate } = require('./infrastructure/migrate')
const { insertRoom } = require('./commands/insertRoom')
const { updateRoom } = require('./commands/updateRoom')
const { getRoom } = require('./queries/getRoom')

module.exports = {
    commands: {
        insertRoom: (room) => insertRoom(room),
        updateRoom: (room) => updateRoom(room)
    },
    queries: {
        getRoom: () => getRoom()
    },
    infrastructure: {
        migrate: () => migrate()
    }
}