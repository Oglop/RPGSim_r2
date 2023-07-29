const mythosBuilder = require('../../build/mythos')

describe('mythos.build.unit.test', () => {
    test('build should return array of two gods', () => {
        const gods = mythosBuilder.build({numberOfGods: 2})
        expect(gods.length).toBe(2)
        expect(gods[0].id.length).toBeGreaterThan(1)
        expect(gods[0].name.length).toBeGreaterThan(1)
        expect(gods[0].profile.length).toBeGreaterThan(1)
        expect(gods[0].symbol.length).toBeGreaterThan(1)
    })
})