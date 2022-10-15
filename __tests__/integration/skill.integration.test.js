const { 
    ENUM_GENDER, 
    ENUM_RACE_NAMES, 
    ENUM_JOB_NAMES, 
    ENUM_CHARACTER_TRAITS, 
    ENUM_STAT_NAMES,
    ENUM_GODS, 
    ENUM_COMMANDS,
    ENUM_HEALTH_STATUS,
    ENUM_LANGUAGES
} = require('../../generic/enums')
const { textToDate } = require('../../lib/time')
const { migrate } = require('../../persistance').infrastructure
const { 
    getSkillByCharacterId,
} = require('../../persistance').queries
const { executeCommands } = require('../../persistance/commandQueue')

describe('persistance tests skill', () => {
    test('should insert update and get skill', async () => {
        commands = []
        await migrate()
        const expected_a = { id: '111', characterId: 'aaa', name: 'aName' , statsBase: ENUM_STAT_NAMES.agi, luckTest: true, mastery: 1}
        const expected_b = { id: '222', characterId: 'bbb', name: 'bName' , statsBase: ENUM_STAT_NAMES.str, luckTest: false, mastery: 10}

        await executeCommands([
            { command: ENUM_COMMANDS.INSERTSKILL, data: expected_a},
            { command: ENUM_COMMANDS.INSERTSKILL, data: expected_b}
        ])

        const actual_a = await getSkillByCharacterId('aaa')
        const actual_b = await getSkillByCharacterId('bbb')

        expect(actual_a.length).toBe(1)
        expect(actual_a[0].id).toBe('111')
        expect(actual_a[0].characterId).toBe('aaa')
        expect(actual_a[0].name).toBe('aName')
        expect(actual_a[0].statsBase).toBe(ENUM_STAT_NAMES.agi)
        expect(actual_a[0].luckTest).toBe(true)
        expect(actual_a[0].mastery).toBe(1)
        expect(actual_b.length).toBe(1)
        expect(actual_b[0].id).toBe('222')
        expect(actual_b[0].characterId).toBe('bbb')
        expect(actual_b[0].name).toBe('bName')
        expect(actual_b[0].statsBase).toBe(ENUM_STAT_NAMES.str)
        expect(actual_b[0].luckTest).toBe(false)
        expect(actual_b[0].mastery).toBe(10)

        actual_a[0].mastery = 99
        
        await executeCommands([
            { command: ENUM_COMMANDS.UPDATE_SKILL, data: actual_a[0]}
        ])
        const updated_a = await getSkillByCharacterId('aaa')
        expect(updated_a[0].mastery).toBe(99)
    })
})