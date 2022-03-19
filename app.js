const consoleType = require('./output/console')
const htmlType = require('./output/html')
const { migrate } = require('./database').infrastructure
const { generateWorld } = require('./handlers/worldBuilder')
const { createParties } = require('./handlers/partyHandler')
const { next } = require('./models/turn')
const { Output } = require('./output/output')


const main = async (args) => {
    try {
        await migrate()
        const output = (!args.outputType) ? consoleType : htmlType
        Output.setPrinter(output)
        //Output.print('World is born')
        const world = await generateWorld()
        world.parties = createParties( {date: world.date, world} )
        for (let i=0;i<80;i++) {
            next(world, output)
        }
        
    } catch (e) {
        console.log(e.message)
    }
}

main({});

