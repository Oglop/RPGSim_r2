const { DatabaseContext } = require('../connections')
const { dwelling } = require('../../generic/objects')

module.exports.getDwellingById = async (x, y) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT 
            id, 
            x, 
            y,
            name,
            type,
            size,
            citizens,
            gold,
            food,
            taxRate,
            happiness,
            gate,
            walls,
            moats,
            guards 
        FROM dwelling 
        WHERE x = @x 
        AND y = @y ;`)
    await stmt.bind({
        '@x': x, 
        '@y': y
    })
    const obj = await stmt.get()
    return { dwelling, ...obj }
}