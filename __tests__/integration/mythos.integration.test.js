const { 
    ENUM_COMMANDS
} = require('../../generic/enums')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')
const { migrate } = require('../../persistance').infrastructure
const { listGods } = require('../../persistance').queries
const { executeCommands } = require('../../persistance/commandQueue')


describe('mythos.integration.test', () => {
    test('listGods should be instance of Function', () => {
        expect(listGods).toBeInstanceOf(Function)
    })
    test('mythos integration tests', async () => {
        await migrate()
        const commands = []
        const gods = [
            {
                id: 'id1',
                name: 'name1',
                profile: 'profile1',
                symbol: 'symbol1'
            },
            {
                id: 'id2',
                name: 'name2',
                profile: 'profile2',
                symbol: 'symbol2'
            }
        ]
        for (let god of gods) {
            commands.push({ command: ENUM_COMMANDS.INSERT_GOD, data: god })
        }
        await executeCommands(commands)
        const actual = await listGods()

        expect(actual.length).toBe(2)
        expect(actual[0].id).toBe('id1')
        expect(actual[0].name).toBe('name1')
        expect(actual[0].profile).toBe('profile1')
        expect(actual[0].symbol).toBe('symbol1')
        
    })
})

