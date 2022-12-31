const { ENUM_HEALTH_STATUS, ENUM_ENCOUNTER_ACTION_TYPE, ENUM_ITEM_TYPE, ENUM_STAT_NAMES } = require('../../../generic/enums')
const objects = require('../../../generic/objects')
const { checkCharacterStat  } = require('../../skill')
const { getRandomNumberInRange, isEmptyObject } = require('../../../lib/utils')
const { executeCommands } = require('../../../persistance/commandQueue')
const { logError } = require('../../../data/errorFile')

/**
 * return true if source are able to make attack
 * @param {{statuses[], health: Number, maxHealth: Number, equipment:{}}} source 
 * @param {ENUM_ENCOUNTER_ACTION_TYPE} encounterActionType 
 */
 module.exports.process = (source, encounterActionType) => {
    try {
        if (encounterActionType != ENUM_ENCOUNTER_ACTION_TYPE.RANGED) { return false }
        const successes = checkCharacterStat(source, ENUM_STAT_NAMES.vit)
        if ( successes.length > 0 ) {
            return true
        }
        return false
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'process'
        err.step = '-'
        err.message = e.message
        logError(err)
    }
}