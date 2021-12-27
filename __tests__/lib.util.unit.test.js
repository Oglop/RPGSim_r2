const { generateID, capitalizeFirstLetter, getRandomElementFromArray } = require('../lib/utils')

describe('util tests', () => {
    it('should generate uniqe stringa', () => {
        const actual1 = generateID()
        const actual2 = generateID()
        const actual3 = generateID()
        expect(actual1).not.toBe(actual2)
        expect(actual2).not.toBe(actual3)
        expect(actual1).not.toBe(actual3)
    })    
    it('should capitilaze first letter', () => {
        const expected = 'Aa'
        const actual = capitalizeFirstLetter('aa')
        expect(actual).toBe(expected)
    })
    it('should be an instance of a getRandomElementInArray function', () => {
        expect(getRandomElementFromArray).toBeInstanceOf(Function)
    })
    it('getRandomElementFromArray should return the only element from array', () => {
        const expected = 'ABC'
        const arr = [{ id:expected }]
        const actual = getRandomElementFromArray(arr)
        expect(actual.id).toBe(expected)
    })
})