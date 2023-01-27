const rumorBuilder = require('../../build/rumor')
const { ENUM_RUMOR_TYPE, } = require('../../generic/enums')
const {
    getRumorDescription,
    getRumorTarget,
    getRumorType
} = require('../../models/rumor')
const { get } = require('../../localization')

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.1;
global.Math = mockMath;

describe('rumor.unit.test', () => {
    test('rumorBuilder.build should be instance of a function', () => {
        expect(rumorBuilder.build).toBeInstanceOf(Function)
    })
    test('getRumorDescription.build should be instance of a function', () => {
        expect(getRumorDescription).toBeInstanceOf(Function)
    })
    test('getRumorTarget should be instance of a function', () => {
        expect(getRumorTarget).toBeInstanceOf(Function)
    })
    test('getRumorType should be instance of a function', () => {
        expect(getRumorType).toBeInstanceOf(Function)
    })
    test('build rumor should return a rumor', () => {
        const actual = rumorBuilder.build({ type: ENUM_RUMOR_TYPE.RUIN, position: { x:10, y:10 }})
        expect(actual.id.length).toBeGreaterThan(0)
        expect(actual.type).toBe(ENUM_RUMOR_TYPE.RUIN)
    })
    test('getRumorType should return ', () => {
        const actual = getRumorType()
        expect(actual).toBe(ENUM_RUMOR_TYPE.ARTIFACT)
    })
    test('getRumorDescription should return ', () => {
        const expected = get('rumor-of-artifact', [ 'Aieaieaieaieaie' ])
        const actual = getRumorDescription(ENUM_RUMOR_TYPE.ARTIFACT)
        expect(actual).toBe(expected)
    })
})