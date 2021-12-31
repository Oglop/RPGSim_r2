const consoleType = require('./output/console')
const htmlType = require('./output/html')
const { generateWorld } = require('./handlers/worldBuilder')
const { createParties } = require('./handlers/partyHandler')
const { next } = require('./models/turn')

const main = (args) => {
    try {
        const output = (!args.outputType) ? consoleType : htmlType
        const world = generateWorld(output)
        world.parties = createParties( {date: world.date} )
        for (let i=0;i<80;i++) {
            next(world, output)
        }
        
    } catch (e) {
        console.log(e.message)
    }
}

main({});
