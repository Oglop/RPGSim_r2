const settings = require('./settings.json')
let {
    databasePath,
    fileStorage,
    saveVisualization,
    saveWorld,
    language,
    noOfAdventuringParties,
    partySize,
    treasureStepStartValue,
    treasureStepDecreaseValue,
    restThreshold,
    restThresholdMultiplyer,
    questLocationRadius,
} = require('./index')

module.exports.loadSettings = () => {
    if (settings != undefined) {
        databasePath = settings.databasePath,
        fileStorage = settings.fileStorage,
        saveVisualization = settings.saveVisualization,
        saveWorld = settings.saveWorld,
        language = settings.language,
        noOfAdventuringParties = settings.noOfAdventuringParties,
        partySize = settings.partySize,
        treasureStepStartValue = settings.treasureStepStartValue,
        treasureStepDecreaseValue = settings.treasureStepDecreaseValue,
        restThreshold = settings.restThreshold,
        restThresholdMultiplyer = settings.restThresholdMultiplyer
        questLocationRadius = settings.questLocationRadius
    }
}