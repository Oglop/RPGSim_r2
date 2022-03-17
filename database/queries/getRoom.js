const { DatabaseContext } = require('../connections')

module.exports.getRoom = async () => {
    const room = await DatabaseContext.db.get("SELECT x, y FROM room")
    return room
    
}