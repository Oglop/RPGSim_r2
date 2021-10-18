const { getSeason } = require('../lib/time')
const partyBuilder = require('../build/party')


/**
 * 
 * @param {Object} party 
 * @param {Object} world 
 */
const progressAdventure = (party, world) => {
    const season = getSeason(world.date)
}



module.exports = {
    progressAdventure
}