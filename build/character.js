const objects = require('../generic/objects')
const { copyObject, generateID } = require('../lib/utils')

module.exports.build = (options) => {
    const character = copyObject(objects.character)
    character.id = generateID()

    return character
}

