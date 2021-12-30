
const b = require('../build/dungeon')
const m = require('../models/dungeon')
/**
 * 
 * @param {object} party 
 * @param {object} options { int: size* }
 */
const resolveDungeon = (party, output, options = {}) => {
    const dungeon = b.build(options)
    while (dungeon.size > dungeon.position) {
        if (m.resolveRoom(dungeon, party, output)) {
            if (m.resolveDoor(party, dungeon.room, output)) {
                dungeon.position += 1
            }
        }
    }
}


module.exports = {
    resolveDungeon
}