const { DatabaseContext } = require('../connections')

module.exports.getPartyMemberByCharacterId = async (characterId) => {
    console.log(`--------------- characterId ${characterId}`)
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
    console.log(`---------------  ${JSON.stringify(tmp)}`)
    return tmp
}