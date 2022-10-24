const attack = require('../../models/encounterRulesEngine/rules/attack')
const pass = require('../../models/encounterRulesEngine/rules/pass')
const { ENUM_HEALTH_STATUS, ENUM_ENCOUNTER_ACTION_TYPE, ENUM_ITEM_TYPE } = require('../../generic/enums')

describe('modles.encounterRulesEngine.rules.unit.test', () => {
    test('attack.process should be instance of a  function', () => {
        expect(attack.process).toBeInstanceOf(Function)
    })
    test('pass.process should be instance of a  function', () => {
        expect(pass.process).toBeInstanceOf(Function)
    })

    test('attack.process should should return true if character is berzerk', () => {
        const source = {
            statuses: [ ENUM_HEALTH_STATUS.BERZERK ],
            equipment:{
                weaponHand: {
                    type: ENUM_ITEM_TYPE.DAGGER
                }
            }
        }
        const actual = attack.process(source, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
        expect(actual).toBe(true)
    })
    test('attack.process should should return false if character is equiped with bow and action type is melee', () => {
        const source = {
            statuses: [],
            equipment:{
                weaponHand: {
                    type: ENUM_ITEM_TYPE.BOW
                }
            }
        }
        const actual = attack.process(source, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
        expect(actual).toBe(false)
    })
    test('attack.process should should return false if character is UNCONSCIOUS', () => {
        const source = {
            statuses: [ ENUM_HEALTH_STATUS.UNCONSCIOUS ],
            equipment:{
                weaponHand: {
                    type: ENUM_ITEM_TYPE.ONE_HAND_SWORD
                }
            }
        }
        const actual = attack.process(source, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
        expect(actual).toBe(false)
    })
    test('attack.process should should return false if character is critical', () => {
        const source = {
            statuses: [],
            equipment:{
                weaponHand: {
                    type: ENUM_ITEM_TYPE.ONE_HAND_SWORD
                }
            },
            health: 1,
            maxHealth:100
        }
        const actual = attack.process(source, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
        expect(actual).toBe(false)
    })
    test('attack.process should should return true if character is not critical', () => {
        const source = {
            statuses: [],
            equipment:{
                weaponHand: {
                    type: ENUM_ITEM_TYPE.AXE
                }
            },
            health: 100,
            maxHealth:100
        }
        const actual = attack.process(source, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
        expect(actual).toBe(true)
    })
    test('pass.process should should return true', () => {
        const source = {
            statuses: [],
            equipment:{
                weaponHand: {
                    type: ENUM_ITEM_TYPE.AXE
                }
            },
            health: 100,
            maxHealth:100
        }
        const actual = pass.process(source, ENUM_ENCOUNTER_ACTION_TYPE.MELEE)
        expect(actual).toBe(true)
    })
})