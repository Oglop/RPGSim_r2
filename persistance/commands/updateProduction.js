
module.exports.updateProduction = async (production) => {
    const stmt = await DatabaseContext.db.prepare(`UPDATE production SET
            production = @production,
        WHERE
            id = @id;`)
    await stmt.bind({
        '@production': production.production,
        '@id': production.id
    })
    await stmt.run()
}