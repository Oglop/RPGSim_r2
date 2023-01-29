const { executeCommands } = require('../../persistance/commandQueue')
const { getDwellingRumorsByDwellingId } = require('../../persistance').queries
const { migrate } = require('../../persistance').infrastructure
const { ENUM_COMMANDS } = require('../../generic/enums')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')

describe('dwellingRumor integration tests', () => {
    
    test('dwellingRumor should insert, get and delete', async () => {
        await migrate()
        const dwellingRumor1 = copyObject(objects.dwellingRumor)
        dwellingRumor1.dwellingId = 'dwelling_1'
        dwellingRumor1.rumorId = 'rumor_1'

        const dwellingRumor2 = copyObject(objects.dwellingRumor)
        dwellingRumor2.dwellingId = 'dwelling_1'
        dwellingRumor2.rumorId = 'rumor_2'

        const dwellingRumor3 = copyObject(objects.dwellingRumor)
        dwellingRumor3.dwellingId = 'dwelling_2'
        dwellingRumor3.rumorId = 'rumor_2'

        await executeCommands([
            { command: ENUM_COMMANDS.INSERT_DWELLING_RUMOR, data: dwellingRumor1 },
            { command: ENUM_COMMANDS.INSERT_DWELLING_RUMOR, data: dwellingRumor2 },
            { command: ENUM_COMMANDS.INSERT_DWELLING_RUMOR, data: dwellingRumor3 }
        ])

        const dwellingRumors1 = await getDwellingRumorsByDwellingId(dwellingRumor1.dwellingId)
        expect(dwellingRumors1.length).toBe(2)

        await executeCommands([
            { command: ENUM_COMMANDS.DELETE_DWELLING_RUMOR, data: dwellingRumor1.rumorId }
        ])

        const dwellingRumors2 = await getDwellingRumorsByDwellingId(dwellingRumor1.dwellingId)
        expect(dwellingRumors2.length).toBe(1)

    })
})