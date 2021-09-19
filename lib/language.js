const { ENUM_LANGUAGES } = require('../generic/enums')
const  { getRandomElementFromArray, chance } = require('./utils')

const getDwarfWord = () => {
    const words = [
        'hu',
        'dri',
        'dom',
        'fri',
        'ronr',
        'fra',
        'gru',
        'gof',
        'hi',
        'klon',
        'kox',
        'lum',
        'los',
        'mon',
        'mre',
        'ni',
        'pr',
        'qui',
        'qva',
        'quz',
        'qa',
        'qo'
    ]
    let w = getRandomElementFromArray(words)
    if (chance(40)) {
        w += '-'
    } else {
        w += getRandomElementFromArray(words)
    }
    w += getRandomElementFromArray(words)
    return w


}

const getAncientWord = () => {
    const words = [
        ''
    ]
}


module.exports = {
    getDwarfWord,
    getAncientWord
}