const { DatabaseContext } = require('../connections')

module.exports.insertAdvisor = async (advisor) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO advisor (
        id,
        characterId,
        courtId
    ) 
    VALUES
    (
        @id,
        @characterId,
        @courtId
    );`)
    await stmt.bind({
        '@id': advisor.id,
        '@characterId': advisor.characterId,
        '@courtId': advisor.courtId
    })
    await stmt.run()
}