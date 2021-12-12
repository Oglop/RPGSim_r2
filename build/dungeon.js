const {
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange
} = require('../lib/utils')
const objects = require('../generic/objects')
const { 
    ENUM_DUNGEON_THEMES,
    ENUM_DUNGEON_ROOM_TYPE
 } = require('../generic/enums')

/**
 * 
 * @returns 
 */
const getRandomDungeonTheme = () => {
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
    d.theme = getRandomDungeonTheme()

    let previousRoom = {}
    for (let i = 0; i < 10; i++) {
        const r = copyObject(objects.dungeonRoom)
        previousRoom = r
        r.id = generateID()

    }

}