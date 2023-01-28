const { ENUM_RUMOR_TYPE } = require('../generic/enums')
const { getRandomNumberInRange, copyObject, generateID, point2d } = require('../lib/utils')
const objects = require('../generic/objects')
const { get } = require('../localization')
const { getAncientWord } = require('../lib/language')
const { getPersonName } = require('../generic/names')
const { mapSafeCoordinates } = require('./map')

const commitToRumor = (rumor, party) => {
    
}

const tellRumor = (rumor, teller) => {

}

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
        target.x = position.x + getRandomNumberInRange(0,10) - 5
        target.y = position.y + getRandomNumberInRange(0,10) - 5
        target = mapSafeCoordinates(target)
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


module.exports = {
    getRumorDescription, getRumorTarget, getRumorType, tellRumor, commitToRumor
}
