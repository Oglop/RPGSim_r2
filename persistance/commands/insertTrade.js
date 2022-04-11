const { DatabaseContext } = require('../connections')

module.exports.insertTrade = async (dwellingTrade) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO trade (
        id,
        dwellingId,
        partnerId,
        value
    ) 
    VALUES
    (
        @id,
        @dwellingId,
        @partnerId,
        @value
    );`)
    await stmt.bind({
        '@id': dwellingTrade.id,
        '@dwellingId': dwellingTrade.dwellingId,
        '@partnerId': dwellingTrade.name,
        '@value': dwellingTrade.type
    })
    await stmt.run()
}