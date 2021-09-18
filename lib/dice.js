const { ENUM_DICE } = require('../generic/enums')
const D4 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 4) + plus
    }
    return sum
}

const D6 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 6) + plus
    }
    return sum
}

const D8 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 8) + plus
    }
    return sum
}

const D10 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 10) + plus
    }
    return sum
}

const D12 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 12) + plus
    }
    return sum
}

const D20 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 20) + plus
    }
    return sum
}

const D100 = (numberOfDice = 1, plus = 0) => {
    let sum = 0
    for (let i = 0; i<numberOfDice; i++) {
        sum += Math.floor( 1 + Math.random() * 100) + plus
    }
    return sum
}

const getDiceByEnum = eDice => {
    switch (eDice) {
        case ENUM_DICE.d4: return D4
        case ENUM_DICE.d6: return D6
        case ENUM_DICE.d8: return D8
        case ENUM_DICE.d10: return D10
        case ENUM_DICE.d12: return D12
        case ENUM_DICE.d20: return D20 
        case ENUM_DICE.d100: return D100 
    }
}

module.exports = {
    D4, D6, D8, D10, D12, D20, D100, getDiceByEnum
}