const {
    advanceRange,
    retreatRange
} = require('../models/encounter')
const {
    ENUM_ENCOUNTER_RANGE
} = require('../generic/enums')
describe('encounter.model', () => {
    test('should advance range to short', () => {
        const encounter = {
            range: ENUM_ENCOUNTER_RANGE.LONG
        }
        advanceRange(encounter)
        expect(encounter.range).toBe(ENUM_ENCOUNTER_RANGE.SHORT)
    })
    test('should advance range to long', () => {
        const encounter = {
            range: ENUM_ENCOUNTER_RANGE.FAR
        }
        advanceRange(encounter)
        expect(encounter.range).toBe(ENUM_ENCOUNTER_RANGE.LONG)
    })
    test('should advance range to short', () => {
        const encounter = {
            range: ENUM_ENCOUNTER_RANGE.SHORT
        }
        advanceRange(encounter)
        expect(encounter.range).toBe(ENUM_ENCOUNTER_RANGE.SHORT)
    })
    test('should retreat range to long', () => {
        const encounter = {
            range: ENUM_ENCOUNTER_RANGE.SHORT
        }
        retreatRange(encounter)
        expect(encounter.range).toBe(ENUM_ENCOUNTER_RANGE.LONG)
    })
    test('should retreat range to far', () => {
        const encounter = {
            range: ENUM_ENCOUNTER_RANGE.LONG
        }
        retreatRange(encounter)
        expect(encounter.range).toBe(ENUM_ENCOUNTER_RANGE.FAR)
    })
    test('should retreat range to far', () => {
        const encounter = {
            range: ENUM_ENCOUNTER_RANGE.FAR
        }
        retreatRange(encounter)
        expect(encounter.range).toBe(ENUM_ENCOUNTER_RANGE.FAR)
    })
})