const { DatabaseContext } = require('../connections')

module.exports.getPartyRumorByPartyId = async (partyId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            partyId,
            rumorId
        FROM
            partyRumor
        WHERE
                partyId = @partyId;
    `)

    const tmp = await stmt.all({
        '@partyId': partyId,
    })
    return tmp
}