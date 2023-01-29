const { DatabaseContext } = require('../connections')
module.exports.insertPartyRumor = async (partyRumor) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO partyRumor (
        partyId,
        rumorId
    ) 
    VALUES
    (
        @partyId,
        @rumorId
    );`)
    await stmt.bind({
        '@partyId': partyRumor.partyId,
        '@rumorId': partyRumor.rumorId
    })
    await stmt.run()
}