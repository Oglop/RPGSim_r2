
const { build } = require('../build/coatOfArms')

describe('build coat of arms', () => {
    test('build should return a string of a coat of arms', () => {
        const actual = build()
        expect(actual.length).toBeGreaterThan(0)
        expect(typeof(actual)).toBe('string')
    })
})