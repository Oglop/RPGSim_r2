const { 
    ENUM_GENDER, 
    ENUM_RACE_NAMES, 
    ENUM_JOB_NAMES, 
    ENUM_CHARACTER_TRAITS, 
    ENUM_GODS, 
    ENUM_LANGUAGES,
    ENUM_COMMANDS,
    ENUM_HEALTH_STATUS,
    ENUM_PARTY_STATE,
    ENUM_QUEST_STATUS
} = require('../../generic/enums')
const { textToDate } = require('../../lib/time')
const { migrate } = require('../../persistance').infrastructure
/*const { 
    listParties
} = require('../../persistance').queries*/
const { executeCommands } = require('../../persistance/commandQueue')

const party = {
    id: 'ABC',
    name: 'test_party',
    karma: 0,
    members: [{ id:'111' }, { id:'222' },{ id:'333' }],
    path: [],
    state: ENUM_PARTY_STATE.RESTING,
    position: { x: 10, y: 11 },
    quest: {},
    questStatus: ENUM_QUEST_STATUS.NONE,
    questGoal: { x: 20, y: 22 },
    crowns:10,
    food:15
}


describe('party.integration.test', () => {
    test('listParties should be instance of Function', () => {
        expect(listParties).toBeInstanceOf(Function)
    })
    test('party', async () => {
        await migrate()
        let commands = []
        commands.push({ command: ENUM_COMMANDS.INSERT_PARTY, data: party })
        await executeCommands(commands)
        const partiesList1 = await listParties()
        expect(partiesList1.length).toBe(1)


    })
})