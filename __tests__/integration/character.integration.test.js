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
        const charMock = characterMock()

        commands.push({ command: ENUM_COMMANDS.INSERTCHARACTER, data: charMock })
        charMock.skills.forEach(s => {
            console.log(JSON.stringify(s))
            commands.push({ command: ENUM_COMMANDS.INSERTSKILL, data: s })    
        });
        charMock.languages.forEach(l => {
            console.log(JSON.stringify(l))
            commands.push({ command: ENUM_COMMANDS.INSERTLANGUAGE, data: l })    
        })

        await executeCommands(commands)

        const character = await getCharacterById('A1')
        character.skills = await getSkillByCharacterId('A1')
        character.languages = await getLanguageByCharacterId('A1')
        console.log('charMock-------------------------------------',JSON.stringify(charMock))
        console.log('character-------------------------------------',JSON.stringify(character))

        expect(character.name).toBe(charMock.name)
        expect(character.title).toBe(charMock.title)
        expect(character.description).toBe(charMock.description)
        expect(character.gender).toBe(charMock.gender)
        expect(character.birthDate).toStrictEqual(charMock.birthDate)
        expect(character.trait).toBe(charMock.trait)
        expect(character.age).toBe(charMock.age)
        expect(character.health).toBe(charMock.health)
        expect(character.maxHealth).toBe(charMock.maxHealth)
        expect(character.stamina).toBe(charMock.stamina)
        expect(character.maxStamina).toBe(charMock.maxStamina)
        expect(character.religion).toBe(charMock.religion)
        expect(character.coatOfArms).toBe(charMock.coatOfArms)
        expect(character.isAlive).toBe(charMock.isAlive)
        expect(character.stats.str).toBe(charMock.stats.str)
        expect(character.stats.vit).toBe(charMock.stats.vit)
        expect(character.stats.agi).toBe(charMock.stats.agi)
        expect(character.stats.wis).toBe(charMock.stats.wis)
        expect(character.stats.int).toBe(charMock.stats.int)
        expect(character.stats.cha).toBe(charMock.stats.cha)
        expect(character.stats.luc).toBe(charMock.stats.luc)
        expect(character.languages[0].language).toBe(ENUM_LANGUAGES.common)
        expect(character.languages[0].mastery).toBe(10)
        expect(character.skills.length).toBe(2)
 
        character.stats.str = 99
        await executeCommands([ { command: ENUM_COMMANDS.UPDATECHARACTER, data: character } ])
        const updatedCharacter = await getCharacterById('A1')
        expect(updatedCharacter.stats.str).toBe(99)
        await executeCommands([ 
            { command: ENUM_COMMANDS.DELETECHARACTER, data: 'A1' }
        ])
        const deletedCharacter = await getCharacterById('A1')
        expect(deletedCharacter).toBeFalsy()
    })
})