const consoleType = require('./output/console')
const htmlType = require('./output/html')
const { generateWorld } = require('./handlers/worldBuilder')
const { next } = require('./models/turn')

const main = (args) => {
    try {
        const output = (!args.outputType) ? consoleType : htmlType
        const world = generateWorld(output)

        for (let i=0;i<10;i++) {
            next(world)
        }
        
    } catch (e) {
        console.log(e.message)
    }
}

main({});
