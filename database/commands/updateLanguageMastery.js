const { DatabaseContext } = require('../connections')

module.exports.updateLanguageMastery = async (language) => {
    const stmt = await DatabaseContext.db.prepare(`
        UPDATE 
            language 
        SET 
            mastery = @mastery
        WHERE
            characterId = @characterId AND
            language = @language;`)
    await stmt.bind({
        '@mastery': language.mastery,
        '@characterId': language.characterId,
        '@language': language.language
    })
    await stmt.run()
}