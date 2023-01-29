const { DatabaseContext } = require('../connections')
module.exports.insertRumor = async (rumor) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO rumor (
        id,
        questId,
        description,
        type,
        positionX,
        positionY,
        targetX,
        targetY
    ) 
    VALUES
    (
        @id,
        @questId,
        @description,
        @type,
        @positionX,
        @positionY,
        @targetX,
        @targetY
    );`)
    await stmt.bind({
        '@id': rumor.id,
        '@questId': rumor.questId,
        '@description': rumor.description,
        '@type': rumor.type,
        '@positionX': rumor.position.x,
        '@positionY': rumor.position.y,
        '@targetX': rumor.target.x,
        '@targetY': rumor.target.y
    })
    await stmt.run()
}