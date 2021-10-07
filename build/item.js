const { ENUM_ITEM_TYPE, ENUM_ITEM_TIER } = require('../generic/enums')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { getRandomNumberInRange, copyObject, getRandomElementFromArray } = require('../lib/utils')


const weapons = {
    daggers: {
        common: [
            { name: 'Short dagger', use: getRandomNumberInRange(2, 6), value: 8 },
            { name: 'Knife', use: getRandomNumberInRange(1, 4), value: 5 },
            { name: 'Thiefs dagger', use: getRandomNumberInRange(3, 5), value: 8 }
        ],
        elite: [
            { name: 'Curved dagger', use: getRandomNumberInRange(4, 8), value: 12 },
            { name: 'Long dagger', use: getRandomNumberInRange(3, 9), value: 12 }
        ]
    },
    swords: {
        common: [
            { name: 'Short sword', use: getRandomNumberInRange(4, 7), value: 11 },
            { name: 'Long sword', use: getRandomNumberInRange(6, 8), value: 14 },
            { name: 'Curved sword', use: getRandomNumberInRange(4, 12), value: 16 },
            { name: 'Knight sword', use: getRandomNumberInRange(8, 12), value: 20 }
        ],
        elite: [
            { name: 'Mythril sword', use: getRandomNumberInRange(12, 18), value: 30 },
            { name: 'Royal guard sword', use: getRandomNumberInRange(10, 20), value: 30 },
            { name: 'Rune sword', use: getRandomNumberInRange(14, 22), value: 36 }
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
 * @param {*} options 
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



    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
}  