const { DatabaseContext } = require('../connections')

module.exports.insertCourt = async (court) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO court (
        id,
        dwellingId,
        rulerId
    ) 
    VALUES
    (
        @id,
        @dwellingId,
        @rulerId
    );`)
    await stmt.bind({
        '@id': court.id,
        '@dwellingId': court.dwellingId,
        '@rulerId': court.rulerId
    })
    await stmt.run()
}