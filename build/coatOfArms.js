const { getRandomNumberInRange, capitalizeFirstLetter, isVowel } = require('../lib/utils')
const { get } = require('../localization')

const getColor = () => {
    const i = getRandomNumberInRange(0, 8)
    switch (i) {
        case 0: return get('coat-of-arms-field-color-or')
        case 1: return get('coat-of-arms-field-color-argent')
        case 2: return get('coat-of-arms-field-color-gules')
        case 3: return get('coat-of-arms-field-color-azure')
        case 4: return get('coat-of-arms-field-color-vert')
        case 5: return get('coat-of-arms-field-color-sable')
        case 6: return get('coat-of-arms-field-color-purpure')
        case 7: return get('coat-of-arms-field-color-tenne')
        case 8: return get('coat-of-arms-field-color-sanguine')
    }
}

const getField = () => {
    const i = getRandomNumberInRange(0, 6)
    switch (i) {
        case 0: return get('coat-of-arms-field-shape-shield')
        case 1: return get('coat-of-arms-field-shape-flag')
        case 2: return get('coat-of-arms-field-shape-oval')
        case 3: return get('coat-of-arms-field-shape-lozenge')
        case 4: return get('coat-of-arms-field-shape-hex')
        case 5: return get('coat-of-arms-field-shape-heather')
        case 6: return get('coat-of-arms-field-shape-crescent')
    }
}

const getDivision = () => {
    const i = getRandomNumberInRange(0, 8)
    switch (i) {
        case 0: return get('coat-of-arms-division-fess')
        case 1: return get('coat-of-arms-division-pale')
        case 2: return get('coat-of-arms-division-bend')
        case 3: return get('coat-of-arms-division-chevron')
        case 4: return get('coat-of-arms-division-cross')
        case 5: return get('coat-of-arms-division-saltire')
        case 6: return get('coat-of-arms-division-chief')
        case 7: return get('coat-of-arms-division-bordure')
        case 8: return get('coat-of-arms-division-pile')
    }
}

/**
 * 
 * @param {boolean} single 
 */
const getFigure = (single) => {
    let f = ''
    const i = getRandomNumberInRange(0, 25)
    switch (i) {
        case 0: f = get('coat-of-arms-figure-fish'); break;
        case 1: f = get('coat-of-arms-figure-hawk'); break;
        case 2: f = get('coat-of-arms-figure-griffin'); break;
        case 3: f = get('coat-of-arms-figure-sword'); break;
        case 4: f = get('coat-of-arms-figure-axe'); break;
        case 5: f = get('coat-of-arms-figure-crown'); break;
        case 6: f = get('coat-of-arms-figure-lance'); break;
        case 7: f = get('coat-of-arms-figure-hound'); break;
        case 8: f = get('coat-of-arms-figure-boar'); break;
        case 9: f = get('coat-of-arms-figure-lion'); break;
        case 10: f = get('coat-of-arms-figure-passant'); break;
        case 11: f = get('coat-of-arms-figure-wolf'); break;
        case 12: f = get('coat-of-arms-figure-dragon'); break;
        case 13: f = get('coat-of-arms-figure-cup'); break;
        case 14: f = get('coat-of-arms-figure-star'); break;
        case 15: f = get('coat-of-arms-figure-crow'); break;
        case 16: f = get('coat-of-arms-figure-unicorn'); break;
        case 17: f = get('coat-of-arms-figure-scepter'); break;
        case 18: f = get('coat-of-arms-figure-horse'); break;
        case 19: f = get('coat-of-arms-figure-hart'); break;
        case 20: f = get('coat-of-arms-figure-key'); break;
        case 21: f = get('coat-of-arms-figure-rose'); break;
        case 22: f = get('coat-of-arms-figure-tower'); break;
        case 23: f = get('coat-of-arms-figure-bolt'); break;
        case 24: f = get('coat-of-arms-figure-feather'); break;
        case 25: f = get('coat-of-arms-figure-skull'); break;
    }
    if (!single) {
        return `${f}s`
    }
    return f
}

const getNumber = () => {
    const i = getRandomNumberInRange(0, 5)
    switch (i) {
        case 0: return get('system-word-one')
        case 1: return get('system-word-two')
        case 2: return get('system-word-three')
        case 3: return get('system-word-four')
        case 4: return get('system-word-five')
        case 5: return get('system-word-six')
    }
}



module.exports.build = () => {
    const fieldColor = getColor()
    const fieldType = getField()
    const fieldAnA = (isVowel(fieldColor)) ? get('system-word-an') : get('system-word-a')
    
    const divisionColor = getColor()
    const divisionType = getDivision()
    const divisionAnA = (isVowel(divisionColor)) ? get('system-word-an') : get('system-word-a')
    
    const number = getNumber()
    const figure = (number == get('system-word-one')) ? getFigure(true) : getFigure(false)

    const descriptionFirst = capitalizeFirstLetter(`${number} ${figure}`)//. A ${args[2]} ${args[3]} over a ${args[4]} ${args[5]}`
    const descriptionSecond = capitalizeFirstLetter(`${divisionAnA} ${divisionColor} ${divisionType}`)
    const descriptionThird = `${fieldAnA} ${fieldColor} ${fieldType}`

    return `${descriptionFirst}. ${descriptionSecond} over ${descriptionThird}.`

}