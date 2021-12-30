const {
    copyObject,
    chance,
    getRandomNumberInRange,
    getObjectByidInArray
} = require('../lib/utils')
const objects = require('../generic/objects')
const dungeonRoomBuilder = require('../build/dungeonRoom')
const { 
    ENUM_DUNGEON_ROOM_TYPE,
    ENUM_DUNGEON_DOOR_STATUS,
    ENUM_SKILL_NAMES
} = require('../generic/enums')
const { get } = require('../localization')
const { checkPartySkill } = require('../models/skill')


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
 * @param {object} dungeon 
 * @param {object} output 
 * @returns {boolean}
 */
const resolveRoom = (dungeon, party, output) => {
    if (dungeon.room == undefined) {
        dungeon.room = dungeonRoomBuilder.build(dungeon, output)
    }
    output.print(dungeon.room.description)
    if (dungeon.room.event != undefined && dungeon.room.event instanceof Function) {
        dungeon.room.event(party)
        if (dungeon.room.resolved) {
            dungeon.room = undefined
        }
    }
}

/**
 * 
 * @param {object} party 
 * @param {object} output 
 * @returns {boolean}
 */
const resolveDoor = (party, room, output) => {
    let i = getRandomNumberInRange(0, 21)
    if (room.door == ENUM_DUNGEON_DOOR_STATUS.NONE) {
        if (i >= 0 && i <= 7) {
            doorStatus = ENUM_DUNGEON_DOOR_STATUS.OPEN
            output.print( get('dungeon-door-state-open'))
        } else if (i >= 8 && i <= 13) {
            doorStatus = ENUM_DUNGEON_DOOR_STATUS.CLOSED
            output.print( get('dungeon-door-state-closed-unlocked'))
        } else if (i >= 14 && i <= 17) {
            doorStatus = ENUM_DUNGEON_DOOR_STATUS.LOCKED
            output.print( get('dungeon-door-state-closed-locked'))
        } else if (i >= 18 && i <= 20) {
            doorStatus = ENUM_DUNGEON_DOOR_STATUS.HIDDEN
            output.print( get('dungeon-door-state-secret'))
        } else if (i == 21) {
            doorStatus = ENUM_DUNGEON_DOOR_STATUS.MAGIC_SEAL
            output.print( get('dungeon-door-state-sealed'))
        }
    }

    if (doorStatus == ENUM_DUNGEON_DOOR_STATUS.CLOSED) {
        output.print( get('dungeon-door-action-opens', [ party.name ]))
        return true
    } else if (doorStatus == ENUM_DUNGEON_DOOR_STATUS.LOCKED) {
        if (checkPartySkill(party, ENUM_SKILL_NAMES.lockPicking) > 0) {  
            output.print( get('dungeon-door-action-unlocks', [ party.name ]))
            return true
        }
    } else if (doorStatus == ENUM_DUNGEON_DOOR_STATUS.HIDDEN) {
        if (checkPartySkill(party, ENUM_SKILL_NAMES.steal) > 0) {  
            output.print( get('dungeon-door-action-fail', [ party.name ]))
            return true
        }
    } else if (doorStatus == ENUM_DUNGEON_DOOR_STATUS.MAGIC_SEAL) {
        if (checkPartySkill(party, ENUM_SKILL_NAMES.scholar) > 0) {  
            output.print( get('dungeon-door-action-seal-open', [ party.name ]))
            return true
        }
    }
    output.print( get('dungeon-door-action-fail', [ party.name ]))
    return false
}


module.exports = {
    getRoomDescriptionFromType,
    traverseDungeon,
    resolveRoom,
    resolveDoor,
    getFirstdungeonRoom
}
