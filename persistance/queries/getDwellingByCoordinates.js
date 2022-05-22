const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')

module.exports.getDwellingByCoordinates = async (x, y) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT 
            id, 
            x, 
            y,
            name,
            description,
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
        AND y = @y;`)
    await stmt.bind({
        '@x': x, 
        '@y': y
    })
    const obj = await stmt.get()
    const dwelling = copyObject(objects.dwelling)
    return { ...dwelling, ...obj }
}