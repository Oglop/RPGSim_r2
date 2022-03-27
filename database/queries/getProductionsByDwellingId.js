const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getProductionsByDwellingId = async (dwellingId) => {
    const stmt = await DatabaseContext.db.prepare(`
    SELECT
        id,
        dwellingId,
        points,
        type,
        production
    FROM
        production
    WHERE
        dwellingId = @dwellingId;
    `)

    const tmp = await stmt.all({
        '@dwellingId': dwellingId,
    })
    return tmp
}