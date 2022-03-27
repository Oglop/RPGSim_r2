const { DatabaseContext } = require('../connections')

module.exports.insertProduction = async (production) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO production (
        id,
        dwellingId,
        type,
        production
    ) 
    VALUES
    (
        @id,
        @dwellingId,
        @type,
        @production
    );`)
await stmt.bind({
    '@id': production.id,
    '@dwellingId': production.dwellingId,
    '@type': production.type,
    '@production': production.production
})
await stmt.run()
}