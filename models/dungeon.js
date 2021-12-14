const {
    copyObject,
    chance,
    getRandomNumberInRange,
    getObjectByIDInArray
} = require('../lib/utils')
const objects = require('../generic/objects')
const { 
    ENUM_DUNGEON_THEMES,
    ENUM_DUNGEON_ROOM_TYPE,
    ENUM_TRAVERSE_DIRECTION
} = require('../generic/enums')
const { get } = require('../localization')


const getRoomDescriptionFromType = (type) => {
    switch (type) {
        case ENUM_DUNGEON_ROOM_TYPE.CORRIDOR: return get('dungeon-type-corridor')
    }


    return ''
}

const traverseDungeon = (dungeonRoom, dungeon, direction) => {
    const room = (direction == ENUM_TRAVERSE_DIRECTION.DOWN) ? getObjectByIDInArray(dungeon.rooms, dungeonRoom.doors[0].down) : getObjectByIDInArray(dungeon.rooms, dungeonRoom.doors[0].up)
    return room
}


const resolveRoom = (room) => {
    
}


module.exports = {
    getRoomDescriptionFromType,
    traverseDungeon
}
