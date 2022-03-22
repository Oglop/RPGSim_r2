const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject, intToBool } = require('../../lib/utils')

module.exports.getCourtByDwellingId = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            dwellingId,
            rulerId
        FROM
            advisor
        WHERE
        dwellingId = @dwellingId;
    `)

    await stmt.prepare({
        '@dwellingId': id,
    })
    const tmp = await stmt.get()
    return tmp
}