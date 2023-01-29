const { DatabaseContext } = require('../connections')

module.exports.deletePartyRumor = async (rumorId) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        partyRumor    
    WHERE
        rumorId = @rumorId
    );`)
    await stmt.bind({
        '@rumorId': rumorId
    })
    await stmt.run()
}