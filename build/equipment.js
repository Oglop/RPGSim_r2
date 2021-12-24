const { 
    chance, 
    getRandomElementFromArray, 
    getRandomNumberInRange 
} = require('../lib/utils')
const { 
    ENUM_ITEM_TIER, 
    ENUM_ITEM_TYPE,
    ENUM_JOB_NAMES
} = require('../generic/enums')
const objects = require('../generic/objects')
const itemBuilder = require('../build/item')
const { character } = require('../generic/objects')


const equipCleric = (character) => {
    const weapon = itemBuilder.build(ENUM_ITEM_TYPE.MACE, ENUM_ITEM_TIER.COMMON)
    const armor = itemBuilder.build(ENUM_ITEM_TYPE.LIGHT_ARMOR, ENUM_ITEM_TIER.COMMON)

    character.equipment.weaponHand = weapon
    character.equipment.body = armor
}

const equipRouge = character => {

}

const equipFighter = character => {
    
}

const equipKnight = character => {
    
}

const equipWizard = character => {
    
}

const equipThief = character => {
    
}

const equipNoble = character => {
    
}

const equipCharacter = (character) => {
    try {
        switch (character.job) {
            case ENUM_JOB_NAMES.cleric: equipCleric(character); break;
            case ENUM_JOB_NAMES.rouge: 
            case ENUM_JOB_NAMES.fighter: 
            case ENUM_JOB_NAMES.knight: 
            case ENUM_JOB_NAMES.wizard: 
            case ENUM_JOB_NAMES.thief: 
            case ENUM_JOB_NAMES.noble: 
            case ENUM_JOB_NAMES.peseant: 
            case ENUM_JOB_NAMES.monk: 
            case ENUM_JOB_NAMES.ranger: 


        }
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'equipCharacter'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    equipCharacter
}