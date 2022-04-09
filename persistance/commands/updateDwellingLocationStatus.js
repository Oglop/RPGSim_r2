const { DatabaseContext } = require('../connections')
module.exports.updateDwellingLocationStatus = async (dwellingLocation) => {
    const stmt = await DatabaseContext.db.prepare(`
        UPDATE 
            dwellingLocation 
        SET
            status = @status
        WHERE
            id = @id;`)
    await stmt.bind({
        '@status': dwellingLocation.status,
        '@id': dwellingLocation.id
    })
    await stmt.run()
}