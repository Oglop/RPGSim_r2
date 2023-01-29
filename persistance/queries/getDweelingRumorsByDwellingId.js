const { DatabaseContext } = require('../connections')
//const objects = require('../../generic/objects')
//const { copyObject, intToBool } = require('../../lib/utils')

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
    /*const skills = []
    tmp.forEach(e => {
        const skill = copyObject(objects.skill)
        skills.push({
            ...skill, 
            ...e,
            luckTest: intToBool(e.luckTest)
        })
    });*/
    return tmp
}