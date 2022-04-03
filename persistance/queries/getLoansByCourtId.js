const { DatabaseContext } = require('../connections')

module.exports.getLoansBtCourtId = async (courtId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            courtId,
            rulerId,
            amount,
            from
        FROM
            loan
        WHERE
            courtId = @courtId;
    `)

    const tmp = await stmt.all({
        '@courtId': courtId,
    })
    return tmp
}