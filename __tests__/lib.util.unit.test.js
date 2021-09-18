const { generateID } = require('../lib/utils')

describe('util tests', () => {
    test('generateID to generate uniqe string', () => {
        const actual1 = generateID()
        const actual2 = generateID()
        const actual3 = generateID()
        expect(actual1).not.toBe(actual2)
        expect(actual2).not.toBe(actual3)
        expect(actual1).not.toBe(actual3)
    })    
})