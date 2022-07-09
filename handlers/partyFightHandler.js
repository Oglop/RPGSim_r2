const objects = require('../generic/objects')

const bMonster = require('../build/monster')

const { logError } = require('../data/errorFile')
const {} = require('../models/partyFight')

const process = async (monsterType, monsterStrength, gameMode, party) => {
    try {
        const monster = bMonster.build({
            mode: gameMode,
            type: monsterType,
            strength: monsterStrength
        })
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'process'
        err.message = e.message
        logError(err)
    }
}

module.exports = {
    process
}