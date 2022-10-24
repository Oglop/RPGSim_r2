const { ENUM_ENEMY_TYPE, ENUM_ENCOUNTER_RULE } = require('./enums')
module.exports = {
    TYPES: {
        VILE: {
            WEAK: [
                {
                    name: 'goblin', type: ENUM_ENEMY_TYPE.VILE, health: 6, stats: { str: 3, agi: 7, vit: 2, int: 3, luc: 6 }, actions: [ ENUM_ENCOUNTER_RULE.ATTACK] , statuses: []
                }
            ],
            MEDIUM: [
                {
                    name: 'orc', type: ENUM_ENEMY_TYPE.VILE, health: 8, stats: { str: 5, agi: 5, vit: 4, int: 3, luc: 2 }, attacks: [ ENUM_ENCOUNTER_RULE.ATTACK ], statuses: []
                }
            ],
            STRONG: [
                {
                    name: 'troll', type: ENUM_ENEMY_TYPE.VILE, health: 6, stats: { str: 3, agi: 7, vit: 2, int: 3, luc: 6 }, attacks: [ ENUM_ENCOUNTER_RULE.ATTACK ], statuses: []
                }
            ],
            EPIC: [
                {
                    name: 'giant', type: ENUM_ENEMY_TYPE.VILE, health: 6, stats: { str: 3, agi: 7, vit: 2, int: 3, luc: 6 }, attacks: [ ENUM_ENCOUNTER_RULE.ATTACK ], statuses: []
                }
            ]
        },
        WILD: {
            WEAK: [
                {
                    name: 'wolf'
                }
             ],
             MEDIUM: [ 
                {
                    name: 'spider'
                }
             ],
             STRONG: [
                {
                    name: 'griffin'
                }
             ],
             EPIC: [
                {
                    name: 'dragon'
                }
             ]
        },
        ANCIENT: {
            WEAK: [
                {
                    name: 'skeleton'
                }
             ],
             MEDIUM: [
                 {
                    name: 'wraith'
                 }
             ],
             STRONG: [
                {
                    name: 'death knight'
                }
             ],
             EPIC: [
                {
                    name: 'vampire'
                }
             ]
        },
        HUMAN: {
            WEAK: [
                {
                    name: 'thief'
                }
             ],
             MEDIUM: [
                 {
                    name: 'robber'
                 }
             ],
             STRONG: [
                {
                    name: 'knight'
                }
             ],
             EPIC: [
                {
                    name: 'champion'
                }
             ]
        }
    }
    
}