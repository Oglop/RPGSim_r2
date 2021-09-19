const objects = require('../generic/objects')
const { ENUM_GENDER, ENUM_RACE_NAMES, ENUM_DWELLINGS } = require('../generic/enums')
const { copyObject, generateID, getRandomNumberInRange } = require('../lib/utils')
const { getFamilyName } = require('../generic/names')
const { dwelling } = require('../generic/objects')


/**
 * create a new family
 * @param {object} options { ?race: ENUM_RACE_NAMES,  }
 */
const createFamily = (options) => {

    const f = copyObject(objects.family)
    f.id = generateID()
    f.dwellingId = options.dwellingId
    f.name = getFamilyName()
    f.race = (!options.race) ? ENUM_RACE_NAMES.human : options.race


    return f
}

















/**
 * 
 * @param {Object} options { dwellings: [] }
 */
module.exports.build = (options) => {
    
    const families = []


    for (const d of options.dwellings) {
        let influence = 0
        let race = ENUM_RACE_NAMES.human

        switch (d.type) {
            case ENUM_DWELLINGS.TOWN: influence = 40; race = ENUM_RACE_NAMES.human; break; 
            case ENUM_DWELLINGS.CITY: influence = 100; race = ENUM_RACE_NAMES.human; break;
            case ENUM_DWELLINGS.ELF_TOWN: influence = 70; race = ENUM_RACE_NAMES.highElf; break;
            case ENUM_DWELLINGS.DWARVEN_MINE: influence = 60; race = ENUM_RACE_NAMES.dwarf; break;
        }
        influence += getRandomNumberInRange(-5, 5)
        const f = createFamily( { race: ENUM_RACE_NAMES.human, dwellingId: dwelling.id } )

    }

    
    
    
}
