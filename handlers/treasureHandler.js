const { chance, getRandomNumberInRange } = require('../lib/utils')

const { 
    treasureStepStartValue,
    treasureStepDecreaseValue 
} = require('../config')

const getTreasure = level => {
    const treasureTable = [
        { level: 1, name: 'a few coins', min: 1, max: 3 },
        { level: 2, name: 'some coins', min: 2, max: 4 },
        { level: 3, name: 'a silver coin', min: 2, max: 5 },
        { level: 4, name: 'a copper broch', min: 3, max: 6 },
        { level: 5, name: 'a fox pelt', min: 4, max: 6 },
        { level: 6, name: 'a silver ring', min: 5, max: 7 },
        { level: 7, name: 'a silver braclet', min: 7, max: 9 },
        { level: 8, name: 'a pearl', min: 8, max: 12 },
        { level: 9, name: 'a silver crown', min: 10, max: 13 },
        { level: 10, name: 'a pouch of coins', min: 15, max: 20 },
        { level: 11, name: 'an engraved silver dagger', min: 18, max: 22 },
        { level: 12, name: 'an exquisite pelt', min: 22, max: 28 },
        { level: 13, name: 'a gold ring', min: 25, max: 28 },
        { level: 14, name: 'a simple gem', min: 26, max: 28 },
        { level: 15, name: 'a gold necklace', min: 30, max: 35 },
        { level: 16, name: 'a finely cut gem', min: 32, max: 36 },
        { level: 17, name: 'a golden scepter', min: 36, max: 40 },
        { level: 18, name: 'a large clear gem', min: 38, max: 44 },
        { level: 19, name: 'a gemmed necklace', min: 40, max: 48 },
        { level: 20, name: 'a golden gemmed crown', min: 45, max: 52 },
    ]
    level = (level < 1) ? 1 : (level > 20) ? 20 : level
    return treasureTable.find(x => x.level == level)
}

const treasureRoll = (level) => {
    let increaseChance = treasureStepStartValue
    let rollAgain = true
    while (rollAgain) {
        rollAgain = chance(increaseChance)
        if (rollAgain) {
            level++
            increaseChance -= treasureStepDecreaseValue
        }
    }
    return level
}

const getTreasureValue = treasure => {
    if (treasure === undefined) { return 0 }
    return getRandomNumberInRange(treasure.min, treasure.max)
}

module.exports = {
    getTreasure,
    treasureRoll,
    getTreasureValue
}
