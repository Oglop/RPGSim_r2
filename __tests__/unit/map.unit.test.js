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
})