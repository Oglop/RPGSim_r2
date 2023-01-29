const { DatabaseContext } = require('../connections')
const { copyObject, point2d } = require('../../lib/utils')
const object = require('../../generic/objects')

module.exports.getRumorById = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            questId,
            description,
            type,
            positionX,
            positionY,
            targetX,
            targetY
        FROM
            rumor
        WHERE
            id = @id;
    `)

    const tmp = await stmt.get({
        '@id': id,
    })
    const rumor = copyObject(object.rumor)

    if (tmp != undefined) {
        rumor.id = tmp.id
        rumor.description = tmp.description
        rumor.type = tmp.type
        rumor.position = point2d(tmp.positionX, tmp.positionY)
        rumor.target = point2d(tmp.targetX, tmp.targetY)
    }
    return rumor
}