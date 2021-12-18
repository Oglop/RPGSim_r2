const {
    copyObject,
    chance,
    getRandomNumberInRange,
    getObjectByidInArray
} = require('../lib/utils')
const objects = require('../generic/objects')
const { 
    ENUM_DUNGEON_THEMES,
    ENUM_DUNGEON_ROOM_TYPE
} = require('../generic/enums')
const { get } = require('../localization')


const getRoomDescriptionFromType = (type) => {
    switch (type) {
        case ENUM_DUNGEON_ROOM_TYPE.CORRIDOR: return get('dungeon-type-corridor')
    }


    return ''
}

const traverseDungeon = (dungeonRoom, dungeon) => {
    return getObjectByidInArray(dungeon.rooms, dungeonRoom.door.to)
}

const getFirstdungeonRoom = dungeon => {
    return getObjectByidInArray(dungeon.rooms, 'start') 
}

/**
 * 
 * 
 * @param {object} dungeonRoom 
 * @param {object} output 
 */
const resolveRoom = (dungeonRoom, party, output) => {
    output.print(dungeonRoom.description)
    if (dungeonRoom.dungeonEvent != undefined && dungeonRoom.dungeonEvent instanceof Function) {
        dungeonRoom.dungeonEvent(party)
    }
}


module.exports = {
    getRoomDescriptionFromType,
    traverseDungeon,
    resolveRoom,
    getFirstdungeonRoom
}
