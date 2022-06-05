
module.exports.updateQuest = async (quest) => {
    const stmt = await DatabaseContext.db.prepare(`
        UPDATE 
            quest 
        SET
            status = @status,
        WHERE
            id = @id;`)
    await stmt.bind({
        '@status': quest.status,
        '@id': quest.id
    })
    await stmt.run()
}