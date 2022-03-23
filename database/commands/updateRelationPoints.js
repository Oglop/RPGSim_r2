const { DatabaseContext } = require('../connections')

module.exports.updateRelationPoints = async (relation) => {
    const stmt = await DatabaseContext.db.prepare(`
    UPDATE 
        relation 
    SET
        points = @points,
    WHERE
        characterId = @characterId;`)
    await stmt.bind({
        '@characterId': relation.characterId
    })
    await stmt.run()
}