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
const { saveVisualization, saveWorld } = require('../config')
        

const setWorldStartDate = (options) => {
    const date = copyObject(objects.date)
    date.year = 0
    date.month = 2
    date.day = 1
    return date
} 

const generateWorld = (output) => {
    
    let atempts = 3
    const world = copyObject(objects.world)
    world.id = generateID()
    world.name = 'Heria'
    world.date = setWorldStartDate({})
    world.map = mapBuilder.build( { size: 30 } )
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
    

    familyTreeBuilder.build(world, output, {
        years: 200,
        noOfStartFamilies: 4,
        noOfStartDwellings: 3
    })

    mapBuilder.buildFarmlands(world.map, 30)
    mapBuilder.buildLandMarks(world.map, 30)
    //const dwellings = getDwellingsFromMap(world.map)
    //world.families = familyBuilder.build({ dwellings, date: world.date })
    
    world.darkness = 10
    if (saveVisualization) { writeMap(world.map, world.id) }
    if (saveWorld) { save(world, { id: world.id, fileType: ENUM_FILE_TYPE.WORLD }) }
    return world
}

module.exports = {
    generateWorld
}