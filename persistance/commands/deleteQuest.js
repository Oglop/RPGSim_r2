const { DatabaseContext } = require('../connections')

module.exports.deleteQuest = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        quest    
    WHERE
        id = @id
    ;`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}