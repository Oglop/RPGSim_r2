const { generateID, capitalizeFirstLetter } = require('../lib/utils')

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
})