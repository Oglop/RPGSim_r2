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

const getCreatorKnownFor = () => {
    const i = getRandomNumberInRange(0, 9)
    switch (i) {
        case 0 : return get('dungeon-known-for-bloodthirst')
        case 1 : return get('dungeon-known-for-vengence')
        case 2 : return get('dungeon-known-for-greed')
        case 3 : return get('dungeon-known-for-vain')
        case 4 : return get('dungeon-known-for-wisdom')
        case 5 : return get('dungeon-known-for-beuty')
        case 6 : return get('dungeon-known-for-cruelty')
        case 7 : return get('dungeon-known-for-cunning')
        case 8 : return get('dungeon-known-for-evil')
        case 9 : return get('dungeon-known-for-kindness')
    }
}

const getDungeonCreatedBy = () => {
const verb = getCreatorKnownFor()
    const i = getRandomNumberInRange(0, 9)
    switch (i) {
        case 0 : return get('dungeon-by-elfs', verb)
        case 1 : return get('dungeon-by-dwarves', verb)
        case 2 : return get('dungeon-by-wizard', verb)
        case 3 : return get('dungeon-by-warlord', verb)
        case 4 : return get('dungeon-by-treasurehunters', verb)
        case 5 : return get('dungeon-by-monks', verb)
        case 6 : return get('dungeon-by-warrior', verb)
        case 7 : return get('dungeon-by-darkelves', verb)
        case 8 : return get('dungeon-by-orcs', verb)
        case 9 : return get('dungeon-by-demons', verb)
    }
}

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

module.exports.build = () => {
    const d = copyObject(objects.dungeon)
    d.id = generateID()
    d.theme = getDungeonTheme()
    d.by = getDungeonCreatedBy()
    const depth = getRandomNumberInRange(8, 12)

    let previousRoom = copyObject(objects.dungeonRoom)
    previousRoom.id = 'start'
    d.rooms.push(previousRoom)
    for (let i = 0; i < depth; i++) {
        const r = copyObject(objects.dungeonRoom)
        r.id = (d.rooms.length) ? generateID() : 'start'
        r.type = getDungeonRoomType()
        r.description = m.getRoomDescriptionFromType(r.type)
        r.event = eventBuilder.build(undefined, undefined, ENUM_EVENT_TYPE.DUNGEON, {})
        const door = copyObject(objects.dungeonRoomDoor)
        door.to = r.id
        previousRoom.door.push(door)
        d.rooms.push(r)
        previousRoom = r
        
    }

}