const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { textToDate } = require('../../lib/time')
const { copyObject } = require('../../lib/utils')

module.exports.getWorldById = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            name,
            date
        FROM
            world
        WHERE
            id = @id;
    `)
    await stmt.bind({
        '@id': id
    })
    
    const tmp = await stmt.get()
    const world = copyObject(objects.world)
    return { ...world, ...tmp, date: textToDate(tmp.date) }
}

