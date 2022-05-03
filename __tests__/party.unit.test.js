const b = require('../build/party')
const m = require('../models/party')

const setWorldStartDate = (options) => {
    const objects = require('../generic/objects')
    const { copyObject } = require('../lib/utils')
    const date = copyObject(objects.date)
    date.year = 0
    date.month = 2
    date.day = 1
    return date
} 

describe('party unit tests', () => {
    test('build should be instance of a funtion', () => {
        expect(b.build).toBeInstanceOf(Function)
    })
    test('build should return a party with of size', () => {
        const partySize = 6
        const actual = b.build({
            partySize,
            date: setWorldStartDate()
        })
        expect(actual.members.length).toBe(partySize)
        expect(actual.food).toBeGreaterThan(actual.members.length)
        expect(actual.members[0].id.length).toBeGreaterThan(0)
        expect(actual.members[0].isAlive).toBeTruthy()
        expect(actual.members[0].health).toBeGreaterThan(0)
        expect(actual.members[0].health).toBe(actual.members[0].maxHealth)
    })
    test('isInDwellng should be instance of a funtion', () => {
        expect(m.isInDwelling).toBeInstanceOf(Function)
    })
    test('isInDwellng should return true when party is in dwelling', async () => {
        const outputMock = {
            print: () => {}
        }
        const worldMock = {
            map: [
                [{}, {}, {}],
                [{}, { dwelling: {
                    id: '123',
                    name: 'name',
                    type: 0,
                    inhabited: true
                } }, {}],
                [{}, {}, {}],
            ]
        }
        const partyMock = {
            id: 'abc',
            name:  'abc and party',
            karma: 0,
            members: [],
            path: [],
            position: { x: 1, y: 1 },
            quest: 0,
            questStatus: 0,
            questGoal: { x: 0, y: 0 },
            crowns:0,
            food:0
        }
        const actual = await m.isInDwelling(worldMock, partyMock, outputMock)
        expect(actual).toBeTruthy()
    })
    test('isInDwellng should return false when party is not in dwelling', () => {
        const outputMock = {
            print: () => {}
        }
        const worldMock = {
            map: [
                [{}, {}, {}],
                [{}, { dwelling: {
                    id: '123',
                    name: 'name',
                    type: 0,
                    inhabited: true
                } }, {}],
                [{}, {}, {}],
            ]
        }
        const partyMock = {
            id: 'abc',
            name:  'abc and party',
            karma: 0,
            members: [],
            path: [],
            position: { x: 0, y: 0 },
            quest: 0,
            questStatus: 0,
            questGoal: { x: 0, y: 0 },
            crowns:0,
            food:0
        }
        const actual = m.isInDwelling(worldMock, partyMock, outputMock)
        expect(actual).toBeFalsy()
    })
    test('number of alive characters in party', () => {
        const partyMock = {
            id: 'abc',
            name:  'abc and party',
            karma: 0,
            members: [{
                id: '1',
                isAlive: true
            },{
                id: '2',
                isAlive: true
            },{
                id: '3',
                isAlive: false
            },],
            path: [],
            position: { x: 0, y: 0 },
            quest: 0,
            questStatus: 0,
            questGoal: { x: 0, y: 0 },
            crowns:0,
            food:0
        }
        const actual = m.noOfAliveMembers(partyMock)
        expect(actual).toBe(2)
    })

})