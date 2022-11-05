const { 
    ENUM_GENDER, 
    ENUM_RACE_NAMES, 
    ENUM_JOB_NAMES, 
    ENUM_CHARACTER_TRAITS, 
    ENUM_GODS, 
    ENUM_LANGUAGES,
    ENUM_COMMANDS,
    ENUM_HEALTH_STATUS,
} = require('../../generic/enums')
const { textToDate } = require('../../lib/time')
const { migrate } = require('../../persistance').infrastructure
const { 
    getLanguageByCharacterId
} = require('../../persistance').queries
const { executeCommands } = require('../../persistance/commandQueue')

describe('persistance tests', () => {
    test('getLanguageByCharacterId should be instance of a function', () => {
        expect(getLanguageByCharacterId).toBeInstanceOf(Function)
    })
    test('language', async () => {
        let commands = []
        await migrate()

        commands.push({ command: ENUM_COMMANDS.INSERTLANGUAGE, data: {
            characterId: 'ABC',
            language: ENUM_LANGUAGES.commonElven,
            mastery: 10
        }})
        commands.push({ command: ENUM_COMMANDS.INSERTLANGUAGE, data: {
            characterId: 'ABC',
            language: ENUM_LANGUAGES.nobility,
            mastery: 20
        }})
        commands.push({ command: ENUM_COMMANDS.INSERTLANGUAGE, data: {
            characterId: 'DEF',
            language: ENUM_LANGUAGES.common,
            mastery: 10
        }})
        await executeCommands(commands)
        const languages = await getLanguageByCharacterId('ABC')
        expect(languages.length).toBe(2)
        commands = []
        commands.push({ command: ENUM_COMMANDS.UPDATELANGUAGEMASTERY, data: {
            characterId: 'ABC',
            language: ENUM_LANGUAGES.commonElven,
            mastery: 15
        }})
        await executeCommands(commands)
        const updatedLanguages = await getLanguageByCharacterId('ABC')
        const commonElven = updatedLanguages.find(l => l.language == ENUM_LANGUAGES.commonElven && l.characterId == 'ABC')
        expect(commonElven.mastery).toBe(15)
    })
})

