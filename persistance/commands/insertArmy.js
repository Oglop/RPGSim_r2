const { DatabaseContext } = require('../connections')

module.exports.insertArmy = async (army) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO army (
        id,
        dwellingId,
        name
    ) 
    VALUES
    (
        @id,
        @dwellingId,
        @name
    );`)
    await stmt.bind({
        '@id': army.id,
        '@dwellingId': army.dwellingId,
        '@name': army.name
    })
    await stmt.run()
}