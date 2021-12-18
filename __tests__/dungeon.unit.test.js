const m = require('../models/dungeon')

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
})