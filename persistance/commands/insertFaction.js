const { DatabaseContext } = require('../connections')
module.exports.insertFaction = async (faction) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO faction (
        id,
        race,
        name,
        godId
    ) 
    VALUES
    (
        @id,
        @race,
        @name,
        @godId
    );`)
    await stmt.bind({
        '@id': faction.id,
        '@race': faction.race,
        '@name': faction.name,
        '@godId': faction.godId
    })
    await stmt.run()
}