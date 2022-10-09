const { 
    getDifferentDwelling,
    getDwellingDescription
} = require('../models/dwelling')
const { ENUM_DWELLINGS } = require('../generic/enums')
const { copyObject } = require('../lib/utils')
const objects = require('../generic/objects')

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
        getDwellingDescription(a)
        expect(a.description.length).toBeGreaterThan(0)
    })
    test('getDwellingDescription, should return a description for dark elf dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.DARK_ELF
        getDwellingDescription(a)
        expect(a.description.length).toBeGreaterThan(0)
    })
    test('getDwellingDescription, should return a description for halfling dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.HALFLING
        getDwellingDescription(a)
        expect(a.description.length).toBeGreaterThan(0)
    })
    test('getDwellingDescription, should return a description for wood elf dwelling', () => {
        const a = copyObject(objects.dwelling)
        a.id = 'a'
        a.name = 'name'
        a.type = ENUM_DWELLINGS.WOOD_ELF
        getDwellingDescription(a)
        expect(a.description.length).toBeGreaterThan(0)
    })
})