const { ENUM_HEALTH_STATUS, ENUM_ENCOUNTER_ACTION_TYPE, ENUM_ITEM_TYPE, ENUM_SKILL_NAMES } = require('../../../generic/enums')
const objects = require('../../../generic/objects')
const { getRandomNumberInRange } = require('../../../lib/utils')
const { executeCommands } = require('../../../persistance/commandQueue')
const { logError } = require('../../../data/errorFile')
const { checkCharacterSkill } = require('../../skill')

/**
 * return true if source are able to make attack
 * @param {{statuses[], health: Number, maxHealth: Number, equipment:{}}} source 
 * @param {ENUM_ENCOUNTER_ACTION_TYPE} encounterActionType 
 */
 module.exports.process = (source, encounterActionType) => {
    try {
        if ( source.statuses.find(s => s == ENUM_HEALTH_STATUS.UNCONSCIOUS) != undefined ) { return false }
        if ( source.statuses.find(s => s == ENUM_HEALTH_STATUS.BERZERK) != undefined ) { return false }
        const healthPercentage = (source.health / source.maxHealth) * 100
        if (healthPercentage < 5) { return false }
        if ( checkCharacterSkill(source, ENUM_SKILL_NAMES.sneak) == 1) {
            return true
        }

        return false
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'process'
        err.message = e.message
        logError(err)
    }
}