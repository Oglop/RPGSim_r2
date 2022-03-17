const { DatabaseContext } = require('../connections')

module.exports.getRoom = async (x, y) => {
    //const room = await DatabaseContext.db.get("SELECT x, y FROM room")
    const stmt = await DatabaseContext.db.prepare(`
        SELECT 
            id,
            x, 
            y, 
            magicWind,
            elevation,
            temprature,
            biome,
            dwelling,
            description,
            exploreStatus 
        FROM room 
        WHERE x = @x 
        AND y = @y ;`)
    stmt.bind({
        '@x': x, 
        '@y': y
    })
    return await stmt.get()


    return room
    
}