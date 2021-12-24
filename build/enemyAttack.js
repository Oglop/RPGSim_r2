const { ENUM_ENEMY_ATTACK } = require('../generic/enums')
const { copyObject } = require('../lib/utils')
const objects = require('../generic/objects')


module.exports.build = (attack) => {
    const a = copyObject(objects.enemyAttack)
    switch (attack) {
        case ENUM_ENEMY_ATTACK.HIT:
            a.min = 2;
            a.max = 4;
            a.name = 'Hit'
    }
}