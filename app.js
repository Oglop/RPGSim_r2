const consoleType = require('./output/console')
const htmlType = require('./output/html')
const { migrate } = require('./database').infrastructure
const { generateWorld } = require('./handlers/worldBuildingHandler')
const { createParties } = require('./handlers/partyHandler')
const { next } = require('./models/turn')
const { Output } = require('./output/output')


const main = async (args) => {
    try {
        const useExistingWorld = (args.worldId) ? true : false
        let world = {}

        await migrate()
        const output = (!args.outputType) ? consoleType : htmlType
        Output.setPrinter(output)
        //Output.print('World is born')
        if (!useExistingWorld) {
            world = await generateWorld()
        }
        world.parties = createParties( {date: world.date, map: world.map} )
        for (let i=0;i<80;i++) {
            await next(world, output)
        }
        
    } catch (e) {
        console.log(JSON.stringify(e))
    }
}

main({});
