const { ENUM_COMMANDS } = require('../../../generic/enums')
const objects = require('../../../generic/objects')
const { getRandomNumberInRange } = require('../../../lib/utils')
const { executeCommands } = require('../../../persistance/commandQueue')
const { logError } = require('../../../data/errorFile')

const execute = (source, encounter) => {
    try {

    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'process'
        err.step = '-'
        err.message = e.message
        logError(err)
    }
}

