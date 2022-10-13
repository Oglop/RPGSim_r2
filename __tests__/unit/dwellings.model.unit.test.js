const { 
    getDifferentDwelling,
    getDwellingDescription,
    getRaceFromDwellingType
} = require('../../models/dwelling')
const { ENUM_DWELLINGS, ENUM_RACE_NAMES } = require('../../generic/enums')
const { copyObject } = require('../../lib/utils')
const objects = require('../../generic/objects')

describe('dwelling.model tests', () => {
    test('getDifferentDwelling should be an instance of a function', () => {
        expect(getDifferentDwelling).toBeInstanceOf(Function)
    })
    test('getDifferentDwelling should return different dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        const b = copyObject(objects.dwelling)
        b.id = 'b'
        const dwellings = [a, b]
        const actual = getDifferentDwelling(dwellings, a)
        expect(actual.id).toBe('b')
    })
    test('getDwellingDescription should be instance of a function', () => {
        expect(getDwellingDescription).toBeInstanceOf(Function)
    })
    test('getDwellingDescription, should return a description for human dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.HUMAN
        const actual = getDwellingDescription(a)
        expect(actual.length).toBeGreaterThan(0)
    })
    test('getDwellingDescription, should return a description for dark elf dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.DARK_ELF
        const actual = getDwellingDescription(a)
        expect(actual.length).toBeGreaterThan(0)
    })
    test('getDwellingDescription, should return a description for halfling dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.HALFLING
        const actual = getDwellingDescription(a)
        expect(actual.length).toBeGreaterThan(0)
    })
    test('getDwellingDescription, should return a description for wood elf dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.WOOD_ELF
        const actual = getDwellingDescription(a)
        expect(actual.length).toBeGreaterThan(0)
    })
    test('getRaceFromDwellingType  should be an instance of a function', () => {
        expect(getRaceFromDwellingType).toBeInstanceOf(Function)
    })
    test('getRaceFromDwellingType should return human race when dwelling type is human', () => {
        const actual = getRaceFromDwellingType({ type: ENUM_DWELLINGS.HUMAN })
        expect(actual).toBe(ENUM_RACE_NAMES.human)
    })
    test('getRaceFromDwellingType should return dwarf race when dwelling type is dwarf', () => {
        const actual = getRaceFromDwellingType({ type: ENUM_DWELLINGS.DWARF })
        expect(actual).toBe(ENUM_RACE_NAMES.dwarf)
    })
    test('getRaceFromDwellingType should return high elf race when dwelling type is high elf', () => {
        const actual = getRaceFromDwellingType({ type: ENUM_DWELLINGS.HIGH_ELF })
        expect(actual).toBe(ENUM_RACE_NAMES.highElf)
    })
})