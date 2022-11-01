const { ENUM_PERSONALITIES } = require('../../generic/enums')
const { isWithinBudget } = require('../../models/ruler')

describe('ruler.model.unit.test', () => {
    test('isWithinBudget should return false when not in budget', () => {
        const dwelling = { 
            id:'123', 
            court: { 
                monthlyExpense: 95,
                monthlyIncome:100,
                ruler: { 
                    personality: ENUM_PERSONALITIES.AMBITIOUS
                } 
            } 
        }
        const actual = isWithinBudget(dwelling)
        expect(actual).toBe(false)
    })
    test('isWithinBudget should return true when in budget', () => {
        const dwelling = { 
            id:'123', 
            court: { 
                monthlyExpense: 94,
                monthlyIncome:100,
                ruler: { 
                    personality: ENUM_PERSONALITIES.AMBITIOUS
                } 
            } 
        }
        const actual = isWithinBudget(dwelling)
        expect(actual).toBe(true)
    })
})
