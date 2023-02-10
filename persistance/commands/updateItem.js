const { DatabaseContext } = require('../connections')

module.exports.updateItem = async (item) => {
    const stmt = await DatabaseContext.db.prepare(`
        UPDATE 
            item 
        SET 
            type=@type,
            name=@name,
            use=@use,
            effect=@effect,
            min=@min,
            max=@max,
            value=@value,
            skillRequired=@skillRequired
        WHERE
            id = @id;`)
    await stmt.bind({
        '@id': item.id,
        '@type': item.type,
        '@name': item.name,
        '@use': item.use,
        '@effect': item.effect,
        '@min': item.min,
        '@max': item.max,
        '@value': item.value,
        '@skillRequired': item.skillRequired
    })
    await stmt.run()
}