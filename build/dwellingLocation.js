// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_DWELLING_LOCATION_STATUS,
    ENUM_DWELLING_LOCATION_TYPE
} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray, 
    generateID} = require('../lib/utils')

// STANDARD IMPORTS

const getLocationName = (dwelling, type) => {

}

module.exports.build = (dwelling, options = {}) => {
    try {
        const type = (options.type) ? options.type : ENUM_DWELLING_LOCATION_TYPE.TAVERN
        const status = (options.status) ? options.status : ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION
        const dl = copyObject(objects.dwellingLocation)
        dl.status = status
        dl.type = type
        dl.id = generateID()
        dl.dwellingId = dwelling.id
        dl.name = getLocationName(dwelling.name, type)
        return dl
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'build'
        err.message = e.message                                                                                                                      
        logError(err)
    }
}