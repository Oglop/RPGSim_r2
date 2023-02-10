const { DatabaseContext } = require('../connections')

module.exports.getItemById = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            type,
            name,
            use,
            effect,
            min,
            max,
            value,
            skillRequired
        FROM
            item
        WHERE
            id = @id;
    `)
    const tmp = await stmt.get({
        '@id': id
    })
    return tmp
}