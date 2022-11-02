const { DatabaseContext } = require('../connections')

module.exports.getLanguageByCharacterId = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            characterId,
            language,
            mastery
        FROM
            language
        WHERE
            characterId = @characterId;
    `)
    
    const tmp = await stmt.all({
        '@characterId': id,
    })
    return tmp
}