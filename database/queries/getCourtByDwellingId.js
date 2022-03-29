const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getCourtByDwellingId = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
    SELECT
        id,
        dwellingId,
        rulerId
    FROM
        court
    WHERE
        dwellingId = @dwellingId;
    `)

    await stmt.bind({
        '@dwellingId': id
    })
    const tmp = await stmt.get()
    return tmp
    
}