const { DatabaseContext } = require('../connections')

module.exports.getRoomByCoordinates = async (x, y) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT 
            id,
            x, 
            y, 
            magicWind,
            elevation,
            temprature,
            biome,
            dwellingId,
            description,
            exploreStatus 
        FROM room 
        WHERE x = @x 
        AND y = @y ;`)
    await stmt.bind({
        '@x': x, 
        '@y': y
    })
    return await stmt.get()
}