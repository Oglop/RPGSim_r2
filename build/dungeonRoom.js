const {
    copyObject,
    chance,
    getRandomNumberInRange,
    getObjectByidInArray
} = require('../lib/utils')
const objects = require('../generic/objects')
const { 
    ENUM_EVENT_TYPE,
    ENUM_DUNGEON_ROOM_TYPE
} = require('../generic/enums')
const { get } = require('../localization')
const eventBuilder = require('./event')




/**
 * 
 * @param {int} ENUM_DUNGEON_THEMES
 * @returns {int} ENUM_DUNGEON_ROOM_TYPE
 */
 const getDungeonRoomType = () => {
    const i = getRandomNumberInRange(0, 4)
    const j = getRandomNumberInRange(0, 3)
    let roomType = ''
    let roomSize = ''
    switch (i) {
        case 0: roomSize = get('dungeon-room-size-small'); break;
        case 1: roomSize = get('dungeon-room-size-tall'); break;
        case 2: roomSize = get('dungeon-room-size-large'); break;
        case 3: roomSize = get('dungeon-room-size-narrow'); break;
        case 4: roomSize = get('dungeon-room-size-big'); break;
    }
    switch (j) {
        case 0: roomType = get('dungeon-room-type-corridor'); break;
        case 1: roomType = get('dungeon-room-type-hall'); break;
        case 2: roomType = get('dungeon-room-type-room'); break;
        case 3: roomType = get('dungeon-room-type-stairs'); break;
    }
    return get('dungeon-room-description', [ roomSize, roomType ])
}

module.exports.build = (output) => {
    // world, output, eventType, options
    const r = copyObject(objects.dungeonRoom)
    r.description = getDungeonRoomType()
    const e = eventBuilder.build(undefined, 
        output, 
        ENUM_EVENT_TYPE.DUNGEON,
        { }
    )
    
    r.event = e
    return r
}