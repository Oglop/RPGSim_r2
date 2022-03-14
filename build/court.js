const { 
    copyObject,
    chance,
    generateID,
    getRandomNumberInRange
} = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_RACE_NAME
 } = require('../generic/enums')
const familyBuilder = require('../build/families')
const { getRaceFromDwellingType } = require('../models/dwelling')

/**
 * build court
 * 
 * @param {object} dwelling
 * @param {object} options {
 * dwelling object
 * race: ENUM_RACE_NAME
 * date: date object
 * }
 */
module.export.build = (dwelling, options) => {

    const dwellingId = dwelling.id
    const race = getRaceFromDwellingType(dwelling)
    const rulerFamily = createHistoricFamily({
        dwellingId,
        race,
        date
    })
    createHistoricFamily
}