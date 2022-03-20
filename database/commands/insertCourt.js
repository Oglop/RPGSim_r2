const { DatabaseContext } = require('../connections')

module.exports.insertCourt = async (court) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO court (
        id,
        dwellingId,
        rulerId,
        coatOfArms
    ) 
    VALUES
    (
        @id,
        @dwellingId,
        @rulerId,
        @coatOfArms
    );`)
    await stmt.bind({
        '@id': court.id,
        '@dwellingId': court.dwellingId,
        '@rulerId': court.rulerId,
        '@coatOfArms': court.coatOfArms
    })
    await stmt.run()
}