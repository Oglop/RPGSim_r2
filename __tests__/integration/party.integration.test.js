const { 
    ENUM_GENDER, 
    ENUM_RACE_NAMES, 
    ENUM_JOB_NAMES, 
    ENUM_CHARACTER_TRAITS, 
    ENUM_GODS, 
    ENUM_LANGUAGES,
    ENUM_COMMANDS,
    ENUM_HEALTH_STATUS,
    ENUM_PERSONALITIES,
    ENUM_PARTY_STATE,
    ENUM_QUEST_STATUS
} = require('../../generic/enums')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')
const { migrate } = require('../../persistance').infrastructure
const { loadParty, saveParty } = require('../../persistance').aggregates
const { executeCommands } = require('../../persistance/commandQueue')


const getCharacter = (id, name) => {
    const c = copyObject(objects.character)
    c.id = id
    c.name = name
    c.job = ENUM_JOB_NAMES.cleric
    c.race = ENUM_RACE_NAMES.darkElf
    c.birthDate = { year:1000, month:1, day:1 }
    c.age = 20,
    c.stats = {
        str: 2,
        vit: 3,
        agi: 4,
        wis: 5,
        int: 6,
        cha: 7,
        luc: 8
    }
    c.health = 100
    c.maxHealth = 123
    c.stamina = 100
    c.maxStamina = 123
    c.religion = ENUM_GODS.Neybne
    c.personality = ENUM_PERSONALITIES.AMBITIOUS
    c.relationships = []
    c.history = []
    c.isAlive = true
    c.equipment = {
        head: {
            id: `${id}_helmId`,
            type: 0,
            name: 'helm',
            min: 0,
            max: 2,
            value: 1,
            skillRequired: 'skill'
        },
        weaponHand: undefined,
        shieldHand:undefined,
        body: undefined
    }
    return c
}


const getParty = () => {
    const p = copyObject(objects.party)
    p.id = 'ABC'
    p.name = 'test_party'
    p.karma = 4
    p.members = []
    p.path = []
    p.state = ENUM_PARTY_STATE.RESTING
    p.position = { x: 10, y: 11 }
    p.quest = {}
    p.questStatus = ENUM_QUEST_STATUS.NONE
    p.questGoal = { x: 20, y: 22 }
    p.crowns = 10
    p.food = 15

    for (let i = 0; i < 1; i++) {
        const c = getCharacter(`id${i}`, `name${i}`)
        p.members.push(c)
    }

    return p
}


describe('party.integration.test', () => {
    test('loadParty should be instance of Function', () => {
        expect(loadParty).toBeInstanceOf(Function)
    })
    test('saveParty should be instance of Function', () => {
        expect(saveParty).toBeInstanceOf(Function)
    })
    xtest('party aggregate', async () => {
        await migrate()
        const createdParty = getParty()
        await executeCommands([{ command: ENUM_COMMANDS.SAVE_PARTY, data: createdParty }])
        const loadedParty = await loadParty(createdParty.id)
        //expect(loadedParty.members.length).toBe(1)
        expect(loadedParty.name).toBe('test_party')
        expect(loadedParty.position.x).toBe(10)
        expect(loadedParty.position.y).toBe(11)
        loadedParty.position = {
            x: 20,
            y: 21
        }
        loadParty.crowns = 100
        await executeCommands([{ command: ENUM_COMMANDS.SAVE_PARTY, data: loadedParty }])
        const updatedParty = await loadParty(createdParty.id)
        expect(updatedParty.name).toBe('test_party')
        expect(updatedParty.position.x).toBe(20)
        expect(updatedParty.position.y).toBe(21)
        expect(updatedParty.crowns).toBe(100)
        //expect(updatedParty.members.length).toBe(1)
        
    })
})