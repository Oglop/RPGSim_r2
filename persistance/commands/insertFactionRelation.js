const { DatabaseContext } = require('../connections')
module.exports.insertFactionRelation = async (factionRelation) => {


    const stmt = await DatabaseContext.db.prepare(`INSERT INTO faction (
        id,
        factionId,
        relationFactionId,
        status
    ) 
    VALUES
    (
        @id,
        @factionId,
        @relationFactionId,
        @status
    );`)
    await stmt.bind({
        '@id': factionRelation.id,
        '@factionId': factionRelation.factionId,
        '@relationFactionId': factionRelation.relationFactionId,
        '@status': factionRelation.status
    })
    await stmt.run()
}