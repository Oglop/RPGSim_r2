const { DatabaseContext } = require('../connections')

module.exports.insertGod = async (god) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO god (
        id,
        name,
        profile,
        symbol
    ) 
    VALUES
    (
        @id,
        @name,
        @profile,
        @symbol
    );`)
    await stmt.bind({
        '@id': god.id,
        '@name': god.name,
        '@profile': god.profile,
        '@symbol': god.symbol
    })
    await stmt.run()
}