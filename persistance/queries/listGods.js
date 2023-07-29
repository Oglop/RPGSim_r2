const { DatabaseContext } = require('../connections')
module.exports.listGods = async () => {

    const tmp = await DatabaseContext.db.all(`
    SELECT
            id,
            name,
            profile,
            symbol
        FROM
            god
        ORDER BY
            id;
    `)
    return tmp
}