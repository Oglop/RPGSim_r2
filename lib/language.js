const { ENUM_LANGUAGES } = require('../generic/enums')
const  { getRandomElementFromArray, chance, capitalizeFirstLetter } = require('./utils')

const getElfWord = (capitalize = true) => {
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
    if (capitalize) {
        w = capitalizeFirstLetter(w)
    }
    return w
}

const getDwarfWord = (capitalize = true) => {
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
    if (capitalize) {
        w = capitalizeFirstLetter(w)
    }
    return w


}

const getAncientWord = (capitalize = true) => {
    const word = [
        'aou',
        'aoe',
        'aie',
        'fi',
        'fu',
        'fo',
        'eii',
        'euu',
        'ee',
        'iw',
        'iiw',
        'iuw',
        'vol',
        'vil',
        'val',
        'ukr',
        'uxt',
        'ukk',
        'uxp',
        'ye',
        'yer',
        'yan',
        'noi',
        'nou',
        'nn',
        'mm',
        'll',
    ]
    let w = getRandomElementFromArray(word)
    w += getRandomElementFromArray(word)
    if (chance(80)) {
        w += getRandomElementFromArray(word)
    }
    if (chance(50)) {
        w += getRandomElementFromArray(word)
    }
    if (chance(20)) {
        w += getRandomElementFromArray(word)
    }
    if (capitalize) {
        w = capitalizeFirstLetter(w)
    }
    return w
}


module.exports = {
    getDwarfWord,
    getAncientWord,
    getElfWord
}