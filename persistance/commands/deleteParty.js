const { DatabaseContext } = require('../connections')

module.exports.deleteParty = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        party    
    WHERE
        id = @id
    ;`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}