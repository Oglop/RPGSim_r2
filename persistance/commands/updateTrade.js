const { DatabaseContext } = require('../connections')

module.exports.updateTrade = async (trade) => {
    const stmt = await DatabaseContext.db.prepare(`
    UPDATE 
        trade 
    SET
        value = @value,
    WHERE
        id = @id;`)
    await stmt.bind({
        '@value': trade.value,
        '@id': trade.id
    })
    await stmt.run()
}