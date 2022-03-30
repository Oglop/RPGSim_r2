const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')

module.exports.getTroopsByArmyId = async (armyId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            armyId,
            name,
            type,
            power,
            number
        FROM
            troop
        WHERE
            armyId = @armyId;
    `)

    const tmp = await stmt.all({
        '@armyId': armyId,
    })
    return tmp
}