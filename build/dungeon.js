const {
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange
} = require('../lib/utils')

const eventBuilder = require('./event')
const objects = require('../generic/objects')
const { 
    ENUM_DUNGEON_THEMES,
    ENUM_DUNGEON_ROOM_TYPE,
    ENUM_EVENT_TYPE
 } = require('../generic/enums')
const m = require('../models/dungeon')
/**
 * 
 * @returns 
 */
const getDungeonTheme = () => {
    const i = getRandomNumberInRange(0, 3)
    switch (i) {
        case 0: return ENUM_DUNGEON_THEMES.CAVE;
        case 1: return ENUM_DUNGEON_THEMES.TEMPLE;
        case 2: return ENUM_DUNGEON_THEMES.UNDERCITY;
        case 3: return ENUM_DUNGEON_THEMES.STRONGHOLD;
    }
}

/**
 * 
 * @param {int} ENUM_DUNGEON_THEMES
 * @returns {int} ENUM_DUNGEON_ROOM_TYPE
 */
const getDungeonRoomType = theme => {
    const i = getRandomNumberInRange(0, 100)
    switch (theme) {
        case ENUM_DUNGEON_THEMES.CAVE:
            if (i >= 0 && i <= 100) {
                return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
            }
            break;
        case ENUM_DUNGEON_THEMES.TEMPLE:
            if (i >= 0 && i <= 100) {
                return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
            }
            break;
        case ENUM_DUNGEON_THEMES.UNDERCITY:
            if (i >= 0 && i <= 100) {
                return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
            }
            break;
        case ENUM_DUNGEON_THEMES.STRONGHOLD:
            if (i >= 0 && i <= 100) {
                return ENUM_DUNGEON_ROOM_TYPE.CORRIDOR
            }
            break;
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