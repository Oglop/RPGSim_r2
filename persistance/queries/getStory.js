const { DatabaseContext } = require('../connections')

module.exports.getStory = async () => {

    const tmp = await DatabaseContext.db.all(`
    SELECT
            id,
            aboutId,
            type,
            subType,
            date,
            message,
            tag,
            created
        FROM
            story
        ORDER BY
            created;
    `)
    return tmp
}