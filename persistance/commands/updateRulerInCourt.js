const { DatabaseContext } = require('../connections')

module.exports.updateRulerInCourt = async (court) => {
    const stmt = await DatabaseContext.db.prepare(`
    UPDATE 
        court 
    SET
        rulerId = @rulerId,
    WHERE
        id = @courtId;`)
    await stmt.bind({
        '@courtId': court.id,
        '@rulerId': court.rulerId
    })
    await stmt.run()
}