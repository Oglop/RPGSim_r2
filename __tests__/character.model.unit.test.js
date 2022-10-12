const { 
    getCharacterStatValue ,
    isAlive
} = require('../models/character')
const { ENUM_STAT_NAMES } = require('../generic/enums')
const objects = require('../generic/objects')
const { copyObject } = require('../lib/utils')

const character = {
    stats: {
        str: 1,
        agi: 2,
        vit: 3,
        int: 4,
        wis: 5,
        luc: 6,
        cha: 7
    }
}

describe('character model', () => {
    test('getCharacterStatValue should be instance of a function', () => {
        expect(getCharacterStatValue).toBeInstanceOf(Function)
    })
    test('should return value of character str', () => {
        const expected = 1
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.str)
        expect(expected).toBe(actual)
    })
    test('should return value of character agi', () => {
        const expected = 2
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.agi)
        expect(expected).toBe(actual)
    })
    test('should return value of character vit', () => {
        const expected = 3
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.vit)
        expect(expected).toBe(actual)
    })
    test('should return value of character int', () => {
        const expected = 4
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.int)
        expect(expected).toBe(actual)
    })
    test('should return value of character wis', () => {
        const expected = 5
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.wis)
        expect(expected).toBe(actual)
    })
    test('should return value of character luc', () => {
        const expected = 6
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.luc)
        expect(expected).toBe(actual)
    })
    test('should return value of character cha', () => {
        const expected = 7
        const actual = getCharacterStatValue(character, ENUM_STAT_NAMES.cha)
        expect(expected).toBe(actual)
    })

    test('isAlive should be instance of a function', () => {
        expect(isAlive).toBeInstanceOf(Function)
    })
    test('should return false when health is lower than zero', () => {
        const c = copyObject(objects.character)
        c.health = -1
        c.maxHealth = 10
        const actual = isAlive(c)
        expect(actual).toBe(false)
        expect(c.statuses[0]).toBe(0)
    })
    test('should true false when health is lower than zero', () => {
        const c = copyObject(objects.character)
        c.health = 10
        c.maxHealth = 10
        const actual = isAlive(c)
        expect(actual).toBe(true)
        expect(c.statuses.length).toBe(0)
    })
})