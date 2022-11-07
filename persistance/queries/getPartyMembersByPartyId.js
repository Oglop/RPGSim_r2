const { DatabaseContext } = require('../connections')

module.exports.getPartyMembersByPartyId = async (partyId) => {
    const stmt = await DatabaseContext.db.prepare(`
    SELECT
        id,
        partyId,
        characterId
    FROM
        partyMember
    WHERE
        partyId = @partyId;
    `)

    const tmp = await stmt.all({
        '@partyId': partyId,
    })
    return tmp
}