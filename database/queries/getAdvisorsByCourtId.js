const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject, intToBool } = require('../../lib/utils')

module.exports.getAdvisorsByCourtId = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            characterId,
            courtId
        FROM
            advisor
        WHERE
            courtId = @courtId;
    `)

    const tmp = await stmt.all({
        '@courtId': id,
    })
    /*const advisors = []
    tmp.array.forEach(e => {
        const skill = copyObject(objects.skill)
        e.push({
            ...skill,
            luckTest: intToBool(e.luckTest)
        })
    });*/
    return tmp
}