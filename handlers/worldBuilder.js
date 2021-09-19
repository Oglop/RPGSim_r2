const objects = require('../generic/objects')
const mapBuilder = require('../build/map')
const familyBuilder = require('../build/families')
const { copyObject, generateID } = require('../lib/utils')
const { getDwellingsFromMap } = require('../models/map')
        
const generateWorld = (output) => {
    const world = copyObject(objects.world)
    world.id = generateID()
    world.name = 'Heria'
    world.map = mapBuilder.build( { size: 30 } )
    const dwellings = getDwellingsFromMap(world.map)
    world.families = familyBuilder.build({ dwellings });
    

}

module.exports = {
    generateWorld
}