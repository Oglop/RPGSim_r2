const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getArmyByDwellingId = async (dwellingId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            dwellingId,
            name
        FROM
            army
        WHERE
            dwellingId = @dwellingId;
    `)

    const tmp = await stmt.all({
        '@dwellingId': dwellingId,
    })
    return tmp
}