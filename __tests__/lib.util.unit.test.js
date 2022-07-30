const { 
    generateID, 
    capitalizeFirstLetter, 
    getRandomElementFromArray,
    point2d,
    isPoint2dInArray,
    copyObject
} = require('../lib/utils')

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
    it('point2d should be an object with x and y', () => {
        const actual = point2d(1, 2)
        expect(typeof(actual)).toBe('object')
        expect(actual.x).toBe(1)
        expect(actual.y).toBe(2)
    })
    it('isPoint2dInArray should return true if point2d is in array', () => {
        const positions = []
        positions.push(point2d(1, 1))
        positions.push(point2d(2, 2))
        const exists = point2d(1, 1)
        const actual = isPoint2dInArray(positions, exists)
        expect(actual).toBeTruthy()
    })
    it('isPoint2dInArray should return false if point2d is not in array', () => {
        const positions = []
        positions.push(point2d(1, 1))
        positions.push(point2d(2, 2))
        const notExists = point2d(3, 3)
        const actual = isPoint2dInArray(positions, notExists)
        expect(actual).toBeFalsy()
    })

    it('should copy the object given as argument', () => {
        const expected = {
            key: 'value'
        }
        const actual = copyObject(expected)
        expect(expected.key).toBe(actual.key)
    })

    it('should copy the object and add the id given as argument', () => {
        const expected = {
            key: 'value'
        }
        const actual = copyObject(expected, true)
        expect(expected.key).toBe(actual.key)
        expect(actual.id).toBeTruthy()
    })
})