const { ENUM_ITEM_TYPE, ENUM_ITEM_TIER, ENUM_SKILL_NAMES } = require('../generic/enums')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { getRandomNumberInRange, copyObject, getRandomElementFromArray } = require('../lib/utils')

const weapons = {
    daggers: {
        common: [
            { name: 'Short dagger', min: 2, max: 6, value: 8, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Knife', min: 1, max: 4, value: 5, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Thiefs dagger', min: 3, max: 5, value: 8, skillRequired: ENUM_SKILL_NAMES.dagger }
        ],
        elite: [
            { name: 'Curved dagger', min: 4, max: 8, value: 12, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Long dagger', min: 3, max: 9, value: 12, skillRequired: ENUM_SKILL_NAMES.dagger }
        ]
    },
    axes: {
        common: [
            { name: 'Hand Axe', min: 3, max: 6, value: 9, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Heavy axe', min: 5, max: 7, value: 11, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Cleaver', min: 5, max: 9, value: 14, skillRequired: ENUM_SKILL_NAMES.dagger }
        ],
        elite: [
            { name: 'Battle axe', min: 12, max: 16, value: 28, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Bearded axe', min: 14, max: 20, value: 34, skillRequired: ENUM_SKILL_NAMES.dagger }
        ]
    },
    swords: {
        common: [
            { name: 'Short sword', min: 4, max: 7, value: 11, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Long sword', min: 6, max: 8, value: 14, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Curved sword', min: 4, max: 12, value: 16, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Knight sword', min: 8, max: 12, value: 20, skillRequired: ENUM_SKILL_NAMES.swords }
        ],
        elite: [
            { name: 'Mythril sword', min: 12, max: 18, value: 30, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Royal guard sword', min: 10, max: 20, value: 30, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Rune sword', min: 14, max: 22, value: 36, skillRequired: ENUM_SKILL_NAMES.swords }
        ]
    },
    mace: {
        common: [
            { name: 'Club', min: 2, max: 4, value: 6, skillRequired: ENUM_SKILL_NAMES.mace },
            { name: 'Spiked club', min: 3, max: 5, value: 8, skillRequired: ENUM_SKILL_NAMES.mace }
        ], 
        elite: [
            { name: 'Mace', min: 4, max: 6, value: 10, skillRequired: ENUM_SKILL_NAMES.mace },
            { name: 'Morning star', min: 10, max: 12, value: 24, skillRequired: ENUM_SKILL_NAMES.mace },
            { name: 'Flail', min: 7, max: 10, value: 17, skillRequired: ENUM_SKILL_NAMES.mace }
        ]
    },
    twoHandSwords: {
        common: [
            { name: 'Battle sword', min: 6, max: 14, value: 20, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },
            { name: 'Two hand sword', min: 8, max: 18, value: 26, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },

        ], 
        elite: [
            { name: 'Guard sword', min: 14, max: 24, value: 38, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },
            { name: 'Flamberge', min: 18, max: 32, value: 50, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },

        ]
    },
    bows: {
        common: [
            { name: 'Short bow', min: 1, max: 5, value: 6, skillRequired: ENUM_SKILL_NAMES.bow },
            { name: 'Hunting bow', min: 1, max: 8, value: 9, skillRequired: ENUM_SKILL_NAMES.bow },

        ], 
        elite: [
            { name: 'Long bow', min: 4, max: 10, value: 14, skillRequired: ENUM_SKILL_NAMES.bow },
            { name: 'Great bow', min: 6, max: 18, value: 24, skillRequired: ENUM_SKILL_NAMES.bow },
            { name: 'Elven bow', min: 8, max: 24, value: 32, skillRequired: ENUM_SKILL_NAMES.bow },

        ]
    },
    spears: {
        common: [
            { name: 'Spear', min: 4, max: 10, value: 14, skillRequired: ENUM_SKILL_NAMES.spear },
            { name: 'Boar spear', min: 4, max: 14, value: 28, skillRequired: ENUM_SKILL_NAMES.spear },

        ], 
        elite: [
            { name: 'Poleaxe', min: 4, max: 20, value: 24, skillRequired: ENUM_SKILL_NAMES.spear },
            { name: 'Knight lance', min: 4, max: 24, value: 28, skillRequired: ENUM_SKILL_NAMES.spear },

        ]
    }
}

const armors = {
    lightArmor: {
        common: [
            { name: 'Linne armor', min: 2, max: 4, value: 6, skillRequired: ENUM_SKILL_NAMES.lightArmor },
            { name: 'Leather armor', min: 2,max: 5, value: 7, skillRequired: ENUM_SKILL_NAMES.lightArmor },

        ], 
        elite: [
            { name: 'Brigandine', min: 4, max: 6, value: 10, skillRequired: ENUM_SKILL_NAMES.lightArmor },
            { name: 'Elven gear', min: 3, max: 7, value: 10, skillRequired: ENUM_SKILL_NAMES.lightArmor },

        ]
    },
    heavyArmor: {
        common: [
            { name: 'Chain mail', min: 4, max: 6, value: 10, skillRequired: ENUM_SKILL_NAMES.heavyArmor },
            { name: 'Scale mail', min: 4, max: 8, value: 12, skillRequired: ENUM_SKILL_NAMES.heavyArmor },

        ], 
        elite: [
            { name: 'Plate mail', min: 8, max: 10, value: 18, skillRequired: ENUM_SKILL_NAMES.heavyArmor },
            { name: 'Battle armor', min: 8, max: 12, value: 20, skillRequired: ENUM_SKILL_NAMES.heavyArmor }

        ]
    },
    robes: {
        common: [
            { name: 'Monk robes', min: 1, max: 3, value: 4, skillRequired: ENUM_SKILL_NAMES.robes },
            { name: 'Hooded cloak', min: 1, max: 4, value: 5, skillRequired: ENUM_SKILL_NAMES.robes },

        ], 
        elite: [
            { name: 'Sorceror dress', min: 2, max: 3, value: 7, skillRequired: ENUM_SKILL_NAMES.robes },
            { name: 'Wizard cloak', min: 2, max: 4, value: 9, skillRequired: ENUM_SKILL_NAMES.robes }

        ]
    },
    helmet: {
        common: [
            { name: 'Skull cap', min: 1, max: 3, value: 4, skillRequired: ENUM_SKILL_NAMES.helmet },
            { name: 'Casque', min: 1, max: 4, value: 5, skillRequired: ENUM_SKILL_NAMES.helmet },

        ], 
        elite: [
            { name: 'Armet', min: 2, max: 6, value: 8, skillRequired: ENUM_SKILL_NAMES.helmet },
            { name: 'Basinet', min: 2, max: 8, value: 10, skillRequired: ENUM_SKILL_NAMES.helmet }

        ]
    },
    shield: {
        common: [
            { name: 'Wooden shield', min: 1, max: 3, value: 4, skillRequired: ENUM_SKILL_NAMES.shield },
            { name: 'Buckler', min: 1, max: 4, value: 5, skillRequired: ENUM_SKILL_NAMES.shield },

        ], 
        elite: [
            { name: 'Kite shield', min: 2, max: 6, value: 8, skillRequired: ENUM_SKILL_NAMES.shield },
            { name: 'Tower shield', min: 2, max: 8, value: 10, skillRequired: ENUM_SKILL_NAMES.shield }

        ]
    }
}


/*
    dagger: 'Dagger',
    oneHandSword: '1H Sword',
    twoHandSword: '2H Sword',
    bow: 'Bow',
    staff: 'Staff',
    shield: 'Shield',
    axe: 'Axe',
    mace: 'Mace',
    spear: 'Spear',
    lightArmor: 'Light Armor',
    heavyArmor: 'Heavy Armor',
    robes: 'Robes',
*/
/**
 * 
 * @param {ENUM_ITEM_TYPE} type 
 * @param {ENUM_ITEM_TIER} tier 
 * @param {object} options 
 */
module.exports.build = (type, tier, options) => {
    try {
        

        const i = copyObject(objects.item)
        i.type = type
        if (type == ENUM_ITEM_TYPE.DAGGER) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const commonDaggers = weapons.daggers.common
                const dagger = { ...i, ...getRandomElementFromArray(commonDaggers) }
                return dagger
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const eliteDaggers = weapons.daggers.elite
                const dagger = { ...i, ...getRandomElementFromArray(eliteDaggers) }
                return dagger
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
            
        }
        if (type == ENUM_ITEM_TYPE.AXE) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = weapons.axes.common
                const axe = { ...i, ...getRandomElementFromArray(common) }
                return axe
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.axes.elite
                const axe = { ...i, ...getRandomElementFromArray(elite) }
                return axe
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
            
        }
        if (type == ENUM_ITEM_TYPE.ONE_HAND_SWORD) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const commonDaggers = weapons.daggers.common
                const dagger = { ...i, ...getRandomElementFromArray(commonDaggers) }
                return dagger
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const eliteDaggers = weapons.daggers.elite
                const dagger = { ...i, ...getRandomElementFromArray(eliteDaggers) }
                return dagger
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        if (type == ENUM_ITEM_TYPE.MACE) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = weapons.mace.common
                const mace = { ...i, ...getRandomElementFromArray(common) }
                return mace
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.mace.elite
                const mace = { ...i, ...getRandomElementFromArray(elite) }
                return mace
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        if (type == ENUM_ITEM_TYPE.TWO_HAND_SWORD) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = weapons.twoHandSwords.common
                const twoHandSwords = { ...i, ...getRandomElementFromArray(common) }
                return twoHandSwords
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.twoHandSwords.elite
                const twoHandSwords = { ...i, ...getRandomElementFromArray(elite) }
                return twoHandSwords
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        if (type == ENUM_ITEM_TYPE.BOW) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = weapons.bows.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.bows.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        if (type == ENUM_ITEM_TYPE.LIGHT_ARMOR) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = armors.lightArmor.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = armors.lightArmor.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        if (type == ENUM_ITEM_TYPE.HEAVY_ARMOR) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = armors.heavyArmor.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = armors.heavyArmor.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        
        if (type == ENUM_ITEM_TYPE.ROBES) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = armors.robes.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = armors.robes.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }

        if (type == ENUM_ITEM_TYPE.SHIELD) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = armors.shield.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = armors.shield.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }

        if (type == ENUM_ITEM_TYPE.HELMET) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = armors.helmet.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = armors.helmet.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
}  