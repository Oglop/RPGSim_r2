const { DatabaseContext } = require('../connections')

module.exports.updateTroop = async (troop) => {
    const stmt = await DatabaseContext.db.prepare(`
        UPDATE 
            troop 
        SET 
            name = @name,
            power = @power,
            number = @number
        WHERE
            id = @id;`)
    await stmt.bind({
        '@id': troop.id,
        '@name': troop.name,
        '@power': troop.power,
        '@number': troop.number
    })
    await stmt.run()
}