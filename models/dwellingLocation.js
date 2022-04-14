const { ENUM_DWELLING_LOCATION_TYPE, ENUM_DWELLING_LOCATION_STATUS } = require('../generic/enums')

const locationExists = (dwelling, type) => {
    if (dwelling.locations.find(l => l.type == type && 
        (l.status == ENUM_DWELLING_LOCATION_STATUS.ACTIVE || l.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION)) == undefined) {
            return false
    }
    return true
}

module.exports = {
    locationExists
}
