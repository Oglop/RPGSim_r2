const {
    ENUM_ENCOUNTER_ACTION,
    ENUM_ENCOUNTER_RULE
} = require('../../generic/enums')

/**
 * return array of rules
 * @param {{}} source 
 * @returns {Array}
 */
const getRules = (source) => {
    const rules = []
    source.actions.forEach(action => {
        switch (action) {
            case ENUM_ENCOUNTER_ACTION.ATTACK: rules.push(ENUM_ENCOUNTER_RULE.ATTACK); break;
            case ENUM_ENCOUNTER_ACTION.DEFEND: rules.push(ENUM_ENCOUNTER_RULE.DEFEND); break;
        }
    });
    return rules
    
}

/**
 * validate rules and return action
 * @param {{ actions: [ ENUM_ENCOUNTER_ACTION ] }} source 
 * @param {ENUM_ENCOUNTER_ACTION_TYPE} encounterActionType
 * @return {{ execute: Function }}
 */
const validate = (source, encounterActionType) => {
    const rules = getRules(source)
    const action = ENUM_ENCOUNTER_ACTION.PASS
    for (let rule of rules) {
        if (rule.process(source, encounterActionType)) {
            action = getActionFromRule(rule)
        }
    }
    return action
}

module.exports = {
    validate
}