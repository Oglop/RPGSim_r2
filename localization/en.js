/**
 * returns text from id
 * @param {string} id 
 * @param {array} args 
 */
module.exports.get = (id, args) => {
    switch (id) {
        case 'test1': return `hello ${args[0]}`
        case 'test2': return `one ${args[0]} ${args[1]}`
        case 'dungeon-move': return `Proceeding further into the dungeon the ${args[0]} moves into a ${args[1]}.`
        case 'dungeon-type-corridor': return 'corridor'
        case 'familyTree-build-1': return `- Year of ${args[0]} -`
        case 'familyTree-peopleDie-1': return `${args[0]} of ${args[1]} dies from old age.`
        case 'familyTree-moves-1': return `${args[0]} founded the town of ${args[1]}.`
        case 'familyTree-removeDeadFamilies-1': return `The last of house ${args[0]} has died.`
        case 'familyTree-newFamily-1': return `The house of ${args[0]} enters the nobility of ${args[1]}.`
        
    }
    return ''
}