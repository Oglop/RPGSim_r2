const {
    createUniqueGodName,
    createProfile,
    createSymbol,
    createDescription
} = require('../models/mythos')
const {
    generateID,
    copyObject,
    getRandomNumberInRange,
} = require('../lib/utils')
const objects = require('../generic/objects')


/**
 * 
 * @param {{ numberOfGods:number }} options 
 */
module.exports.build = (options = {}) => {
    const gods = []
    const names = []
    const numberOfGods = (options.numberOfGods != undefined) ? options.numberOfGods : getRandomNumberInRange(6, 12)
    for (let i = 0; i < numberOfGods; i++) {
        const god = copyObject(objects.god)
        god.id = generateID()
        god.name = createUniqueGodName(names)
        god.profile = createProfile()
        god.symbol = createSymbol()
        god.description = createDescription()
        gods.push(god)
    }

    return gods
}
