const { 
    ENUM_GENDER, 
    ENUM_RACE_NAMES, 
    ENUM_JOB_NAMES, 
    ENUM_CHARACTER_TRAITS, 
    ENUM_GODS, 
    ENUM_COMMANDS 
} = require('../../generic/enums')
const { textToDate } = require('../../lib/time')
const { migrate } = require('../../persistance').infrastructure
const { 
    getCharacterById 
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
        languages: ['language'],
        skills: ['skill'],
        statuses: ['alive'],
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
        await migrate()
        const stub = characterStub()
        await executeCommands([ { command: ENUM_COMMANDS.INSERTCHARACTER, data: stub } ])

        const character = await getCharacterById('A1')

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
    })
})