const rumorBuilder = require('../../build/rumor')
const { ENUM_RUMOR_TYPE, } = require('../../generic/enums')

describe('rumor.unit.test', () => {
    test('rumorBuilder.build should be instance of a function', () => {
        expect(rumorBuilder.build).toBeInstanceOf(Function)
    })
    test('build rumor should return a rumor', () => {
        const actual = rumorBuilder.build({ type: ENUM_RUMOR_TYPE.RUIN, position: { x:10, y:10 }})
        expect(actual.id.length).toBeGreaterThan(0)
        expect(actual.type).toBe(ENUM_RUMOR_TYPE.RUIN)
    })
})