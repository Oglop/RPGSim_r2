const { executeCommands } = require('../../persistance/commandQueue')
const { getPartyRumorByPartyId } = require('../../persistance').queries
const { migrate } = require('../../persistance').infrastructure
const { ENUM_COMMANDS } = require('../../generic/enums')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')

describe('partyRumor integration tests', () => {
    
    test('partyRumor should insert, get and delete', async () => {
        await migrate()
        const partyRumor1 = copyObject(objects.partyRumor)
        partyRumor1.partyId = 'party_1'
        partyRumor1.rumorId = 'rumor_1'

        const partyRumor2 = copyObject(objects.partyRumor)
        partyRumor2.partyId = 'party_1'
        partyRumor2.rumorId = 'rumor_2'

        const partyRumor3 = copyObject(objects.partyRumor)
        partyRumor3.partyId = 'party_2'
        partyRumor3.rumorId = 'rumor_2'

        await executeCommands([
            { command: ENUM_COMMANDS.INSERT_PARTY_RUMOR, data: partyRumor1 },
            { command: ENUM_COMMANDS.INSERT_PARTY_RUMOR, data: partyRumor2 },
            { command: ENUM_COMMANDS.INSERT_PARTY_RUMOR, data: partyRumor3 }
        ])

        const partyRumors1 = await getPartyRumorByPartyId(partyRumor1.partyId)
        expect(partyRumors1.length).toBe(2)

        await executeCommands([
            { command: ENUM_COMMANDS.DELETE_PARTY_RUMOR, data: partyRumor1.rumorId }
        ])

        const partyRumors2 = await getPartyRumorByPartyId(partyRumor1.partyId)
        expect(partyRumors2.length).toBe(1)

    })
})