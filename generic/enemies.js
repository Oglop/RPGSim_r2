const { ENUM_RACE_NAMES, ENUM_HEALTH_STATUS } = require('./enums')
module.exports = {
    TYPES: {
        VILE: {
            WEAK: [
                {
                    name: 'goblin', health: 6, stats: { str: 3, agi: 7, vit: 2, int: 3, luc: 6, wis: 5, cha: 3 }, statuses: [], race: ENUM_RACE_NAMES.vile
                }
            ],
            MEDIUM: [
                {
                    name: 'orc', health: 8, stats: { str: 5, agi: 5, vit: 4, int: 3, luc: 2, wis: 6, cha: 2 }, statuses: [], race: ENUM_RACE_NAMES.vile
                }
            ],
            STRONG: [
                {
                    name: 'troll', health: 16, stats: { str: 3, agi: 7, vit: 2, int: 3, luc: 6, wis: 2, cha: 1 }, statuses: [ ENUM_HEALTH_STATUS.REGENERATE ], race: ENUM_RACE_NAMES.vile
                }
            ],
            EPIC: [
                {
                    name: 'giant', health: 24, stats: { str: 3, agi: 7, vit: 2, int: 3, luc: 6, wis: 3, cha: 2 }, statuses: [  ], race: ENUM_RACE_NAMES.vile
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