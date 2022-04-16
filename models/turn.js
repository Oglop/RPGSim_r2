const { addDay } = require('../lib/time')
//const {  } = require('../models/darkness')
const { progressAdventure } = require('../handlers/adventureHandler')
const { progressHistory } = require('../handlers/historyHandler')
const { insertStory } = require('../persistance').commands
const { executeCommands } = require('../persistance/commandQueue')
const { getStoryEntry } = require('../build/story')
const { printDate } = require('../lib/time')
const { ENUM_COMMANDS, ENUM_STORY_TYPE, ENUM_STORY_TAGS } = require('../generic/enums')

/**
 * Resolves one turn
 * 
 * @param {Object} world 
 */
const next = async (world, output) => {
    const commands = []
    const pastTime = addDay(world.date)

    if (pastTime === 'd' || pastTime === 'm' || pastTime === 'y') {
        // events for adventureres

        
        if (pastTime === 'm' || pastTime === 'y') {
            // events for families
            await progressHistory(world)
            // world events
            commands.push(
                {
                    command: ENUM_COMMANDS.INSERT_STORY,
                    data: getStoryEntry(`${printDate(world.date)}`, world.id, ENUM_STORY_TYPE.WORLD, { tag: ENUM_STORY_TAGS.HEADER_2 })
                }
            )

            if (pastTime === 'y') {
                // darkness

            }
        }
    }
    executeCommands(commands)
}


module.exports = {
    next
}