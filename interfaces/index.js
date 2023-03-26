const prompt = require('prompt')
const { 
    ENUM_COMMAND_PROMPTS
} = require('../generic/enums')

const { 
    mainPrompt,
    enterWorldId,
    numberOfAdventuringParties
} = require('./commands/simulationMain')

/**
 * 
 * @param {ENUM_COMMAND_PROMPTS} command 
 */
const commandPrompt = async command => {
    const options = []
    switch (command) {
        case ENUM_COMMAND_PROMPTS.SIMULATION_MAIN: options.push(...mainPrompt); break;
        case ENUM_COMMAND_PROMPTS.ENTER_WORLD_ID: options.push(...enterWorldId); break;
        case ENUM_COMMAND_PROMPTS.NO_OF_ADVENTURING_PARTIES: options.push(...numberOfAdventuringParties); break;
    }
    const query = await prompt.get(options)
    return query
}

/**
 * parse commands
 * @param {[]} argv 
 */
const parseArgv = argv => {
    const result = {
        skipCommandPropmt: false,
        useExistingWorld: false,
        tellFullStory: false,
        generateParties: false
    }

    argv.forEach(a => {
        console.log(a)
        switch (a.trim()) {
            case '-s': result.skipCommandPropmt = true; break;
            case '-u': result.useExistingWorld = true; break;
            case '-f': result.tellFullStory = true; break;
            case '-p': result.generateParties = true; break;
        }
    })
    return result
}




module.exports = {
    parseArgv,
    commandPrompt
}

