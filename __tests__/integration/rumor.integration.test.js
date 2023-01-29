const rumorBuilder = require('../../build/rumor')
const { executeCommands } = require('../../persistance/commandQueue')
const { getRumorById } = require('../../persistance').queries
const { migrate } = require('../../persistance').infrastructure
const { ENUM_RUMOR_TYPE, ENUM_COMMANDS } = require('../../generic/enums')

describe('rumor integration tests', () => {
    
    test('rumor integration', async () => {
        await migrate()
        const rumorInitial = rumorBuilder.build({
            position: {
                x:10,
                y:10
            },
            type: ENUM_RUMOR_TYPE.RUIN
        })

        await executeCommands([
            { command: ENUM_COMMANDS.INSERT_RUMOR, data: rumorInitial }
        ])

        const rumorActualFirst = await getRumorById(rumorInitial.id)
        expect(rumorActualFirst.id).toBe(rumorInitial.id)
        expect(rumorActualFirst.type).toBe(rumorInitial.type)
        expect(rumorActualFirst.target.x).toBe(rumorInitial.target.x)
        expect(rumorActualFirst.target.y).toBe(rumorInitial.target.y)

        rumorActualFirst.type = ENUM_RUMOR_TYPE.TREASURE
        rumorActualFirst.questId = '123456789'
        rumorActualFirst.target.x = 20
        rumorActualFirst.target.y = 21

        await executeCommands([
            { command: ENUM_COMMANDS.UPDATE_RUMOR, data: rumorActualFirst }
        ])

        const rumorActualSecond = await getRumorById(rumorInitial.id)
        expect(rumorActualSecond.id).toBe(rumorInitial.id)
        expect(rumorActualSecond.type).toBe(ENUM_RUMOR_TYPE.TREASURE)
        
        expect(rumorActualSecond.target.x).toBe(20)
        expect(rumorActualSecond.target.y).toBe(21)
        expect(rumorActualSecond.questId).toBe('123456789')
    })
})



