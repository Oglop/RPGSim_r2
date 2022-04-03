const { DatabaseContext } = require('../connections')

module.exports.insertLoan = async (loan) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO loan (
        id,
        courtId,
        rulerId,
        amount,
        from
    ) 
    VALUES
    (
        @id,
        @courtId,
        @rulerId,
        @amount,
        @from
    );`)
    await stmt.bind({
        '@id': loan.id,
        '@courtId': loan.courtId,
        '@rulerId': loan.rulerId,
        '@amount': loan.amount,
        '@from': loan.from
    })
    await stmt.run()
}