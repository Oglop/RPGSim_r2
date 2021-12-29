const {
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange
} = require('../lib/utils')

const objects = require('../generic/objects')
const { 
    ENUM_DUNGEON_ROOM_TYPE,
    ENUM_EVENT_TYPE,
    ENUM_DUNGEON_SIZE
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
 * get a random dungeon description
 * @returns {string}
 */
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
/**
 * return number of rooms dungeon contains
 * @param {int} size 
 * @returns {int}
 */
const getDungeonSize = (size) => {
    switch (size) {
        case ENUM_DUNGEON_SIZE.SMALL: return getRandomNumberInRange(3, 5)
        case ENUM_DUNGEON_SIZE.MEDIUM: return getRandomNumberInRange(4, 6)
        case ENUM_DUNGEON_SIZE.LARGE: return getRandomNumberInRange(5, 7)
        case ENUM_DUNGEON_SIZE.EPIC: return getRandomNumberInRange(7, 10)
    }
}

const getDungeonDescription = () => {
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

module.exports.build = (options = {}) => {
    if (options.size != undefined) {
        options.size = ENUM_DUNGEON_SIZE.MEDIUM
    }
    const d = copyObject(objects.dungeon)
    d.id = generateID()
    d.size = getDungeonSize(options.size)
    d.theme = getDungeonTheme()
    d.description = getDungeonDescription()
    return d
}