const {
    ENUM_ENCOUNTER_RULE
} = require('../../generic/enums')
const attackRule = require('./rules/attack')
const passRule = require('./rules/pass')
const sneakAttackRule = require('./rules/sneakAttack')


const getActionFromRule = () => {

}

/**
 * 
 * @param {ENUM_ENCOUNTER_RULE} rule 
 */
const getRule = rule => {
    switch (rule) {
        case ENUM_ENCOUNTER_RULE.ATTACK: return attackRule;
        case ENUM_ENCOUNTER_RULE.SNEAK_ATTACK: return sneakAttackRule;
        case ENUM_ENCOUNTER_RULE.PASS: return passRule;
    }
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
        const check = getRule(rule)
        if (check.process(source, encounterActionType)) {
            action = getActionFromRule(rule)
        }
    }
    return action
}

module.exports = {
    validate
}