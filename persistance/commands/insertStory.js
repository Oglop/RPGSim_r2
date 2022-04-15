const { DatabaseContext } = require('../connections')
const {  } = require('../../lib/utils')

module.exports.insertStory = async (story) => {
    const stmt = await DatabaseContext.db.prepare(`
    INSERT INTO 
        story 
    (
        id,
        aboutId,
        type,
        subType,
        date,
        message,
        tag
    ) 
    VALUES
    (
        @id,
        @aboutId,
        @type,
        @subType,
        @date,
        @message,
        @tag
    );`)
    await stmt.bind({
        '@id': story.id,
        '@aboutId': story.aboutId,
        '@type': story.type,
        '@subType': story.subType,
        '@date': story.date,
        '@message': story.message,
        '@tag': story.tag
    })
    await stmt.run()
}