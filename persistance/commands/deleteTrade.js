const { DatabaseContext } = require('../connections')

module.exports.deleteTrade = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        trade 
    WHERE
        id = @id
    );`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}