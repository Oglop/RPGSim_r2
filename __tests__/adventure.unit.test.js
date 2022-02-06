const m = require('../models/adventure')
const h = require('../handlers/adventureHandler')


describe('adventure model tests', () => {
    test('getQuestLocation should be instance of function', () => {
        expect(m.getQuestLocation).toBeInstanceOf(Function)
    })
    test('travel should be instance of function', () => {
        expect(m.travel).toBeInstanceOf(Function)
    })
    test('restMap should be instance of function', () => {
        expect(m.restMap).toBeInstanceOf(Function)
    })
    test('quest should be instance of function', () => {
        expect(m.quest).toBeInstanceOf(Function)
    })
    test('restTown should be instance of function', () => {
        expect(m.restTown).toBeInstanceOf(Function)
    })
    test('travel should be instance of function', () => {
        expect(m.travel).toBeInstanceOf(Function)
    })
})