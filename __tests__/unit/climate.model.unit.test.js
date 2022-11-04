const { tempratureByMonth } = require('../../models/climate')

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.1;
global.Math = mockMath;

describe('climete.model.unit', () => {
    test('tempratureByMonth should be instance of a Function', () => {
        expect(tempratureByMonth).toBeInstanceOf(Function)
    })
    test('tempratureByMonth should return colder temprature during winter', () => {
        const temprature = 10
        const date = {
            year: 1000,
            month: 0,
            day:20
        }
        const actual = tempratureByMonth(temprature, date)
        expect(actual).toBeLessThan(temprature)
    })
    test('tempratureByMonth should return warmer temprature during summer', () => {
        const temprature = 10
        const date = {
            year: 1000,
            month: 7,
            day:20
        }
        const actual = tempratureByMonth(temprature, date)
        expect(actual).toBeGreaterThan(temprature)
    })
})