const { DatabaseContext } = require('../connections')

module.exports.updateDwelling = async (dwelling) => {
    try {
        const stmt = await DatabaseContext.db.prepare(`
        UPDATE dwelling SET
            size = @size,
            citizens = @citizens,
            citizenTaxable = @citizenTaxable,
            gold = @gold,
            food = @food,
            growth = @growth,
            taxRate = @taxRate,
            happiness = @happiness,
            happinessModifyer = @happinessModifyer,
            gate = @gate,
            walls = @walls,
            moats = @moats,
            guards = @guards
        WHERE
            id = @id;`)
        await stmt.bind({
            '@size': dwelling.size,
            '@citizens': dwelling.citizens,
            '@citizenTaxable': dwelling.citizenTaxable,
            '@gold': dwelling.gold,
            '@food': dwelling.food,
            '@growth': dwelling.growth,
            '@taxRate': dwelling.taxRate,
            '@happiness': dwelling.happiness,
            '@happinessModifyer': dwelling.happinessModifyer,
            '@gate': dwelling.gate,
            '@walls': dwelling.walls,
            '@moats': dwelling.moats,
            '@guards': dwelling.guards,
            '@id': dwelling.id
        })
        await stmt.run()
    } catch (e) {
        console.log(e)
    }
    
}