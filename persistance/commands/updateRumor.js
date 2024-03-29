const { DatabaseContext } = require('../connections')

module.exports.updateRumor = async (rumor) => {
    const stmt = await DatabaseContext.db.prepare(`
    UPDATE 
        rumor 
    SET
        description = @description,
        questId = @questId,
        type = @type,
        targetX = @targetX,
        targetY = @targetY
    WHERE
        id = @id;`)
    await stmt.bind({
        '@id': rumor.id,
        '@questId': rumor.questId,
        '@type': rumor.type,
        '@targetX': rumor.target.x,
        '@targetY': rumor.target.y
    })
    await stmt.run()
}