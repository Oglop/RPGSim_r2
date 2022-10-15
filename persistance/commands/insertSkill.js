const { DatabaseContext } = require('../connections')
const { boolToInt } = require('../../lib/utils')
module.exports.insertSkill = async (skill) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO skill (
        id,
        characterId,
        name,
        statsBase,
        luckTest,
        mastery
    ) 
    VALUES
    (
        @id,
        @characterId,
        @name,
        @statsBase,
        @luckTest,
        @mastery
    );`)
    await stmt.bind({
        '@id': skill.id,
        '@characterId': skill.characterId,
        '@name': skill.name,
        '@statsBase': skill.statsBase,
        '@luckTest': boolToInt(skill.luckTest),
        '@mastery': skill.mastery
    })
    await stmt.run()
}