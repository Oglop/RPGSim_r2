const { ENUM_ENEMY_ATTACK } = require('../generic/enums')
const enemyAttackBuilder = require('../build/enemyAttack')
const { getRandomNumberInRange } = require('../lib/utils')

describe('enemy attack tests', () => {
    test('get hit attack', () =>  {
        const a = enemyAttackBuilder.build(ENUM_ENEMY_ATTACK.HIT)
        const value = getRandomNumberInRange(a.min, a.max)
        expect(a.min).toBe(2)
        expect(value).toBeGreaterThanOrEqual(a.min)
        expect(value).toBeLessThanOrEqual(a.max)
    })
})
