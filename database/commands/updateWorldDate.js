const { DatabaseContext } = require('../connections')
const { dateToText } = require('../../lib/time')

module.exports.updateWorldDate = async (world) => {
    const stmt = await DatabaseContext.db.prepare(`
        UPDATE 
            world 
        SET 
            date = @date
        WHERE
            id = @id;`)
    await stmt.bind({
        '@id': world.id,
        '@date': dateToText(world.date)
    })
    await stmt.run()
}