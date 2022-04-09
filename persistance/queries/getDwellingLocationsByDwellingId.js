const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getDwellingLocationsByDwellingId = async (dwellingId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            dwellingId,
            name,
            type,
            status
        FROM
            dwellingLocation
        WHERE
            dwellingId = @dwellingId;
    `)
    const tmp = await stmt.all({
        '@dwellingId': dwellingId,
    })
    return tmp
}