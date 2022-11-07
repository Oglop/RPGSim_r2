const { DatabaseContext } = require('../connections')

module.exports.getPartyMemberByCharacterId = async (characterId) => {
    const stmt = await DatabaseContext.db.prepare(`
    SELECT
        id,
        partyId,
        characterId
    FROM
        partyMember
    WHERE
        characterId = @characterId;
    `)

    const tmp = await stmt.get({
        '@characterId': characterId,
    })
    return tmp
}