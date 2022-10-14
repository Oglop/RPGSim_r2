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

const characterStub = () => {

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
        const stub = characterStub()

        commands.push({ command: ENUM_COMMANDS.INSERTCHARACTER, data: stub })
        stub.skills.forEach(s => {
            commands.push({ command: ENUM_COMMANDS.INSERTSKILL, data: s })    
        });
        stub.languages.forEach(l => {
            commands.push({ command: ENUM_COMMANDS.INSERTLANGUAGE, data: l })    
        })
        await executeCommands(commands)

        const character = await getCharacterById('A1')
        character.skills = await getSkillByCharacterId('A1')
        character.languages = await getLanguageByCharacterId('A1')
        
        expect(character.name).toBe(stub.name)
        expect(character.title).toBe(stub.title)
        expect(character.description).toBe(stub.description)
        expect(character.gender).toBe(stub.gender)
        expect(character.birthDate).toStrictEqual(stub.birthDate)
        expect(character.trait).toBe(stub.trait)
        expect(character.age).toBe(stub.age)
        expect(character.health).toBe(stub.health)
        expect(character.maxHealth).toBe(stub.maxHealth)
        expect(character.stamina).toBe(stub.stamina)
        expect(character.maxStamina).toBe(stub.maxStamina)
        expect(character.religion).toBe(stub.religion)
        expect(character.coatOfArms).toBe(stub.coatOfArms)
        expect(character.isAlive).toBe(stub.isAlive)
        expect(character.stats.str).toBe(stub.stats.str)
        expect(character.stats.vit).toBe(stub.stats.vit)
        expect(character.stats.agi).toBe(stub.stats.agi)
        expect(character.stats.wis).toBe(stub.stats.wis)
        expect(character.stats.int).toBe(stub.stats.int)
        expect(character.stats.cha).toBe(stub.stats.cha)
        expect(character.stats.luc).toBe(stub.stats.luc)
        expect(character.languages[0].language).toBe(ENUM_LANGUAGES.common)
        expect(character.languages[0].mastery).toBe(10)
        expect(character.skills.length).toBe(2)


        character.stats.str = 99
        await executeCommands([ { command: ENUM_COMMANDS.UPDATECHARACTER, data: character } ])
        const updatedCharacter = await getCharacterById('A1')
        expect(updatedCharacter.stats.str).toBe(99)
    })
})