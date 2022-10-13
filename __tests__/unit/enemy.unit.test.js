const { 
    ENUM_ENEMY_ATTACK, 
    ENUM_ENEMY_TYPE,
    ENUM_ENEMY_STRENGTH
} = require('../../generic/enums')
const enemyAttackBuilder = require('../../build/enemyAttack')
const { getRandomNumberInRange } = require('../../lib/utils')
const b = require('../../build/monster')

describe('enemy attack tests', () => {
    test('get hit attack', () =>  {
        const a = enemyAttackBuilder.build(ENUM_ENEMY_ATTACK.HIT)
        const value = getRandomNumberInRange(a.min, a.max)
        expect(a.min).toBe(2)
        expect(value).toBeGreaterThanOrEqual(a.min)
        expect(value).toBeLessThanOrEqual(a.max)
    })
    test('build should return a vile monster', () => {
        const actual = b.build({
            type: ENUM_ENEMY_TYPE.VILE,
            strength: ENUM_ENEMY_STRENGTH.WEAK
        })
        expect(actual.hp).toBeGreaterThan(0)
    })
})
