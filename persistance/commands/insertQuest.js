const { DatabaseContext } = require('../connections')

module.exports.insertQuest = async (quest) => {
    const stmt = await DatabaseContext.db.prepare(`
    INSERT INTO 
        quest
    (
        id,
        type,
        status,
        x,
        y,
        originLocationId,
        originNpcId,
        originDwellingLocationId
    ) 
    VALUES
    (
        @id,
        @type,
        @status,
        @x,
        @y,
        @originLocationId,
        @originNpcId,
        @originDwellingLocationId
    );`)
    await stmt.bind({
        '@id': quest.id,
        '@type': quest.type,
        '@status': quest.status,
        '@x': quest.x,
        '@y': quest.y,
        '@originLocationId': quest.originLocationId,
        '@originNpcId': quest.originNpcId,
        '@originDwellingLocationId': quest.originDwellingLocationId,
    })
    await stmt.run()
}