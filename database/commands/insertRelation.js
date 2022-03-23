const { DatabaseContext } = require('../connections')

module.exports.insertRelation = async (relation) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO relation (
        characterId,
        id,    
        points,
    ) 
    VALUES
    (
        @characterId,
        @id,
        @points
    );`)
    await stmt.bind({
        '@characterId': relation.characterId,
        '@id': relation.id,
        '@points': relation.points
    })
    await stmt.run()
}