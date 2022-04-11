const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getTradeByDwellingId = async (dwellingId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            dwellingId,
            partnerId,
            value
        FROM
            trade
        WHERE
            armyId = @armyId;
    `)

    const tmp = await stmt.all({
        '@dwellingId': dwellingId,
    })
    return tmp
}