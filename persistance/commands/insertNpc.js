const { DatabaseContext } = require('../connections')

module.exports.insertNpc = async (npc) => {
    const stmt = await DatabaseContext.db.prepare(`
    INSERT INTO 
        npc
    (
        id,
        dwellingLocationId,
        name,
        description,
        type
    ) 
    VALUES
    (
        @id,
        @dwellingLocationId,
        @name,
        @description,
        @type
    );`)
    await stmt.bind({
        '@id': npc.id,
        '@dwellingLocationId': npc.dwellingLocationId,
        '@name': npc.name,
        '@description': npc.description,
        '@type': npc.type
    })
    await stmt.run()
}