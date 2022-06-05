const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { generateID, copyObject, getRandomNumberInRange, getRandomFloatInRange, chance, point2d } = require('../lib/utils')
const { 
    ENUM_QUEST_STATUS
} = require('../generic/enums')


/**
 * originLocationId
 * originNpcId
 * originDwellingLocationId
 * 
 * @param { x: int, y: int} options 
 */
module.exports.build = (originLocationId, originNpcId, originDwellingLocationId, options = {}) => 
{
    const q = copyObject(objects.quest)
    q.id = generateID()
    q.status = ENUM_QUEST_STATUS.NONE
    q.type = 0
    q.originLocationId = originLocationId
    q.originNpcId = originNpcId
    q.originDwellingLocationId = originDwellingLocationId
    if (options.x != undefined) { q.x = options.x }
    if (options.y != undefined) { q.y = options.y }
    if (q.x == undefined) 
    {

    }
}



