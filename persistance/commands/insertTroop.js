const { DatabaseContext } = require('../connections')

module.exports.insertTroop = async (troop) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO troop (
        id,
        armyId,
        name,
        type,
        power,
        number
    ) 
    VALUES
    (
        @id,
        @armyId,
        @name,
        @type,
        @power,
        @number
    );`)
    await stmt.bind({
        '@id': troop.id,
        '@armyId': troop.armyId,
        '@name': troop.name,
        '@type': troop.type,
        '@power': troop.power,
        '@number': troop.number
    })
    await stmt.run()
}