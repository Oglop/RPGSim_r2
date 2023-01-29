const { DatabaseContext } = require('../connections')

module.exports.getDwellingRumorsByDwellingId = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            dwellingId,
            rumorId
        FROM
            dwellingRumor
        WHERE
            dwellingId = @dwellingId;
    `)

    const tmp = await stmt.all({
        '@dwellingId': id,
    })

    return tmp
}