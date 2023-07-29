const {
    createUniqueGodName,
    createProfile
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

})