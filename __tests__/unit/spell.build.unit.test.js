const b = require('../../build/spell')
const { ENUM_SPELLS } = require('../../generic/enums')


describe('build.spell', () => {
    test('should be instance of function', () => {
        expect(b.build).toBeInstanceOf(Function)
    })

    test('should return a spell of third eye', () => {
        const actual = b.build(ENUM_SPELLS.THIRD_EYE)
        expect(actual.name).toBe('third eye'),
        expect(actual.type).toBe(ENUM_SPELLS.THIRD_EYE)
        expect(actual.cost).toBe(2)
    })
})
