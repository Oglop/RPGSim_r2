const characterBuilder = require('../build/character')
const { validateCharacterCompabilityForMarige } = require('../models/character')
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

describe('character model', () => {
    it('should validate character for marriage', () => {
        const m1 = {
            id: 'm1',
            name: 'm1',
            gender: ENUM_GENDER.MALE,
            mother: 'f6',
            father: 'm9',
            pregnant: false,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.human,
            languages: [],
            skills: [],
            birthDate: undefined,
            age: 30,
            religion: undefined,
            personality: undefined,
            isAlive: true
        }
        const m2 = {
            id: 'm2',
            name: 'm2',
            gender: ENUM_GENDER.MALE,
            mother: 'f5',
            father: 'm5',
            pregnant: false,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.woodElf,
            languages: [],
            skills: [],
            birthDate: undefined,
            age: 30,
            religion: undefined,
            personality: undefined,
            isAlive: true
        }
        const f1 = {
            id: 'f1',
            name: 'f1',
            gender: ENUM_GENDER.FEMALE,
            mother: 'f8',
            father: 'm9',
            pregnant: false,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.human,
            languages: [],
            skills: [],
            birthDate: undefined,
            age: 35,
            religion: undefined,
            personality: undefined,
            isAlive: true
        }
        const f2 = {
            id: 'f2',
            name: 'f2',
            gender: ENUM_GENDER.FEMALE,
            mother: 'fe6',
            father: 'me6',
            pregnant: false,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.human,
            languages: [],
            skills: [],
            birthDate: undefined,
            age: 35,
            religion: undefined,
            personality: undefined,
            isAlive: true
        }
        const f3 = {
            id: 'f3',
            name: 'f3',
            gender: ENUM_GENDER.FEMALE,
            mother: 'f7',
            father: 'm7',
            pregnant: false,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.human,
            languages: [],
            skills: [],
            birthDate: undefined,
            age: 85,
            religion: undefined,
            personality: undefined,
            isAlive: true
        }
        const f4 = {
            id: 'f4',
            name: 'f4',
            gender: ENUM_GENDER.FEMALE,
            mother: 'f11',
            father: 'm11',
            pregnant: false,
            job: ENUM_JOB_NAMES.knight,
            race: ENUM_RACE_NAMES.human,
            languages: [],
            skills: [],
            birthDate: undefined,
            age: 25,
            religion: undefined,
            personality: undefined,
            isAlive: false
        }
        // m1 and m2 are male are both male
        const actual1false = validateCharacterCompabilityForMarige(m1, m2)
        // m1 and f1 are sibblings
        const actual2false = validateCharacterCompabilityForMarige(m1, f1)
        // f3 and m1 have to large age gap
        const actual3false = validateCharacterCompabilityForMarige(m1, f3)
        // m2 is wood elf
        const actual4false = validateCharacterCompabilityForMarige(m2, f2)
        // f4 is not alive
        const actual5false = validateCharacterCompabilityForMarige(m1, f4)
        const actual1true = validateCharacterCompabilityForMarige(m1, f2)

        expect(actual1false).toBe(false)
        expect(actual2false).toBe(false)
        expect(actual3false).toBe(false)
        expect(actual4false).toBe(false)
        expect(actual5false).toBe(false)
        expect(actual1true).toBe(true)
    })
})