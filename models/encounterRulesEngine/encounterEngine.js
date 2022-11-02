const {
    ENUM_ENCOUNTER_RULE
} = require('../../generic/enums')

const getActionFromRule = () => {

}

/**
 * validate rules and return action
 * @param {{ encounterRules: [ ENUM_ENCOUNTER_RULE ] }} source 
 * @param {ENUM_ENCOUNTER_ACTION_TYPE} encounterActionType
 * @return {{ execute: Function }}
 */
const validate = (source, encounterActionType) => {
    var action = getActionFromRule(ENUM_ENCOUNTER_RULE.PASS)
    for (let rule of source.encounterRules) {
        if (rule.process(source, encounterActionType)) {
            action = getActionFromRule(rule)
        }
    }
    return action
}

module.exports = {
    validate
}