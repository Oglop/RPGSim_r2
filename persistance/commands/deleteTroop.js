const { DatabaseContext } = require('../connections')

module.exports.deleteTroop = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        troop 
    WHERE
        id = @id;
    `)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}