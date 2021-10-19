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

/**
 * 
 * 
 * @param {object} world 
 * @param {object} options 
 */
const createParty = (world, options) => {
    const party = partyBuilder.build({
        partySize: 6
    })
    world.parties.push(party)



}



module.exports = {
    progressAdventure,
    createParty
}