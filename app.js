const consoleType = require('./output/console')
const htmlType = require('./output/html')
const { generateWorld } = require('./handlers/worldBuilder')

const main = (args) => {
    try {
        const output = (!args.outputType) ? consoleType : htmlType
        generateWorld(output)
        
    } catch (e) {
        console.log(e.message)
    }
}

main({});
