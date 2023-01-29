const { DatabaseContext } = require('../connections')

module.exports.deleteDwellingRumor = async (rumorId) => {
    const stmt = await DatabaseContext.db.prepare(`
    DELETE FROM 
        dwellingRumor    
    WHERE
        rumorId = @rumorId
    ;`)
    await stmt.bind({
        '@rumorId': rumorId
    })
    await stmt.run()
}