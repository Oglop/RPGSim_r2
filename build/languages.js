const { ENUM_LANGUAGES } = require('../generic/enums')
const { copyObject } = require('../lib/utils')
const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
 
/**
 * Accepts Object of type character
 * 
 * @param {Object} c Object of type Character
 * @returns {Array} list of Object of type Languages
 */
module.exports.build = (c) => {
    try {

    } catch (e) {
        const err = objects.error
        err.file = __dirname
        err.function = 'build'
        err.message = e.message
        logError(err)
    }
}