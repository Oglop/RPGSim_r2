const { DatabaseContext } = require('../connections')

module.exports.insertLanguage = async (language) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO language (
        characterId,
        language,
        mastery
    ) 
    VALUES
    (
        @characterId,
        @language,
        @mastery
    );`)
    await stmt.bind({
        '@characterId': language.characterId,
        '@language': language.language,
        '@mastery': language.mastery
    })
    await stmt.run()
}
