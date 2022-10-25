const { 
    ENUM_ENEMY_ATTACK, 
    ENUM_ENEMY_TYPE,
    ENUM_ENEMY_STRENGTH,
    ENUM_GAME_MODE,
    ENUM_RACE_NAMES
} = require('../../generic/enums')
const enemyAttackBuilder = require('../../build/enemyAttack')
const { getRandomNumberInRange } = require('../../lib/utils')
const b = require('../../build/enemy')

describe('enemy attack tests', () => {
    test('get hit attack', () =>  {
        const a = enemyAttackBuilder.build(ENUM_ENEMY_ATTACK.HIT)
        const value = getRandomNumberInRange(a.min, a.max)
        expect(a.min).toBe(2)
        expect(value).toBeGreaterThanOrEqual(a.min)
        expect(value).toBeLessThanOrEqual(a.max)
    })

    test('build should return a vile enemy', () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.0;
        global.Math = mockMath;
        const actual = b.build({
            mode: ENUM_GAME_MODE.HISTORY,
            strength: ENUM_ENEMY_STRENGTH.WEAK,
            type: ENUM_ENEMY_TYPE.VILE
        })
        expect(actual.race).toBe(ENUM_RACE_NAMES.vile)
    })
})
