const { ENUM_LANGUAGES } = require('../generic/enums')
const  { getRandomElementFromArray, chance, capitalizeFirstLetter } = require('./utils')

const getElfWord = () => {
    const word = [
        'gon',
        'do',
        'lin',
        'mo',
        'ri',
        'er',
        'bor',
        'ang',
        'ed',
        'lui',
        'wa',
        'be',
        're',
        'lia',
        'ath',
        'bal',
        'ar',
        'an',
        'fau',
        'ith',
        'est'
    ]
    let w = getRandomElementFromArray(word)
    if (chance(50)) {
        w += getRandomElementFromArray(word)
    }
    w += getRandomElementFromArray(word)
    w = capitalizeFirstLetter(w)
    return w
}

const getDwarfWord = () => {
    const word = [
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
    let w = getRandomElementFromArray(word)
    if (chance(40)) {
        w += '-'
    } else {
        w += getRandomElementFromArray(word)
    }
    w += getRandomElementFromArray(word)
    w = capitalizeFirstLetter(w)
    return w


}

//TODO
const getAncientWord = () => {
    const words = [
        ''
    ]
    return ''
}


module.exports = {
    getDwarfWord,
    getAncientWord,
    getElfWord
}