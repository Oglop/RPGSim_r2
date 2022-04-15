const { DatabaseContext } = require('../connections')

module.exports.getStory = async () => {
    const stmt = await DatabaseContext.db.prepare(`
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
    const tmp = await stmt.all()
    return tmp
}