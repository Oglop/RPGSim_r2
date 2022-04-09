const { DatabaseContext } = require('../connections')

module.exports.insertDwellingLocation = async (dwellingLocation) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO dwellingLocation (
        id,
        dwellingId,
        name,
        status,
        type
    ) 
    VALUES
    (
        @id,
        @dwellingId,
        @name,
        @status,
        @type
    );`)
    await stmt.bind({
        '@id': dwellingLocation.id,
        '@dwellingId': dwellingLocation.dwellingId,
        '@name': dwellingLocation.name,
        '@status': dwellingLocation.status,
        '@type': dwellingLocation.type
    })
    await stmt.run()
}