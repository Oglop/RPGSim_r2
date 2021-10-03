const { ENUM_EVENT_ITEM_STATUS } = require('../generic/enums')


/**
 * return true if event is active else false
 * @param {Object} event 
 * @param {Object} output 
 */
const resolveEvent = (event, output) => {
    if (event.active == false) { return false }
    let previousResult = ENUM_EVENT_ITEM_STATUS.UNRESOLVED
    for (let i = 0; i < event.items.length; i++) {
        if (i > 0 && 
            event.items[i].resolution == ENUM_EVENT_ITEM_STATUS.UNRESOLVED &&
            event.items[i - 1].resolution != ENUM_EVENT_ITEM_STATUS.UNRESOLVED) {  
                result = event.items[i - 1].resolution
        }  
        if (event.items[i].resolution == ENUM_EVENT_ITEM_STATUS.UNRESOLVED) {
            event.items[i].execute(previousResult)
            // todo proper output
            console.log(event.items[i].resolutionText)
            break;
        }
    }
    const active = event.items.find(e => e.resolution === ENUM_EVENT_ITEM_STATUS.UNRESOLVED)
    if (active) { return true }
    event.active = false
    return false
}

module.exports = {
    resolveEvent
}