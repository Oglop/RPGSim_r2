const { DatabaseContext } = require('../connections')
module.exports.updateRoom = async (room) => {
    await DatabaseContext.db.run('update room set (x,y) values(1,2);')//, room.x, room.y 
}