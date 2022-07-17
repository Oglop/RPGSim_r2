const { ENUM_SPELLS } = require('../generic/enums')
const {
    partyHasSpell, 
    characterHasSpell
} = require('../models/spell')

describe('models.spells', () => {
    test('partyHasSpell should be instance of function', () => {
        expect(partyHasSpell).toBeInstanceOf(Function)
    })

    test('partyHasSpell should return character with spell type', () => {
        const expectedLength = 1
        const expectedName = 'testA'
        const party = {
            members: [{
                name:'testA',
                spells: [{
                    type: ENUM_SPELLS.THIRD_EYE
                }]
            },
            {
                name:'testB',
                spells: [{
                    type: ENUM_SPELLS.HEAL
                }]
            }]
        }
        const actual = partyHasSpell(party, ENUM_SPELLS.THIRD_EYE)
        expect(actual.length).toBe(expectedLength)
        expect(actual[0].name).toBe(expectedName)
    })

    test('characterHasSpell should be instance of function', () => {
        expect(characterHasSpell).toBeInstanceOf(Function)
    })

    test('character with spell should return array of character', () => {
        const expectedLength = 1
        const expectedName = 'testA'
        const character = {
            name:'testA',
            spells: [{
                type: ENUM_SPELLS.THIRD_EYE
            }]
        }
        const actual = characterHasSpell(character, ENUM_SPELLS.THIRD_EYE)
        expect(actual.length).toBe(expectedLength)
        expect(actual[0].name).toBe(expectedName)
    })
    
    test('character without spell should return empty array', () => {
        const expectedLength = 0
        const expectedName = 'testA'
        const character = {
            name:'testA',
            spells: [{
                type: ENUM_SPELLS.HEAL
            }]
        }
        const actual = characterHasSpell(character, ENUM_SPELLS.THIRD_EYE)
        expect(actual.length).toBe(expectedLength)
    })
})
