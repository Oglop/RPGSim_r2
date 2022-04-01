const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject, intToBool } = require('../../lib/utils')

module.exports.getRelationByCharacterId = async (characterId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            characterId,
            points,
        FROM
            relation
        WHERE
            characterId = @characterId;
    `)

    const tmp = await stmt.all({
        '@characterId': characterId,
    })
    return tmp
}