const { ENUM_RUMOR_TYPE } = require('../generic/enums')
const { copyObject, generateID } = require('../lib/utils')
const objects = require('../generic/objects')

const { getRumorDescription, getRumorTarget, getRumorType } = require('../models/rumor')

/**
 * builds a new rumor on position
 * @param {{position: { x:number, y:number }, type: ENUM_RUMOR_TYPE}} options 
 */
module.exports.build = options => {
    const rumor = copyObject(objects.rumor)
    rumor.id = generateID()
    rumor.type = (options.type != undefined) ? options.type : getRumorType()
    rumor.position.x = options.position.x
    rumor.position.y = options.position.y
    rumor.target = getRumorTarget(rumor.position)
    rumor.description = getRumorDescription(rumor.type)
    return rumor
}   
