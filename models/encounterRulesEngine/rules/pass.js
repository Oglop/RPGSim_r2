const { ENUM_HEALTH_STATUS, ENUM_ENCOUNTER_ACTION_TYPE, ENUM_ITEM_TYPE } = require('../../../generic/enums')
const objects = require('../../../generic/objects')
const { getRandomNumberInRange } = require('../../../lib/utils')
const { executeCommands } = require('../../../persistance/commandQueue')
const { logError } = require('../../../data/errorFile')

/**
 * return true if source are able to make attack
 * @param {{statuses[], health: Number, maxHealth: Number, equipment:{}}} source 
 * @param {ENUM_ENCOUNTER_ACTION_TYPE} encounterActionType 
 */
 module.exports.process = (source, encounterActionType) => {
    try {
        return true
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'process'
        err.step = '-'
        err.message = e.message
        logError(err)
    }
}