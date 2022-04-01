const { WorldGenerationFailedError } = require('../exceptions')
const objects = require('../generic/objects')
const mapBuilder = require('../build/map')
const familyBuilder = require('../build/families')
const familyTreeBuilder = require('../build/familyTree')
const { copyObject, generateID } = require('../lib/utils')
const { getDwellingsFromMap } = require('../models/map')
const { ENUM_FILE_TYPE } = require('../generic/enums')
const { save } = require('../data/fileStorage')
const { logError } = require('../data/errorFile')
const { writeMap } = require('../output/visualize')
const { saveVisualization, saveWorld, worldSize } = require('../config')
const { Output } = require('../output/output')
const { insertWorld } = require('../persistance').commands

const setWorldStartDate = (options) => {
    const date = copyObject(objects.date)
    date.year = 500
    date.month = 2
    date.day = 1
    return date
} 

const generateWorld = async (options = {}) => {
    const world = copyObject(objects.world)
    const errors = []
    try {
        world.id = generateID()
        world.name = 'Heria'
        
        try {
            world.date = setWorldStartDate({})
            await mapBuilder.build(world)
        } catch (e) {
            const err = objects.error
            err.file = __filename
            err.function = 'generateWorld'
            err.step = 'mapBuilder.build'
            err.message = e.message
            errors.push(err)
        }

        await insertWorld(world)
    }
    catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'generateWorld'
        err.message = e.message
        errors.push(err)
    }
    if (errors.length > 0) {
        errors.forEach(e => {
            logError(e)
        });
    }
    return world
}

module.exports = {
    generateWorld
}