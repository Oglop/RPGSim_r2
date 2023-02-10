const { DatabaseContext } = require('../connections')
module.exports.insertItem = async (item) => {
    const stmt = await DatabaseContext.db.prepare(`
    INSERT INTO item 
    (
        id,
        type,
        name,
        use,
        effect,
        min,
        max,
        value,
        skillRequired
    ) 
    VALUES
    (
        @id,
        @type,
        @name,
        @use,
        @effect,
        @min,
        @max,
        @value,
        @skillRequired
    );`)
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
