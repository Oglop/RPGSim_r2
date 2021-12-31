const b = require('../build/party')

const setWorldStartDate = (options) => {
    const objects = require('../generic/objects')
    const { copyObject } = require('../lib/utils')
    const date = copyObject(objects.date)
    date.year = 0
    date.month = 2
    date.day = 1
    return date
} 


describe('party unit tests', () => {
    test('build should be instance of a funtion', () => {
        expect(b.build).toBeInstanceOf(Function)
    })
    test('build should return a party with of size', () => {
        const partySize = 6
        const actual = b.build({
            partySize,
            date: setWorldStartDate()
        })
        expect(actual.members.length).toBe(partySize)
        expect(actual.food).toBeGreaterThan(actual.members.length)
        expect(actual.members[0].id.length).toBeGreaterThan(0)
        expect(actual.members[0].isAlive).toBeTruthy()
        expect(actual.members[0].health).toBeGreaterThan(0)
        expect(actual.members[0].health).toBe(actual.members[0].maxHealth)
    })
    
})