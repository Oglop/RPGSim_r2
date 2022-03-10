const { getRandomNumberInRange } = require('../lib/utils')
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

module.exports.build = () => {
    const fieldColor = getColor()
    const fieldType = getField()
    const divisionColor = getColor()
    const divisionType = getDivision()

    return get('coat-of-arms-description', [
        divisionColor, divisionType, fieldColor, fieldType
    ])

}