/*
const { DatabaseContext } = require('../connections')

module.exports.listParties = async () => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            name,
            members
        FROM
            party;
    `)

    const tmp = await stmt.all({})
    return tmp
}
*/