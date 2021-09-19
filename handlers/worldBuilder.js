const objects = require('../generic/objects')
const mapBuilder = require('../build/map')
const familyBuilder = require('../build/families')
const { copyObject, generateID } = require('../lib/utils')
        
const generateWorld = (output) => {
    const world = copyObject(objects.world)
    world.id = generateID()
    world.name = 'Heria'
    world.map = mapBuilder.build( { size: 30 } )
    world.families = familyBuilder.build({});
    

}

module.exports = {
    generateWorld
}