const m = require('../models/skill')
const b = require('../build/skill')
const { copyObject } = require('../lib/utils')
const objects = require('../generic/objects')
const { ENUM_SKILL_NAMES,
ENUM_STAT_NAMES } = require('../generic/enums')

describe('skill tests', () => {
    test('check party skills', () => {
        const p = copyObject(objects.party)
        const c1 = {
            id: '1',
            name: 'a',
            skills: [{
                name: ENUM_SKILL_NAMES.lockPicking,
                statsBase: ENUM_STAT_NAMES.agi,
                luckTest: false
            }],
            stats: {
                str: 0,
                vit: 0,
                agi: 0,
                wis: 0,
                int: 0,
                cha: 0,
                luc: 0
            }
        }
        const c2 = {
            id: '2',
            name: 'b',
            skills: [{
                name: ENUM_SKILL_NAMES.fishing,
                statsBase: ENUM_STAT_NAMES.wis,
                luckTest: true
            }],
            stats: {
                str: 0,
                vit: 0,
                agi: 0,
                wis: 20,
                int: 0,
                cha: 0,
                luc: 0
            }
        }
        const c3 = {
            id: '3',
            name: 'c',
            skills: [{
                name: ENUM_SKILL_NAMES.leadership,
                statsBase: ENUM_STAT_NAMES.int,
                luckTest: false
            }],
            stats: {
                str: 0,
                vit: 0,
                agi: 0,
                wis: 0,
                int: 0,
                cha: 0,
                luc: 0
            }
        }
        p.members = [ c1, c2, c3 ]

        const successes = m.checkPartySkill(p, ENUM_SKILL_NAMES.fishing)
        expect(successes[0].name).toBe('b')

    })
})