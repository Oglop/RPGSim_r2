const { DatabaseContext } = require('../connections')
module.exports.insertDwellingRumor = async (dwellingRumor) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO dwellingRumor (
        dwellingId,
        rumorId
    ) 
    VALUES
    (
        @dwellingId,
        @rumorId
    );`)
    await stmt.bind({
        '@dwellingId': dwellingRumor.dwellingId,
        '@rumorId': dwellingRumor.questId
    })
    await stmt.run()
}