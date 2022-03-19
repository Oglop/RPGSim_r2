const { DatabaseContext } = require('../connections')
const { dwelling } = require('../../generic/objects')

module.exports.getDwellingById = async (id) => {
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
        WHERE id = @id;`)
    await stmt.bind({
        '@id': id
    })
    const obj = await stmt.get()
    return { dwelling, ...obj }
}