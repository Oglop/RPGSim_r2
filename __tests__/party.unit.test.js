const b = require('../build/party')


describe('party unit tests', () => {
    test('build should be instance of a funtion', () => {
        expect(b.build).toBeInstanceOf(Function)
    })
    test('build should return a party with of size', () => {
        const partySize = 6
        const actual = b.build(undefined, {
            partySize
        })
        expect(actual.members.length).toBe(partySize)
        expect(actual.food).toBeGreaterThan(actual.members.length)
        expect(actual.members[0].id.length).toBeGreaterThan(0)
        expect(actual.members[0].isAlive).toBeTruthy()
    })
    
})