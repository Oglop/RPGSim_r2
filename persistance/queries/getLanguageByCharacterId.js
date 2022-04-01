const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')

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
    /*await stmt.bind({
        '@characterId': language.characterId,
    })*/
    
    const tmp = await stmt.all({
        '@characterId': id,
    })
    //const language = copyObject(objects.language)
    return tmp //{ ...language, ...tmp }
}