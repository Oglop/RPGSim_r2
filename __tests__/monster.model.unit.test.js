const { ENUM_STAT_NAMES } = require('../generic/enums')
const { 
    attackEffect,
    getEffectScaling
} = require('../models/monster')


describe('monster model', () => {
    test('attackEffect should be instance of a function', () => {
        expect(attackEffect).toBeInstanceOf(Function)
    })
    test('attackEffect should return min-max value from str stat', () => {
        const expected = 3
        const actual = attackEffect({
            str: 2,
            agi: 100
        },{
            min: 3,
            max: 3,
            statBase: ENUM_STAT_NAMES.str,
            name: 'test'
        })

        expect(actual).toBe(expected)
    })

    test('getEffectScaling should be instance of a function', () => {
        expect(getEffectScaling).toBeInstanceOf(Function)
    })
    test('getEffectScaling should return precentage based on stat agi', () => {
        const expected = 1.1

        const actual = getEffectScaling({
            str: 2,
            agi: 10
        },{
            min: 10,
            max: 10,
            statBase: ENUM_STAT_NAMES.agi,
            name: 'test'
        })

        expect(actual).toBe(expected) 
    })
})