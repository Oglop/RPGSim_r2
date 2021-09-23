const { WorldGenerationFailedError } = require('../exceptions')
const objects = require('../generic/objects')
const mapBuilder = require('../build/map')
const familyBuilder = require('../build/families')
const { copyObject, generateID } = require('../lib/utils')
const { getDwellingsFromMap } = require('../models/map')
        
const generateWorld = (output) => {
    let atempts = 3
    const world = copyObject(objects.world)
    world.id = generateID()
    world.name = 'Heria'
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