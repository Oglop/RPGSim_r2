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


const equipCleric = (character) => {
    const club = itemBuilder.build(ENUM_ITEM_TYPE.MACE, ENUM_ITEM_TIER.COMMON)
}

const equipCharacter = (character) => {
    try {
        switch (character.job) {
            case ENUM_JOB_NAMES.cleric: equipCleric(character); break;
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