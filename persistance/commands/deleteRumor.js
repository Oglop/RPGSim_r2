const { DatabaseContext } = require('../connections')

module.exports.deleteRumor = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        rumor 
    WHERE
        id = @id
    );`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}