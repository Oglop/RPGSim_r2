const { DatabaseContext } = require('../connections')

module.exports.deletePartyMember = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        partyMember   
    WHERE
        id = @id
    ;`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}