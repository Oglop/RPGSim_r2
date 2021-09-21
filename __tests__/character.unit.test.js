const characterBuilder = require('../build/character')
const { ENUM_GENDER, ENUM_RACE_NAMES, ENUM_JOB_NAMES } = require('../generic/enums')

describe('character build', () => {
    it('should return a character', () => {
        const actual = characterBuilder.build({
            gender: ENUM_GENDER.FEMALE,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.halfling,
            mother: 'aaa',
            father: 'bbb'
        })
        expect(actual.gender).toBe(ENUM_GENDER.FEMALE)
        expect(actual.job).toBe(ENUM_JOB_NAMES.knight)
        expect(actual.race).toBe(ENUM_RACE_NAMES.halfling)
        expect(typeof actual.name).toEqual('string')
        expect(typeof actual.id).toEqual('string')
        expect(actual.mother).toBe('aaa')
        expect(actual.father).toBe('bbb')
    })
})