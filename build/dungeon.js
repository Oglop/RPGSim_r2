const {
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange
} = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_DUNGEON_THEMES } = require('../generic/enums')


const getRandomDungeonTheme = () => {
    const i = getRandomNumberInRange(0, 3)
    switch (i) {
        case 0: return ENUM_DUNGEON_THEMES.CAVE;
        case 1: return ENUM_DUNGEON_THEMES.TEMPLE;
        case 2: return ENUM_DUNGEON_THEMES.UNDERCITY;
        case 3: return ENUM_DUNGEON_THEMES.STRONGHOLD;
    }

}

module.exports.build = () => {
    const d = copyObject(objects.dungeon)
    d.id = generateID()
    d.theme = getRandomDungeonTheme()

}