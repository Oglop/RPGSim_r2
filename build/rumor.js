const { ENUM_RUMOR_TYPE } = require('../generic/enums')
const { getRandomNumberInRange, copyObject, generateID, point2d } = require('../lib/utils')
const objects = require('../generic/objects')
const { worldSize } = require('../config')
const { get } = require('../localization')
const { getAncientWord } = require('../lib/language')
const { getPersonName } = require('../generic/names')
/**
 * returns random type of rumor
 * @returns { ENUM_RUMOR_TYPE } type
 */
const getRumorType = () => {
    const i = getRandomNumberInRange(0,3)
    switch(i) {
        case 0: return ENUM_RUMOR_TYPE.ARTIFACT
        case 1: return ENUM_RUMOR_TYPE.BOUNTY
        case 2: return ENUM_RUMOR_TYPE.RUIN
        case 3: return ENUM_RUMOR_TYPE.TREASURE
        case 4: return ENUM_RUMOR_TYPE.DOOM
    }
}

/**
 * returns a postion in world where rumor is said take place
 * @param {{ x:number, y:number}} position 
 * @returns { { x:number, y:number} } target
 */
const getRumorTarget = (position) => {
    let target = point2d(position.x,position.y)
    while (target.x === position.x && target.y === position.y) {
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
 * returns a description of the rumor
 * @param {ENUM_RUMOR_TYPE} type 
 * @return {string} description
 */
const getRumorDescription = (type) => {
    switch (type) {
        case ENUM_RUMOR_TYPE.ARTIFACT: return get('rumor-of-artifact', [  getAncientWord() ]);
        case ENUM_RUMOR_TYPE.TREASURE: return get('rumor-of-treasure');
        case ENUM_RUMOR_TYPE.RUIN: return get('rumor-of-ruin', [  getAncientWord() ]);
        case ENUM_RUMOR_TYPE.DOOM: return get('rumor-of-doom');
        case ENUM_RUMOR_TYPE.BOUNTY: return get('rumor-of-bounty', [  getAncientWord() ]);
        case ENUM_RUMOR_TYPE.LOST_NOBLE: return get('rumor-of-lost-noble', [ getPersonName() ])
    }
}

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
