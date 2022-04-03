const { DatabaseContext } = require('../connections')
module.exports.updateLoan = async (loan) => {
    const stmt = await DatabaseContext.db.prepare(`UPDATE loan SET
            amount = @amount,
        WHERE
            id = @id;`)
    await stmt.bind({
        '@amount': loan.amount,
        '@id': loan.id
    })
    await stmt.run()
}