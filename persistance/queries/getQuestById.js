const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getQuestById = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id
            type
            status
            x
            y
            originLocationId
            originNpcId
            originDwellingLocationId
        FROM
            quest
        WHERE
            id = @id;
    `)

    return await stmt.get({
        '@id': id,
    })

}