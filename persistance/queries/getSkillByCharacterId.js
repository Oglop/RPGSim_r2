const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject, intToBool } = require('../../lib/utils')

module.exports.getSkillByCharacterId = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            characterId,
            name,
            statsBase,
            luckTest,
            mastery
        FROM
            skill
        WHERE
            characterId = @characterId;
    `)

    const tmp = await stmt.all({
        '@characterId': id,
    })
    const skills = []
    tmp.array.forEach(e => {
        const skill = copyObject(objects.skill)
        e.push({
            ...skill,
            luckTest: intToBool(e.luckTest)
        })
    });
    return skills
}