const { DatabaseContext } = require('../connections')

module.exports.updateRumor = async (rumor) => {
    const stmt = await DatabaseContext.db.prepare(`
    UPDATE 
        rumor 
    SET
        description = @description,
        type = @type,
        targetX = @targetX,
        targetY = @targetY
    WHERE
        id = @id;`)
    await stmt.bind({
        '@id': rumor.id,
        '@type': rumor.type,
        '@targetX': rumor.target.x,
        '@targetY': rumor.targety
    })
    await stmt.run()
}