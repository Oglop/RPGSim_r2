const { DatabaseContext } = require('../connections')
const { dateToText } = require('../../lib/time')
/**
 * 
 * @param {Object} {
            id: undefined,
            name: undefined,
            map: undefined,
            date: undefined,
            parties:[]
    } dwelling  
 */
module.exports.insertWorld = async (world) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO world (
        id,
        name,
        date
    ) 
    VALUES
    (
        @id,
        @name,
        @date
    );`)
    await stmt.bind({
        '@id': world.id,
        '@name': world.name,
        '@date': dateToText(world.date)
    })
    await stmt.run()
}