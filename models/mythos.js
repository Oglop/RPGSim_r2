const { 
    getRandomElementFromArray, 
    capitalizeFirstLetter,
    getRandomNumberInRange,
    chance
} = require('../lib/utils')

const {
    things, descriptive
} = require('../generic/names')

const firstWords = [
    'fa',
    'la',
    'jo',
    'kin',
    'kro',
    'sha',
    'esh',
    'uh',
    'uhl',
    'ush',
    'ur',
    'qro',
    'quz',
    'quu',
    'wr'
]

const midWords = [
    'a',
    'bo',
    'ga',
    'ci',
    'gi',
    'e'
]

const lastWords = [
    'jana',
    'abba',
    'boz',
    'hai',
    'ho',
    'fo',
    'zou',
    'aosh',
    'zar'
]

const godElements = [
    'Blood',
    'Murder',
    'Wealth',
    'War',
    'Trade',
    'Deceit',
    'Labor',
    'Truth',
    'Dusk',
    'Death',
    'Dawn',
    'Birth',
    'Travel',
    'Willpower',
    'Storms',
    'Rivers',
    'Winds',
    'Wisdom',
    'Mountains',
    'Oceans',
    'Sky',
    'Plains',
    'Forests',
    'Sun',
    'Moon',
    'Stars',
    'Trade',
    'Harvest',
    'Wine',
    'Disease',
    'Music',
]

/**
 * 
 * @param {Array} gods 
 * @returns {{name: string}} name 
 */
const createUniqueGodName = (names) => {
    let name = ''
    while (name == '') {
        const test = capitalizeFirstLetter(`${getRandomElementFromArray(firstWords)}${getRandomElementFromArray(midWords)}${getRandomElementFromArray(lastWords)}`)
        if (!names.includes(test)) {
            names.push(test)
            name = test
        }
    }
    return name;
}

/**
 * returns descripton of god
 * @returns {{profile: string}}
 */
const createProfile = () => {
    const elements = []
    let test = 100
    while (chance(test)) {
        const x = getRandomElementFromArray(godElements)
        if (!elements.includes(x)) {
            elements.push(x)
            test -= getRandomNumberInRange(30, 60)
        }
    }
    
    let profile = ''
    for (let i = 0, j = elements.length; i < j; i++) {
        profile += elements[i]
        if (j - i > 2) { profile += ', ' }
        if (j - i == 2) { profile += ' and ' }
    }
    return profile
}

/**
 * 
 */
const createSymbol = () => {
    const thing = getRandomElementFromArray(things)
    const desc = getRandomElementFromArray(descriptive)
    return `${desc} ${thing}`
}

module.exports = {
    createUniqueGodName,
    createProfile,
    createSymbol
}
