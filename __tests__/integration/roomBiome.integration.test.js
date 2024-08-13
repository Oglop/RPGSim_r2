const { executeCommands } = require('../../persistance/commandQueue')
const { getRoomBiomeByRoomId } = require('../../persistance').queries
const { migrate } = require('../../persistance').infrastructure
const objects = require('../../generic/objects')
const { copyObject, generateID } = require('../../lib/utils')
const { ENUM_COMMANDS } = require('../../generic/enums')

describe('roomBiome integratiion tests', () => {
    test('insert roomBiome and get by room id', async () => {
        await migrate()
        const expected = copyObject(objects.roomBiomes)
        expected.id = generateID()
        expected.roomId = generateID()
        expected.earth = 1
        expected.clay = 2
        expected.sand = 3
        expected.rock = 4
        expected.iron = 5
        expected.silver = 6
        expected.gold = 7
        expected.mithril = 8
        expected.gems = 9
        expected.lava = 10
        expected.water = 11

        await executeCommands([
            {command: ENUM_COMMANDS.INSERT_ROOM_BIOMES, data: expected}
        ])

        const actual = await getRoomBiomeByRoomId(expected.roomId)

        expect(expected.id).toBe(actual.id)
        expect(expected.roomId).toBe(actual.roomId)
        expect(expected.earth).toBe(actual.earth)
        expect(expected.clay).toBe(actual.clay)
        expect(expected.sand).toBe(actual.sand)
        expect(expected.rock).toBe(actual.rock)
        expect(expected.iron).toBe(actual.iron)
        expect(expected.silver).toBe(actual.silver)
        expect(expected.gold).toBe(actual.gold)
        expect(expected.mithril).toBe(actual.mithril)
        expect(expected.gems).toBe(actual.gems)
        expect(expected.lava).toBe(actual.lava)
        expect(expected.water).toBe(actual.water)
    })
})