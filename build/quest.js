const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { generateID, copyObject, getRandomNumberInRange, getRandomFloatInRange, chance, point2d } = require('../lib/utils')
const { 
    ENUM_QUEST_STATUS,
    ENUM_QUEST_TYPE,
    ENUM_COMMANDS
} = require('../generic/enums')
const { executeCommands } = require('../persistance/commandQueue')
const mMap = require('../models/map')


const getQuestType = (options = {}) => {
    if (options.type) { return options.type }
    const i = getRandomNumberInRange(0, 0)
    switch (i) {
        case 0: return ENUM_QUEST_TYPE.RUIN;

    }
    return ENUM_QUEST_TYPE.RUIN;
}

/**
 * originLocationId
 * originNpcId
 * originDwellingLocationId
 * 
 * @param {Array} map 
 * @param {integer} currentX
 * @param {integer} currentY 
 * @param {string} originLocationId
 * @param {string} originNpcId
 * @param {string} originDwellingLocationId
 * @param { 
 *  status: ENUM_QUEST_STATUS, 
 *  type: ENUM_QUEST_TYPE
 * } options 
 */
module.exports.build = async (map, currentX, currentY, originLocationId, originNpcId, originDwellingLocationId, options = {}) => 
{
    const q = copyObject(objects.quest)
    try {
        q.id = generateID()
        q.status = (options.status) ? options.status : ENUM_QUEST_STATUS.NONE
        q.type = getQuestType(options)
        q.originLocationId = originLocationId
        q.originNpcId = originNpcId
        q.originDwellingLocationId = originDwellingLocationId
        if (options.x != undefined) { q.x = options.x }
        if (options.y != undefined) { q.y = options.y }
        if (q.x == undefined) 
        {
            const questPosition = mMap.getRandomQuestLocation(map, currentX, currentY)
            q.x = questPosition.x
            q.y = questPosition.y
        }
        await executeCommands({ command: ENUM_COMMANDS.INSERT_QUEST, data: q })
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
    return q
}



