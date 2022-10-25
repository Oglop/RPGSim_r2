const b = require('../../build/dungeon');
const buildDungeonRoom = require('../../build/dungeonRoom')
const { ENUM_EVENT_TYPE } = require('../../generic/enums')
const { get } = require('../../localization')

describe('dungeon.build.unit.test', () => {
    /*it('should return a flickers event', () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.0;
        global.Math = mockMath;
        const desc = get('dungeon-flickeringlights-description')

        const actual = b.build(undefined, undefined, ENUM_EVENT_TYPE.DUNGEON, {})

        expect(actual.execute).toBeInstanceOf(Function)
        expect(actual.description).toBe(desc)

    })*/
    it('buildDungeonRoom should return a dungeon room', () => {
        const output = { print: () => {} }
        const r = buildDungeonRoom.build(output)
        expect(r.description.length).toBeGreaterThan(0)
        expect(r.event).toBeInstanceOf(Object)

    })
})
    