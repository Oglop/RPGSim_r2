const { DatabaseContext } = require('../connections')
module.exports.updateSkill = async (skill) => {
    const stmt = await DatabaseContext.db.prepare(`
    UPDATE 
        skill 
    SET
        mastery = @mastery
    WHERE
        id = @id;`)
    await stmt.bind({
        '@id': skill.id,
        '@mastery': skill.mastery,
    })
    await stmt.run()
}