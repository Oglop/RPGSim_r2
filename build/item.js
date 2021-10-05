const { ENUM_ITEM_TYPE, ENUM_ITEM_TIER } = require('../generic/enums')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const { getRandomNumberInRange, copyObject, getRandomElementFromArray } = require('../lib/utils')


const weapons = {
    daggers: {
        common: [
            { name: 'Short dagger', use: getRandomNumberInRange(2, 6) },
            { name: 'Knife', use: getRandomNumberInRange(1, 4) },
            { name: 'Thiefs dagger', use: getRandomNumberInRange(3, 5) }
        ],
        elite: [
            { name: 'Curved dagger', use: getRandomNumberInRange(4, 8) }
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