const { 
    chance, 
    getRandomElementFromArray, 
    getRandomNumberInRange 
} = require('../lib/utils')
const { 
    ENUM_ITEM_TIER, 
    ENUM_ITEM_TYPE,
    ENUM_JOB_NAMES,
    ENUM_SKILL_NAMES
} = require('../generic/enums')
const objects = require('../generic/objects')
const itemBuilder = require('../build/item')
const { characterKnowsSkill } = require('../models/skill')

const equipFromSkills = character => {
    
    if (characterKnowsSkill(character, ENUM_SKILL_NAMES.bow)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.BOW, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.dagger)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.DAGGER, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.axe)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.AXE, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.twoHandSword)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.TWO_HAND_SWORD, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.mace)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.MACE, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.spear)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.SPEAR, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.oneHandSword)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.ONE_HAND_SWORD, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.staff)) {
        character.equipment.weaponHand = itemBuilder.build(ENUM_ITEM_TYPE.STAFF, ENUM_ITEM_TIER.COMMON)
    }
    if (characterKnowsSkill(character, ENUM_SKILL_NAMES.shield)) {
        if (!hasEquiped(character, ENUM_ITEM_TYPE.TWO_HAND_SWORD) && !hasEquiped(character, ENUM_ITEM_TYPE.BOW) && !hasEquiped(character, ENUM_ITEM_TYPE.STAFF)) {
            character.equipment.shieldHand = itemBuilder.build(ENUM_ITEM_TYPE.SHIELD, ENUM_ITEM_TIER.COMMON)
        }
    }
    if (characterKnowsSkill(character, ENUM_SKILL_NAMES.heavyArmor)) {
        character.equipment.body = itemBuilder.build(ENUM_ITEM_TYPE.HEAVY_ARMOR, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.lightArmor)) {
        character.equipment.body = itemBuilder.build(ENUM_ITEM_TYPE.LIGHT_ARMOR, ENUM_ITEM_TIER.COMMON)
    } else if (characterKnowsSkill(character, ENUM_SKILL_NAMES.robes)) {
        character.equipment.body = itemBuilder.build(ENUM_ITEM_TYPE.ROBES, ENUM_ITEM_TIER.COMMON)
    }
}

const hasEquiped = (character, itemType) => {
    try {
        if (character.equipment.head != undefined && character.equipment.head.type === itemType) { return true }
        if (character.equipment.weaponHand != undefined && character.equipment.weaponHand.type === itemType) { return true }
        if (character.equipment.shieldHand != undefined && character.equipment.shieldHand.type === itemType) { return true }
        if (character.equipment.body != undefined && character.equipment.body.type === itemType) { return true }
        return false
    } catch (e) {
        return false
    }
}

const equipCharacter = (character) => {
    try {
        equipFromSkills(character)

    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'equipCharacter'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    equipCharacter,
    hasEquiped
}