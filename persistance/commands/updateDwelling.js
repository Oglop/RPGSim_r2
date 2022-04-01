const { DatabaseContext } = require('../connections')
/**
 * 
 * @param {Object} {
            id          text, 
            x           integer, 
            y           integer,
            name        text,
            type        integer,
            size        integer,
            citizens    integer,
            citizenTaxable number
            gold:       integer,
            food:       integer,
            taxRate:    integer,
            happiness:  integer,
            gate:       integer,
            walls:      integer,
            moats:      integer,
            guards:     integer
    } dwelling  
 */
module.exports.updateDwelling = async (dwelling) => {
    const stmt = await DatabaseContext.db.prepare(`UPDATE dwelling SET
            name = @name,
            type = @type,
            size = @citizens,
            citizens = @citizens,
            citizenTaxable = @citizenTaxable,
            gold = @gold,
            food = @food,
            taxRate = @taxRate,
            happiness = @happiness,
            gate = @gate,
            walls = @walls,
            moats = @moats,
            guards = @guards
        WHERE
            id = @id;`)
    await stmt.bind({
        '@name': dwelling.name,
        '@type': dwelling.type,
        '@size': dwelling.size,
        '@citizens': dwelling.citizens,
        '@citizenTaxable': dwelling.citizenTaxable,
        '@gold': dwelling.gold,
        '@food': dwelling.food,
        '@taxRate': dwelling.taxRate,
        '@happiness': dwelling.happiness,
        '@gate': dwelling.gate,
        '@walls': dwelling.walls,
        '@moats': dwelling.moats,
        '@guards': dwelling.guards,
        '@id': dwelling.id
    })
    await stmt.run()
}