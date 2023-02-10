const { DatabaseContext } = require('../connections')

module.exports.deleteItem = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        item    
    WHERE
        id = @id
    ;`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}