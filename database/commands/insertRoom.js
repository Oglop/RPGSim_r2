const { DatabaseContext } = require('../connections')
module.exports.insertRoom = async (room) => {
    await DatabaseContext.db.run('insert into room (x,y) values(1,2);')//, room.x, room.y 
}