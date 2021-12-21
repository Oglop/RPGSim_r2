const {
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange
} = require('../lib/utils')

const eventBuilder = require('./event')
const objects = require('../generic/objects')
const { 
    ENUM_DUNGEON_ROOM_TYPE,
    ENUM_EVENT_TYPE
 } = require('../generic/enums')
const { get } = require('../localization')
const m = require('../models/dungeon')
/**
 * 
 * @returns 
 */
const getDungeonTheme = () => {
    const i = getRandomNumberInRange(0, 3)
    switch (i) {
        case 0: return get('dungeon-theme-cave');
        case 1: return get('dungeon-theme-ruins');
        case 2: return get('dungeon-theme-undercity');
        case 3: return get('dungeon-theme-stronghold');
    }
}

/**
 * 
 * @param {int} ENUM_DUNGEON_THEMES
 * @returns {int} ENUM_DUNGEON_ROOM_TYPE
 */
const getDungeonRoomType = theme => {
    const i = getRandomNumberInRange(0, 100)
    if (i >= 0 && i <= 10) {
        return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
    }
    else if (i >= 11 && i <= 20) {
        return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
    }
    else if (i >= 21 && i <= 30) {
        return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
    }
    else if (i >= 31 && i <= 100) {
        return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
    }
}

module.exports.build = () => {
    const d = copyObject(objects.dungeon)
    d.id = generateID()
    d.theme = getDungeonTheme()

    const depth = getRandomNumberInRange(8, 12)

    let previousRoom = copyObject(objects.dungeonRoom)
    previousRoom.id = 'start'
    d.rooms.push(previousRoom)
    for (let i = 0; i < depth; i++) {
        const r = copyObject(objects.dungeonRoom)
        r.id = (d.rooms.length) ? generateID() : 'start'
        r.type = getDungeonRoomType(r.theme)
        r.description = m.getRoomDescriptionFromType(r.type)
        r.event = eventBuilder.build(undefined, undefined, ENUM_EVENT_TYPE.DUNGEON, {})
        const door = copyObject(objects.dungeonRoomDoor)
        door.to = r.id
        previousRoom.door.push(door)
        d.rooms.push(r)
        previousRoom = r
        
    }

}