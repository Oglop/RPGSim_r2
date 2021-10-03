const monsterBuilder = require('../build/monster')
const { ENUM_EVENT_TYPE, ENUM_ENEMY_STRENGTH, ENUM_ENEMY_TYPE, ENUM_GAME_MODE } = require('../generic/enums')

describe('monsterBuilderUnitTests ', () => {
    it('should return a monster object', () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.0;
        global.Math = mockMath;
        const monster = monsterBuilder.build({
            mode: ENUM_GAME_MODE.HISTORY,
            strength: ENUM_ENEMY_STRENGTH.WEAK,
            type: ENUM_ENEMY_TYPE.VILE
        })
        expect(monster.name).toBe('goblin')
    })
})