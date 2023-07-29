const consoleType = require('./output/console')
const htmlType = require('./output/html')
const { migrate } = require('./persistance').infrastructure
const { generateWorld } = require('./handlers/worldBuildingHandler')
const { createParties } = require('./handlers/partyHandler')
const { next } = require('./models/turn')
const { Output } = require('./output/output')
const { tellWholeStory } = require('./handlers/storyHandler')

const { createProfile, createUniqueGodName } = require('./models/mythos')

const main = async (args) => {
    try {
        console.log('START')
        const useExistingWorld = (args.worldId) ? true : false
        let world = {}

        await migrate()
        const output = (!args.outputType) ? consoleType : htmlType
        Output.setPrinter(output)
        if (!useExistingWorld) {
            world = await generateWorld()
        }

        
        world.parties = await createParties( {date: world.date, map: world.map, dwellings: world.dwellings} )
        for (let i=0;i<160;i++) {
            await next(world, output)
        }
        await tellWholeStory()
        console.log('STOP')
    } catch (e) {
        console.log(JSON.stringify(e))
    }
}

main({});
