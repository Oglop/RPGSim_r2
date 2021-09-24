    const { WorldGenerationFailedError } = require('../exceptions')
const objects = require('../generic/objects')
const mapBuilder = require('../build/map')
const familyBuilder = require('../build/families')
const { copyObject, generateID } = require('../lib/utils')
const { getDwellingsFromMap } = require('../models/map')
        

const setWorldStartDate = (options) => {
    const date = copyObject(objects.date)
    date.year = 901
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
    while (atempts > 0) {
        try {
            world.map = mapBuilder.build( { size: 30 } )
            break
        } catch (e) {
            if (e instanceof WorldGenerationFailedError) {
                atempts--
                console.log(e.message)
            }
        }
    }
    
    const dwellings = getDwellingsFromMap(world.map)
    world.families = familyBuilder.build({ dwellings });
    

}

module.exports = {
    generateWorld
}