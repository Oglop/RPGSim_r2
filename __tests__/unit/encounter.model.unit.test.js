const {
    advanceRange,
    retreatRange,
    insertInitativeSort
} = require('../../models/encounter')
const {
    ENUM_ENCOUNTER_RANGE
} = require('../../generic/enums')
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
    test('should add item to queue', () => {
        const queue = []
        const item = { id: '123', initiative: 10 }
        insertInitativeSort(queue, item)
        expect(queue.length).toBe(1)
    })
    test('should add item in order 3, 1 , 2 when initiative is the same', () => {
        const queue = []
        const item1 = { id: '1', initiative: 2 }
        const item2 = { id: '2', initiative: 2 }
        const item3 = { id: '3', initiative: 2 }
        insertInitativeSort(queue, item2)
        insertInitativeSort(queue, item1)
        insertInitativeSort(queue, item3)
        expect(queue.length).toBe(3)
        expect(queue[0].id).toBe('3')
        expect(queue[1].id).toBe('1')
        expect(queue[2].id).toBe('2')
    })
    test('should add item in order 1 , 2 , 3, 4, 5', () => {
        const queue = []
        const item1 = { id: '1', initiative: 1 }
        const item2 = { id: '2', initiative: 2 }
        const item3 = { id: '3', initiative: 3 }
        const item4 = { id: '4', initiative: 4 }
        const item5 = { id: '5', initiative: 5 }
        insertInitativeSort(queue, item1)
        insertInitativeSort(queue, item3)
        insertInitativeSort(queue, item4)
        insertInitativeSort(queue, item2)
        insertInitativeSort(queue, item5)
        expect(queue.length).toBe(5)
        expect(queue[0].id).toBe('5')
        expect(queue[1].id).toBe('4')
        expect(queue[2].id).toBe('3')
        expect(queue[3].id).toBe('2')
        expect(queue[4].id).toBe('1')
    })

    test
})