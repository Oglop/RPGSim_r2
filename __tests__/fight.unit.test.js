const {
    attack,
    getAttackFromHero,
    getAttackFromMonster,
    getDefenceFromHero,
    getDefenceFromMonster
} = require('../models/fight')

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('fight', () =>  {
    test('attack shoiuld be instance of function', () => {
        expect(attack).toBeInstanceOf(Function)
    })
    test('getAttackFromHero should return a value between min and max', () => {
        const character = {
            weaponHand: {
                min:1,
                max: 10
            },
            stats: {
                str: 10
            }
        }
        const actual = getAttackFromHero(character)
        expect(actual).toBe(16)
    })
})