const { DatabaseContext } = require('../connections')

module.exports.deleteAdvisor = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        advisor 
    WHERE
        id = @id
    ;`)
    await stmt.bind({
        '@id': id,
    })
    await stmt.run()
}