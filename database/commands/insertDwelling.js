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
module.exports.insertDwelling = async (dwelling) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO dwelling (
            id, 
            x, 
            y,
            name,
            type,
            size,
            citizens,
            gold,
            food,
            taxRate,
            happiness,
            gate,
            walls,
            moats,
            guards   
        ) 
    VALUES
        (
            @id, 
            @x, 
            @y,
            @name,
            @type,
            @size,
            @citizens,
            @gold,
            @food,
            @taxRate,
            @happiness,
            @gate,
            @walls,
            @moats,
            @guards
        );`)
    await stmt.bind({
        '@id': dwelling.id, 
        '@x': dwelling.x, 
        '@y': dwelling.y,
        '@name': dwelling.name,
        '@type': dwelling.type,
        '@size': dwelling.size,
        '@citizens': dwelling.citizens,
        '@gold': dwelling.gold,
        '@food': dwelling.food,
        '@taxRate': dwelling.taxRate,
        '@happiness': dwelling.happiness,
        '@gate': dwelling.gate,
        '@walls': dwelling.walls,
        '@moats': dwelling.moats,
        '@guards': dwelling.guards
    })
    await stmt.run()
}