const m = require('../../models/map')

describe('map model', () => {
    test('getDwellingById should be instance of Function', () => {
        expect(m.getDwellingById).toBeInstanceOf(Function)
    })
    test('getDwellingPositionById should be instance of Function', () => {
        expect(m.getDwellingPositionById).toBeInstanceOf(Function)
    })
    test('getPointOfRandomDwelling should be instance of Function', () => {
        expect(m.getPointOfRandomDwelling).toBeInstanceOf(Function)
    })
    test('getDwellingById should be instance of Function', () => {
        expect(m.getDwellingById).toBeInstanceOf(Function)
    })
    test('getBiomeAtPoint should be instance of Function', () => {
        expect(m.getBiomeAtPoint).toBeInstanceOf(Function)
    })
    test('mapSafeCoordinates should be instance of Function', () => {
        expect(m.mapSafeCoordinates).toBeInstanceOf(Function)
    })
    test('mapSafeCoordinates should return x 0', () => {
        const actual = m.mapSafeCoordinates({ x:-1, y:0 })
        expect(actual.x).toBe(0)
    })
    test('mapSafeCoordinates should return x 100', () => {
        const actual = m.mapSafeCoordinates({ x:0, y:200 })
        expect(actual.y).toBe(100)
    })

})