const objects = require('../generic/objects')
const { getDwellingName } = require('../generic/names')
const { generateID, copyObject } = require('../lib/utils')
const { getDwarfWord } = require('../lib/language')
const { ENUM_DWELLINGS } = require('../generic/enums')

module.exports.build = (type) => {
    const d = copyObject(objects.dwelling)
    d.id = generateID()
    d.type = type
    if (type == ENUM_DWELLINGS.DWARVEN_MINE) {
        d.name = getDwarfWord()
    } else {
        d.name = getDwellingName()
    }
    
    return d
}