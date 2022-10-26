const m = require('../../models/party')

jest.mock('../../persistance/commandQueue', () => {
    executeCommands: async (command,data) => {}
})


describe('party.model.unit.test', () => {
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

