const { ENUM_DWELLINGS } = require('../generic/enums')
/**
 * 
 * @param {Array[][]} map 
 * @returns {Array} dwelling
 */
const getDwellingsFromMap = map => {
    const dwellings = []
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            if (map[x][y].dwelling) {
                if (map[x][y].dwelling.type == ENUM_DWELLINGS.TOWN ||
                    map[x][y].dwelling.type == ENUM_DWELLINGS.CITY ||
                    map[x][y].dwelling.type == ENUM_DWELLINGS.ELF_TOWN ||
                    map[x][y].dwelling.type == ENUM_DWELLINGS.DWARVEN_MINE
                ) {
                    dwellings.push(map[x][y].dwelling)
                }
                
            }
        }
    }
    return dwellings
}

module.exports = {
    getDwellingsFromMap
}