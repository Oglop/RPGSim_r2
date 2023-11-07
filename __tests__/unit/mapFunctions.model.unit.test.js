
const { waveCollapse } = require('../../models/mapFunctions')

describe('map functions unit tests', () => {
    test('waveCollaps should return map')
    const actual = waveCollapse(0, 5, {
        resistance:2,
        placeHolder: 999,
        defaultValue: 1
    })

    expect(actual).not.toBe(undefined)

})
