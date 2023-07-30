const { ENUM_GODS } = require('../generic/enums')
const { getRandomElementFromArray } = require('../lib/utils')
const { listGods } = require('../persistance').queries

const getRandomReligion = async (gods = []) => {
    const religions = (gods.length > 0) ? gods : await listGods()
    return getRandomElementFromArray(religions)
}

module.exports = {
    getRandomReligion
}