const {
    createUniqueGodName,
    createProfile,
    getRandomGod,
    getGod
} = require('../../models/mythos')

describe('mythos model unit', () => {
    test('createUniqueGodName should return a unique name', () => {
        const names = ['test']
        const name = createUniqueGodName(names)
        expect(name.length).toBeGreaterThan(0)
    })

    test('createProfile should return a profile', () => {
        const profile = createProfile()
        expect(profile.length).toBeGreaterThan(0)
    })

    xtest('getRandomGod should return a random god from array', async () => {
        const gods = [
            {
                id: '1',
                name: 'n1',
                profile: 'p1',
                symbol: 's1',
                description: 'd1'
            },
            {
                id: '2',
                name: 'n2',
                profile: 'p2',
                symbol: 's2',
                description: 'd2'
            }
        ]
        const god = await getRandomGod(gods)

        expect(god.id.length).toBe(1)
    })

    xtest('getGod should return a god from array', async () => {
        const gods = [
            {
                id: '1',
                name: 'n1',
                profile: 'p1',
                symbol: 's1',
                description: 'd1'
            },
            {
                id: '2',
                name: 'n2',
                profile: 'p2',
                symbol: 's2',
                description: 'd2'
            }
        ]
        const god = await getGod('1',gods)

        expect(god.id.length).toBe(1)
        expect(god.id).toBe('1')
        expect(god.description).toBe('d1')
    })
    
})