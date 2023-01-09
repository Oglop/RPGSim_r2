const {
    date,
    textToDate,
    dateToText,
    moonPhase,
    moonPhaseText,
    daysPast,
} = require('../../lib/time')
const {
    copyObject
} = require('../../lib/utils')
const {
    ENUM_MOON_PHASE
} = require('../../generic/enums')


describe('time date test', () => {
    test('textToDate should be instance of function', () => {
        expect(textToDate).toBeInstanceOf(Function)
    })
    test('dateToText should be instance of function', () => {
        expect(textToDate).toBeInstanceOf(Function)
    })
    test('moonPhase should be instance of function', () => {
        expect(moonPhase).toBeInstanceOf(Function)
    })
    test('moonPhaseText should be instance of function', () => {
        expect(moonPhaseText).toBeInstanceOf(Function)
    })
    test('daysPast should be instance of function', () => {
        expect(daysPast).toBeInstanceOf(Function)
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

    test('daysPast should return 1 day when next day', () => {
        const currentDate = copyObject(date)
        currentDate.year = 100
        currentDate.month = 1
        currentDate.day = 2

        const historicDate = copyObject(date)
        historicDate.year = 100
        historicDate.month = 1
        historicDate.day = 1


        const actual = daysPast(currentDate, historicDate)
        expect(actual).toBe(1)
    })
    
    test('daysPast should return 244 day when hisoric date is exactly one year past', () => {
        const currentDate = copyObject(date)
        currentDate.year = 100
        currentDate.month = 1
        currentDate.day = 1

        const historicDate = copyObject(date)
        historicDate.year = 99
        historicDate.month = 1
        historicDate.day = 1

        const actual = daysPast(currentDate, historicDate)
        expect(actual).toBe(244)
    })


    test('daysPast should return 21 day when historic date is last year', () => {
        const currentDate = copyObject(date)
        currentDate.year = 100
        currentDate.month = 0
        currentDate.day = 10

        const historicDate = copyObject(date)
        historicDate.year = 99
        historicDate.month = 11
        historicDate.day = 10

        const actual = daysPast(currentDate, historicDate)
        expect(actual).toBe(21)
    })

    test('daysPast should return 490 when two fulle years passed', () => {
        const currentDate = copyObject(date)
        currentDate.year = 100
        currentDate.month = 0
        currentDate.day = 1

        const historicDate = copyObject(date)
        historicDate.year = 98
        historicDate.month = 0
        historicDate.day = 1

        const actual = daysPast(currentDate, historicDate)
        expect(actual).toBe(490)
    })

    test('Phase of moon should be NEW', () => {
        const date = {
            year: 100,
            month: 3,
            day: 4
        }
        const actual = moonPhase(date)
        expect(actual).toBe(ENUM_MOON_PHASE.NEW)
    })

    test('Phase of moon should be WAXING', () => {
        const date = {
            year: 100,
            month: 3,
            day: 6
        }
        const actual = moonPhase(date)
        expect(actual).toBe(ENUM_MOON_PHASE.WAXING_CRESCENT)
    })

    test('Phase of moon should be FULL', () => {
        const date = {
            year: 100,
            month: 3,
            day: 15
        }
        const actual = moonPhase(date)
        expect(actual).toBe(ENUM_MOON_PHASE.FULL)
    })

    test('Phase of moon should be THIRD QUARTER', () => {
        const date = {
            year: 100,
            month: 3,
            day: 20
        }
        const actual = moonPhase(date)
        expect(actual).toBe(ENUM_MOON_PHASE.THIRD_QUARTER)
    })
    test('Moon phase text should be based on MOON_PHASE', () => {
        actual = moonPhaseText({
            year: 100,
            month: 3,
            day: 1
        })
        expect(actual).toBe('a waning crescent moon')
    })
  
})