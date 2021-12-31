const { ENUM_ITEM_TYPE, ENUM_ITEM_TIER, ENUM_SKILL_NAMES } = require('../generic/enums')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { getRandomNumberInRange, copyObject, getRandomElementFromArray } = require('../lib/utils')


const weapons = {
    daggers: {
        common: [
            { name: 'Short dagger', use: getRandomNumberInRange(2, 6), value: 8, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Knife', use: getRandomNumberInRange(1, 4), value: 5, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Thiefs dagger', use: getRandomNumberInRange(3, 5), value: 8, skillRequired: ENUM_SKILL_NAMES.dagger }
        ],
        elite: [
            { name: 'Curved dagger', use: getRandomNumberInRange(4, 8), value: 12, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Long dagger', use: getRandomNumberInRange(3, 9), value: 12, skillRequired: ENUM_SKILL_NAMES.dagger }
        ]
    },
    axes: {
        common: [
            { name: 'Hand Axe', use: getRandomNumberInRange(3, 6), value: 9, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Heavy axe', use: getRandomNumberInRange(5, 7), value: 11, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Cleaver', use: getRandomNumberInRange(5, 9), value: 14, skillRequired: ENUM_SKILL_NAMES.dagger }
        ],
        elite: [
            { name: 'Battle axe', use: getRandomNumberInRange(12, 16), value: 28, skillRequired: ENUM_SKILL_NAMES.dagger },
            { name: 'Bearded axe', use: getRandomNumberInRange(14, 20), value: 34, skillRequired: ENUM_SKILL_NAMES.dagger }
        ]
    },
    swords: {
        common: [
            { name: 'Short sword', use: getRandomNumberInRange(4, 7), value: 11, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Long sword', use: getRandomNumberInRange(6, 8), value: 14, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Curved sword', use: getRandomNumberInRange(4, 12), value: 16, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Knight sword', use: getRandomNumberInRange(8, 12), value: 20, skillRequired: ENUM_SKILL_NAMES.swords }
        ],
        elite: [
            { name: 'Mythril sword', use: getRandomNumberInRange(12, 18), value: 30, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Royal guard sword', use: getRandomNumberInRange(10, 20), value: 30, skillRequired: ENUM_SKILL_NAMES.swords },
            { name: 'Rune sword', use: getRandomNumberInRange(14, 22), value: 36, skillRequired: ENUM_SKILL_NAMES.swords }
        ]
    },
    mace: {
        common: [
            { name: 'Club', use: getRandomNumberInRange(2, 4), value: 6, skillRequired: ENUM_SKILL_NAMES.mace },
            { name: 'Spiked club', use: getRandomNumberInRange(3, 5), value: 8, skillRequired: ENUM_SKILL_NAMES.mace }
        ], 
        elite: [
            { name: 'Mace', use: getRandomNumberInRange(4, 6), value: 10, skillRequired: ENUM_SKILL_NAMES.mace },
            { name: 'Morning star', use: getRandomNumberInRange(10, 12), value: 24, skillRequired: ENUM_SKILL_NAMES.mace },
            { name: 'Flail', use: getRandomNumberInRange(7, 10), value: 17, skillRequired: ENUM_SKILL_NAMES.mace }
        ]
    },
    twoHandSwords: {
        common: [
            { name: 'Battle sword', use: getRandomNumberInRange(6, 14), value: 20, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },
            { name: 'Two hand sword', use: getRandomNumberInRange(8, 18), value: 26, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },

        ], 
        elite: [
            { name: 'Guard sword', use: getRandomNumberInRange(14, 24), value: 38, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },
            { name: 'Flamberge', use: getRandomNumberInRange(18, 32), value: 50, skillRequired: ENUM_SKILL_NAMES.twoHandSwords },

        ]
    },
    bows: {
        common: [
            { name: 'Short bow', use: getRandomNumberInRange(1, 5), value: 6, skillRequired: ENUM_SKILL_NAMES.bow },
            { name: 'Hunting bow', use: getRandomNumberInRange(1, 8), value: 9, skillRequired: ENUM_SKILL_NAMES.bow },

        ], 
        elite: [
            { name: 'Long bow', use: getRandomNumberInRange(4, 10), value: 14, skillRequired: ENUM_SKILL_NAMES.bow },
            { name: 'Great bow', use: getRandomNumberInRange(6, 18), value: 24, skillRequired: ENUM_SKILL_NAMES.bow },
            { name: 'Elven bow', use: getRandomNumberInRange(8, 24), value: 32, skillRequired: ENUM_SKILL_NAMES.bow },

        ]
    },
    spears: {
        common: [
            { name: 'Spear', use: getRandomNumberInRange(4, 10), value: 14, skillRequired: ENUM_SKILL_NAMES.spear },
            { name: 'Boar spear', use: getRandomNumberInRange(4,14), value: 28, skillRequired: ENUM_SKILL_NAMES.spear },

        ], 
        elite: [
            { name: 'Poleaxe', use: getRandomNumberInRange(4, 20), value: 24, skillRequired: ENUM_SKILL_NAMES.spear },
            { name: 'Knight lance', use: getRandomNumberInRange(4, 24), value: 28, skillRequired: ENUM_SKILL_NAMES.spear },

        ]
    },
    lightArmor: {
        common: [
            { name: 'Linne armor', use: getRandomNumberInRange(2, 4), value: 6, skillRequired: ENUM_SKILL_NAMES.lightArmor },
            { name: 'Leather armor', use: getRandomNumberInRange(2,5), value: 7, skillRequired: ENUM_SKILL_NAMES.lightArmor },

        ], 
        elite: [
            { name: 'Brigandine', use: getRandomNumberInRange(4, 6), value: 10, skillRequired: ENUM_SKILL_NAMES.lightArmor },
            { name: 'Elven gear', use: getRandomNumberInRange(3, 7), value: 10, skillRequired: ENUM_SKILL_NAMES.lightArmor },

        ]
    },
    heavyArmor: {
        common: [
            { name: 'Chain mail', use: getRandomNumberInRange(4, 6), value: 10, skillRequired: ENUM_SKILL_NAMES.heavyArmor },
            { name: 'Scale mail', use: getRandomNumberInRange(4,8), value: 12, skillRequired: ENUM_SKILL_NAMES.heavyArmor },

        ], 
        elite: [
            { name: 'Plate mail', use: getRandomNumberInRange(8, 10), value: 18, skillRequired: ENUM_SKILL_NAMES.heavyArmor },
            { name: 'Battle armor', use: getRandomNumberInRange(8, 12), value: 20, skillRequired: ENUM_SKILL_NAMES.heavyArmor }

        ]
    },
    robes: {
        common: [
            { name: 'Monk robes', use: getRandomNumberInRange(1, 3), value: 4, skillRequired: ENUM_SKILL_NAMES.robes },
            { name: 'Hooded cloak', use: getRandomNumberInRange(1, 4), value: 5, skillRequired: ENUM_SKILL_NAMES.robes },

        ], 
        elite: [
            { name: 'Sorceror dress', use: getRandomNumberInRange(2, 3), value: 7, skillRequired: ENUM_SKILL_NAMES.robes },
            { name: 'Wizard cloak', use: getRandomNumberInRange(2, 4), value: 9, skillRequired: ENUM_SKILL_NAMES.robes }

        ]
    },
    helmet: {
        common: [
            { name: 'Skull cap', use: getRandomNumberInRange(1, 3), value: 4, skillRequired: ENUM_SKILL_NAMES.helmet },
            { name: 'Casque', use: getRandomNumberInRange(1,4), value: 5, skillRequired: ENUM_SKILL_NAMES.helmet },

        ], 
        elite: [
            { name: 'Armet', use: getRandomNumberInRange(2, 6), value: 8, skillRequired: ENUM_SKILL_NAMES.helmet },
            { name: 'Basinet', use: getRandomNumberInRange(2, 8), value: 10, skillRequired: ENUM_SKILL_NAMES.helmet }

        ]
    },
    shield: {
        common: [
            { name: 'Wooden shield', use: getRandomNumberInRange(1, 3), value: 4, skillRequired: ENUM_SKILL_NAMES.shield },
            { name: 'Buckler', use: getRandomNumberInRange(1,4), value: 5, skillRequired: ENUM_SKILL_NAMES.shield },

        ], 
        elite: [
            { name: 'Kite shield', use: getRandomNumberInRange(2, 6), value: 8, skillRequired: ENUM_SKILL_NAMES.shield },
            { name: 'Tower shield', use: getRandomNumberInRange(2, 8), value: 10, skillRequired: ENUM_SKILL_NAMES.shield }

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
                const common = weapons.lightArmor.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.lightArmor.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        if (type == ENUM_ITEM_TYPE.HEAVY_ARMOR) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = weapons.heavyArmor.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.heavyArmor.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        /*
        if (type == ENUM_ITEM_TYPE.SHIELD) {
            if (tier == ENUM_ITEM_TIER.COMMON) {
                const common = weapons.shields.common
                const item = { ...i, ...getRandomElementFromArray(common) }
                return item
            } else if (tier == ENUM_ITEM_TIER.ELITE) {
                const elite = weapons.heavyArmor.elite
                const item = { ...i, ...getRandomElementFromArray(elite) }
                return item
            } else {
                const _name = (options.name) ? options.name : '' // todo
            }
        }
        */


    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
}  