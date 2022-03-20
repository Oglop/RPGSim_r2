const {
    date,
    textToDate,
    dateToText
} = require('../lib/time')
const {
    copyObject
} = require('../lib/utils')


describe('time date test', () => {
    test('textToDate should be instance of function', () => {
        expect(textToDate).toBeInstanceOf(Function)
    })
    test('dateToText should be instance of function', () => {
        expect(textToDate).toBeInstanceOf(Function)
    })
    
    test('dateToText should return a text in correct format', () => {
        const d = copyObject(date)
        d.year = 99
        d.month = 1
        d.day = 12
        const actual = dateToText(d)
        expect(actual).toBe('99-1-12')
    })
    test('textToDate should return a date object when provided valid text', () => {
        const actual = textToDate('1111-2-3')
        expect(actual.year).toBe(1111)
        expect(actual.month).toBe(2)
        expect(actual.day).toBe(3)
    })
    test('textToDate should throw error when not provided with valid string', () => {
        try {
            textToDate('1111')
        } catch (e) {
            expect(e.message).toBe(`Unable to parse string 1111 to date object.`)
        }
    })
    test('textToDate should throw error when not provided with undefined string', () => {
        try {
            textToDate(undefined)
        } catch (e) {
            expect(e.message).toBe(`Unable to parse string  to date object.`)
        }
    })
})