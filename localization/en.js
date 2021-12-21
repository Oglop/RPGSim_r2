/**
 * returns text from id
 * @param {string} id 
 * @param {array} args 
 */
module.exports.get = (id, args) => {
    switch (id) {
        case 'test1': return `hello ${args[0]}`
        case 'test2': return `one ${args[0]} ${args[1]}`
        case 'character-trait-abomination': return `During full moon nights ${args[0]} turn into an blood thirsty abomination.`
        case 'character-trait-dark-past': return `${args[0]} grew up in the slums working for the local gang.`
        case 'character-trait-escaped-slave': return `${args[0]} is a former slave and is on the run from the slavers guild.`
        case 'character-trait-traveler': return `${args[0]} traves the world, never stopping for long.`
        case 'character-trait-fisher': return `A child of the sea ${args[0]} grew up ner the coast i a small fishing village.`
        case 'character-trait-cursed': return `${args[0]} is cursed by the gods.`
        case 'character-trait-ex-noble': return `${args[0]} is of a noble house who lost all money and power.`
        case 'character-trait-adventurer': return `${args[0]} has an never ending thirst for treasure and danger.`
        case 'character-trait-veteran': return `A veteran ${args[0]} of numerous campaigns.`
        
        case 'dungeon-move': return `Proceeding further into the dungeon the ${args[0]} moves into a ${args[1]}.`
        case 'dungeon-type-corridor': return 'a corridor stretches further down.'
        case 'dungeon-type-cave-in': return 'this part of the cave has caved in.'
        case 'dungeon-type-chasm': return 'a deep chasm, looking down it seems bottomless.'
        case 'dungeon-type-cave-of-bones': return 'a cave full of bones.'
        case 'dungeon-type-flooded-cave': return 'a lake of cold dark water fills the cave.'
        case 'dungeon-type-gemstone-cave': return 'a cave filled with gem stone.'
        case 'dungeon-type-cave-hall': return 'a great stone hall.'
        case 'dungeon-flickeringlights-description': return 'Suddenly the torch starts flickering.'
        case 'dungeon-theme-cave': return 'cave'
        case 'dungeon-theme-ruins': return 'ruins'
        case 'dungeon-theme-undercity': return 'undercity'
        case 'dungeon-theme-stronghold': return 'stronghold'
        case 'familyTree-build-1': return `- Year of ${args[0]} -`
        case 'familyTree-peopleDie-1': return `${args[0]} of ${args[1]} dies from old age.`
        case 'familyTree-moves-1': return `${args[0]} founded the town of ${args[1]}.`
        case 'familyTree-removeDeadFamilies-1': return `The last of house ${args[0]} has died.`
        case 'familyTree-newFamily-1': return `The house of ${args[0]} enters the nobility of ${args[1]}.`
    }
    return ''
}