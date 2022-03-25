const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getDwellingIdsFromRoom = async () => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            dwellingId
        FROM
            room
        WHERE
            dwellingId IS NOT NULL;
    `)
    const tmp = await stmt.all()
    return tmp
}