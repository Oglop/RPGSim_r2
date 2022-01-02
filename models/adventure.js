const { getRandomNumberInRange, copyObject } = require('../lib/utils')
const objects = require('../generic/objects')
const { WORLD_SIZE } = require('../generic/statics')
const { ENUM_EXPLORE_STATUS } = require('../generic/enums')
const { questLocationRadius } = require('../config')

/**
 * returns a random position within allwed radius from party
 * @param {*} world 
 * @param {*} party 
 */
const getQuestLocation = (world, party) => {
    let validPosition = false
    while (!validPosition) {
        const x = getRandomNumberInRange(party.position.x - questLocationRadius, party.position.x + questLocationRadius)
        const y = getRandomNumberInRange(party.position.y - questLocationRadius, party.position.y + questLocationRadius)
        if (world.map[x][y].exploreStatus != ENUM_EXPLORE_STATUS.obstacle &&
            x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE) {
            const p = copyObject(objects.point)
            p.x = x 
            p.y = y
            return p
        }
    }
}

module.exports = {
    getQuestLocation
}