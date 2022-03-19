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

const setWorldStartDate = (options) => {
    const date = copyObject(objects.date)
    date.year = 0
    date.month = 2
    date.day = 1
    return date
} 

const generateWorld = async (options = {}) => {
    
    const errors = []
    try {
        const size = (options.size) ? options.size : worldSize
        const world = copyObject(objects.world)
        world.id = generateID()
        world.name = 'Heria'
        world.date = setWorldStartDate({})
        try {
            world.map = await mapBuilder.build( { size, worldId: world.id } )
        } catch (e) {
            const err = objects.error
            err.file = __filename
            err.function = 'generateWorld'
            err.step = 'mapBuilder.build'
            err.message = e.message
            errors.push(err)
        }
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

    
    


    
    /* while (atempts > 0) {
        try {
            world.map = mapBuilder.build( { size: 30 } )
            break
        } catch (e) {
            if (e instanceof WorldGenerationFailedError) {
                atempts--
                console.log(e.message)
            }
            const err = objects.error
            err.file = __filename
            err.function = 'generateWorld'
            err.message = e.message
            logError(err)
        }
    }
    */
    
    /*
    familyTreeBuilder.build(world, output, {
        years: 200,
        noOfStartFamilies: 4,
        noOfStartDwellings: 3
    })

    mapBuilder.setDwellings(world.map, size)
    mapBuilder.buildFarmlands(world.map, size)
    mapBuilder.buildLandMarks(world.map, size)
    //const dwellings = getDwellingsFromMap(world.map)
    //world.families = familyBuilder.build({ dwellings, date: world.date })
    
    world.darkness = 10
    if (saveVisualization) { writeMap(world.map, world.id) }
    if (saveWorld) { save(world, { id: world.id, fileType: ENUM_FILE_TYPE.WORLD }) }
    */
    return world
}

module.exports = {
    generateWorld
}