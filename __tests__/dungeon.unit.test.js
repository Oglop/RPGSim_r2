const m = require('../models/dungeon')
const b = require('../build/event');
const buildDungeonRoom = require('../build/dungeonRoom')
const { ENUM_EVENT_TYPE } = require('../generic/enums')
const { get } = require('../localization')

describe('dungeon tests', () => {
    it('should be instance of  function', () => {
        expect(m.getFirstdungeonRoom).toBeInstanceOf(Function);
    })
    it('should return a room with id start', () => {
        const dungeon = { rooms: [{
            id: 'start',
            description: 'correct room',
            dungeonEvent: () => {}
        },{
            id: '12345',
            description:'wrong room',
            dungeonEvent: () => {}
        }]}
        const actual = m.getFirstdungeonRoom(dungeon)
        expect(actual.description).toBe('correct room')
    })
    it('should return a room by id ', () => {
        const dungeon = { rooms: [{
            id: '1234',
            description: 'wrong room',
            dungeonEvent: () => {},
            door: {
                to: '5678'
            }
        },{
            id: '5678',
            description:'correct room',
            dungeonEvent: () => {},
            door: {
                to: '5678'
            }
        }]}
        const currentRoom = dungeon.rooms[0]
        const actual = m.traverseDungeon(currentRoom, dungeon)
        expect(actual.description).toBe('correct room')
    })
    it('should return a flickers event', () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.0;
        global.Math = mockMath;
        const desc = get('dungeon-flickeringlights-description')

        const actual = b.build(undefined, undefined, ENUM_EVENT_TYPE.DUNGEON, {})

        expect(actual.execute).toBeInstanceOf(Function)
        expect(actual.description).toBe(desc)

    })
    it('buildDungeonRoom should return a dungeon room', () => {
        const output = { print: () => {} }
        const r = buildDungeonRoom.build(output)
        expect(r.description.length).toBeGreaterThan(0)
        expect(r.event).toBeInstanceOf(Object)

    })
})