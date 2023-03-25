const prompt = require('prompt')
const ENUM_COMMAND_PROMPTS = require('../generic/enums')

const { mainPrompt } = require('./commands/simulationMain')

/**
 * 
 * @param {ENUM_COMMAND_PROMPTS} command 
 */
const commandPrompt = async command => {
    const option = []
    switch (command) {
        case ENUM_COMMAND_PROMPTS.SIMULATION_MAIN: options.push(...mainPrompt)
    }
    const query = await prompt.get(option)
}

/**
 * parse commands
 * @param {[]} argv 
 */
const parseArgv = argv => {
    const result = {
        skipCommandPropmt: false,
        useExistingWorld: false,
        tellFullStory: false
    }

    argv.forEach(a => {
        console.log(a)
        switch (a.trim()) {
            case '-s': result.skipCommandPropmt = true; break;
            case '-u': result.useExistingWorld = true; break;
            case '-f': result.tellFullStory = true; break;
        }
    })
    return result
}




module.exports = {
    parseArgv,
    commandPrompt
}

