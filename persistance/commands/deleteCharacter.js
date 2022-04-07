const { DatabaseContext } = require('../connections')

module.exports.deleteCharacter = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        character 
    WHERE
        id = @id
    );`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}