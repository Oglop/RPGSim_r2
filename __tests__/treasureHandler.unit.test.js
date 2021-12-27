const { getTreasure, getTreasureValue } = require('../handlers/treasureHandler')

describe('treasureHandler tests', () => {
    test('getTreasure should be an instance of Function', () => {
        expect(getTreasure).toBeInstanceOf(Function)
    })
    test('getTreasure should return lv 10 treasure when input level is 10', () => {
        const actual = getTreasure(10)
        expect(actual.name).toBe('a pouch of coins')
    })
    test('getTreasure should return lv 1 treasure when input level is 0', () => {
        const actual = getTreasure(0)
        expect(actual.name).toBe('a few coins')
    })
    test('getTreasure should return lv 20 treasure when input level is 21', () => {
        const actual = getTreasure(21)
        expect(actual.name).toBe('a golden gemmed crown')
    })
    test('getTreasureValue should return an integer value bvetween min and max', () => {
        const actual = getTreasureValue( { min: 1, max: 4 } )
        expect(actual).toBeGreaterThanOrEqual(1)
        expect(actual).toBeLessThanOrEqual(4)
    })
    test('getTreasureValue should return 0 when there is no input', () => {
        const actual = getTreasureValue(  )
        expect(actual).toBe(0)
    })
})

