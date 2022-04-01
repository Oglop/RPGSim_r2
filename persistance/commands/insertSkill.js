const { DatabaseContext } = require('../connections')
const { boolToInt } = require('../../lib/utils')
module.exports.insertSkill = async (skill) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO skill (
        characterId,
        name,
        statsBase,
        luckTest,
        mastery
    ) 
    VALUES
    (

        @characterId,
        @name,
        @statsBase,
        @luckTest,
        @mastery
    );`)
    await stmt.bind({
        '@characterId': skill.characterId,
        '@name': skill.name,
        '@statsBase': skill.statsBase,
        '@luckTest': boolToInt(skill.luckTest),
        '@mastery': 0
    })
    await stmt.run()
}