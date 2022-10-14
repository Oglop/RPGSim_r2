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
    getCharacterById,
    getSkillByCharacterId,
    getLanguageByCharacterId
} = require('../../persistance').queries
const { executeCommands } = require('../../persistance/commandQueue')

const characterMock = () => {

    return {
        id: 'A1',
        name: 'Name',
        family: 'family',
        coatOfArms: 'coat of arms',
        title: 'title',
        description: 'this is a description',
        gender: ENUM_GENDER.FEMALE,
        marriedTo: undefined,
        mother: 'B2',
        father: 'C3',
        pregnant: false,
        pregnantTime: 1,
        job: ENUM_JOB_NAMES.cleric,
        race: ENUM_RACE_NAMES.darkElf,
        languages: [{characterId:'A1', mastery: 10, language: ENUM_LANGUAGES.common}],
        skills: [
            {characterId: 'A1', name: 'a1' , statsBase: ENUM_STAT_NAMES.agi, luckTest: true, mastery: 1},
            {characterId: 'A1', name: 'b1' , statsBase: ENUM_STAT_NAMES.str, luckTest: false, mastery: 10}
        ],
        statuses: [ENUM_HEALTH_STATUS.UNCONSCIOUS],
        spells: [],
        birthDate: textToDate('111-2-3'),
        trait: ENUM_CHARACTER_TRAITS.ABOMINATION,
        age: 20,
        stats: {
            str: 2,
            vit: 3,
            agi: 4,
            wis: 5,
            int: 6,
            cha: 7,
            luc: 8
        },
        health: 100,
        maxHealth: 123,
        stamina: 100,
        maxStamina: 123,
        religion: ENUM_GODS.Neybne,
        personality: undefined,
        relationships: [],
        history: [],
        isAlive: true,
        diedFrom:undefined,
        equipment: {
            head: undefined,
            weaponHand: undefined,
            shieldHand:undefined,
            body: undefined
        }
    }
}

describe('persistance tests', () => {
    

    test('character', async () => {
        commands = []
        await migrate()
        const characterMock = characterMock()

        commands.push({ command: ENUM_COMMANDS.INSERTCHARACTER, data: characterMock })
        characterMock.skills.forEach(s => {
            commands.push({ command: ENUM_COMMANDS.INSERTSKILL, data: s })    
        });
        characterMock.languages.forEach(l => {
            commands.push({ command: ENUM_COMMANDS.INSERTLANGUAGE, data: l })    
        })
        await executeCommands(commands)

        const character = await getCharacterById('A1')
        character.skills = await getSkillByCharacterId('A1')
        character.languages = await getLanguageByCharacterId('A1')
        
        expect(character.name).toBe(characterMock.name)
        expect(character.title).toBe(characterMock.title)
        expect(character.description).toBe(characterMock.description)
        expect(character.gender).toBe(characterMock.gender)
        expect(character.birthDate).toStrictEqual(characterMock.birthDate)
        expect(character.trait).toBe(characterMock.trait)
        expect(character.age).toBe(characterMock.age)
        expect(character.health).toBe(characterMock.health)
        expect(character.maxHealth).toBe(characterMock.maxHealth)
        expect(character.stamina).toBe(characterMock.stamina)
        expect(character.maxStamina).toBe(characterMock.maxStamina)
        expect(character.religion).toBe(characterMock.religion)
        expect(character.coatOfArms).toBe(characterMock.coatOfArms)
        expect(character.isAlive).toBe(characterMock.isAlive)
        expect(character.stats.str).toBe(characterMock.stats.str)
        expect(character.stats.vit).toBe(characterMock.stats.vit)
        expect(character.stats.agi).toBe(characterMock.stats.agi)
        expect(character.stats.wis).toBe(characterMock.stats.wis)
        expect(character.stats.int).toBe(characterMock.stats.int)
        expect(character.stats.cha).toBe(characterMock.stats.cha)
        expect(character.stats.luc).toBe(characterMock.stats.luc)
        expect(character.languages[0].language).toBe(ENUM_LANGUAGES.common)
        expect(character.languages[0].mastery).toBe(10)
        expect(character.skills.length).toBe(2)
 

        character.stats.str = 99
        await executeCommands([ { command: ENUM_COMMANDS.UPDATECHARACTER, data: character } ])
        const updatedCharacter = await getCharacterById('A1')
        expect(updatedCharacter.stats.str).toBe(99)
    })
})