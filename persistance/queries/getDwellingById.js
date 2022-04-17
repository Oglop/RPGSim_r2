const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')

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
            citizenTaxable,
            gold,
            food,
            growth,
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
    const tmp = await stmt.get()
    const dwelling = copyObject(objects.dwelling)
    return { ...dwelling, ...tmp }
}