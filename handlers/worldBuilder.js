const objects = require('../generic/objects')
const mapBuilder = require('../build/map')
const houseBuilder = require('../build/houses')
const { copyObject, generateID } = require('../lib/utils')
        
const generateWorld = (output) => {
    const world = copyObject(objects.world)
    world.id = generateID()
    world.name = 'Heria'
    world.map = mapBuilder.build( { size: 30 } )
    world.families = houseBuilder.build({});
    

}

module.exports = {
    generateWorld
}