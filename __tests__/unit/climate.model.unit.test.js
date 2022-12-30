const { tempratureByMonth, getTempratureDescription, getWeatherDescription, getWeather } = require('../../models/climate')
const { get } = require('../../localization')
const { 
    ENUM_WEATHER, ENUM_BIOMES
 } = require('../../generic/enums')

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

    test('getTempratureDescription should be instance of a Function', () => {
        expect(getTempratureDescription).toBeInstanceOf(Function)
    })
    test('getTempratureDescription should return freezing when temprature is bellow -2', () => {
        const temprature = -3
        const expected = get('world-temprature-freezing')
        const actual = getTempratureDescription(temprature)
        expect(actual).toBe(expected)
    })
    test('getTempratureDescription should return scorching when temprature is above 7 ', () => {
        const temprature = 8
        const expected = get('world-temprature-scorching')
        const actual = getTempratureDescription(temprature)
        expect(actual).toBe(expected)
    })
    test('getTempratureDescription should return warm when temprature is 3', () => {
        const temprature = 3
        const expected = get('world-temprature-warm')
        const actual = getTempratureDescription(temprature)
        expect(actual).toBe(expected)
    })

    test('getWeatherDescription should be instance of a Function', () => {
        expect(getWeatherDescription).toBeInstanceOf(Function)
    })
    test('getWeatherDescription should return description of weather clear', () => {
        const expected = get('weather-clear-description')
        const actual = getWeatherDescription(ENUM_WEATHER.CLEAR)
        expect(expected).toBe(actual)
    })
    test('getWeatherDescription should return description of weather windy', () => {
        const expected = get('weather-windy-description')
        const actual = getWeatherDescription(ENUM_WEATHER.WINDY)
        expect(expected).toBe(actual)
    })

    test('getWeather should be instance of a Function', () => {
        expect(getWeather).toBeInstanceOf(Function)
    })

    
})