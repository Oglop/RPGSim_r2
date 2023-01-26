const { ENUM_RUMOR_TYPE } = require('../generic/enums')
const { getRandomNumberInRange, copyObject, generateID, point2d } = require('../lib/utils')
const objects = require('../generic/objects')
const { worldSize } = require('../config')
/**
 * returns
 */
const getRumorType = () => {
    const i = getRandomNumberInRange(0,3)
    switch(i) {
        case 0: return ENUM_RUMOR_TYPE.ARTIFACT
        case 1: return ENUM_RUMOR_TYPE.ENEMY
        case 2: return ENUM_RUMOR_TYPE.RUIN
        case 3: return ENUM_RUMOR_TYPE.TREASURE
    }
}

/**
 * returns a postion in world
 * @param {{ x:number, y:number}} position 
 * @returns { { x:number, y:number} } target
 */
const getRumorTarget = (position) => {
    const target = point2d(0,0)
    while (target.x != position.x && target.y != position.y) {
        target.x = getRandomNumberInRange(0,10) - 5
        target.y = getRandomNumberInRange(0,10) - 5
        if (target.x > worldSize) { target.x = worldSize }
        if (target.y > worldSize) { target.y = worldSize }
        if (target.x < 0) { target.x = 0 }
        if (target.y < 0) { target.y = 0 }
    }
    return target
}

/**
 * 
 * @param {*} type 
 * @return {}
 */
const getRumorDescription = type => {
    // TODO
    return ''
}


/**
 * builds a new rumor on position
 * @param {{position: { x:number, y:number }, type: ENUM_RUMOR_TYPE}} options 
 */
module.exports.build = options => {
    const rumor = copyObject(objects.rumor)
    rumor.id = generateID
    rumor.type = (options.type != undefined) ? options.type : getRumorType()
    rumor.position.x = options.position.x
    rumor.position.y = options.position.y
    rumor.target = getRumorTarget(rumor.position)
    rumor.description = getRumorDescription(rumor.type)
    return rumor
}   
