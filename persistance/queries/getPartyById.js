const { DatabaseContext } = require('../connections')

module.exports.getPartyById = async (dwellingLocationId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            dwellingLocationId,
            name,
            description,
            type
        FROM
            npc
        WHERE
            dwellingLocationId = @dwellingLocationId;
    `)

    const tmp = await stmt.all({
        '@dwellingLocationId': dwellingLocationId,
    })
    return tmp
}