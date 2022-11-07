const { DatabaseContext } = require('../connections')

module.exports.insertPartyMember = async data => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO partyMember (
        id,
        partyId,
        characterId
    ) 
    VALUES
    (
        @id,
        @partyId,
        @characterId
    );`)
await stmt.bind({
    '@id': data.id,
    '@partyId': data.partyId,
    '@characterId': data.characterId
})
await stmt.run()
}