/**
 * returns text from id
 * @param {string} id 
 * @param {array} args 
 */
module.exports.get = (id, args) => {
    switch (id) {
        case 'test1': return `hello ${args[0]}`
        case 'test2': return `one ${args[0]} ${args[1]}`
        case 'adventure-travel-failed': return `${args[0]} searches for a path forward but are lost.`
        case 'adventure-travel-east': return `${args[0]} travels east.`
        case 'adventure-travel-north': return `${args[0]} travels north.`
        case 'adventure-travel-west': return `${args[0]} travels west.`
        case 'adventure-travel-south': return `${args[0]} travels south.`
        case 'combat-fight-turn': return `${args[0]} ${args[1]} ${args[2]} for ${args[3]} damage.`
        case 'combat-defeated': return `${args[0]} fell to the ground.`
        case 'character-died-from-age': return 'age'
        case 'character-trait-abomination': return `During full moon nights ${args[0]} turn into an blood thirsty abomination.`
        case 'character-trait-dark-past': return `${args[0]} grew up in the slums working for the local gang.`
        case 'character-trait-escaped-slave': return `${args[0]} is a former slave and is on the run from the slavers guild.`
        case 'character-trait-traveler': return `${args[0]} traves the world, never stopping for long.`
        case 'character-trait-fisher': return `A child of the sea ${args[0]} grew up ner the coast i a small fishing village.`
        case 'character-trait-cursed': return `${args[0]} is cursed by the gods.`
        case 'character-trait-ex-noble': return `${args[0]} is of a noble house who lost all money and power.`
        case 'character-trait-adventurer': return `${args[0]} has an never ending thirst for treasure and danger.`
        case 'character-trait-veteran': return `A veteran ${args[0]} of numerous campaigns.`
        case 'character-trait-spirit-talker': return `Since a young age ${args[0]} has been able to communicate with spirits.`
        case 'character-trait-sticky-fingers': return `Things always seem to end up in ${args[0]} pockets.`
        case 'character-trait-alcoholic': return `${args[0]} can never resist the bottle.`
        case 'character-trait-shielded': return `${args[0]} grew up in innocense, shielded from any harshness of the world.`
        case 'character-trait-gambler': return `${args[0]} is a gambler.`
        case 'character-trait-rider': return `${args[0]} grew up among the nomads on the plains and is an excellent rider.`
        case 'character-trait-occultist': return `${args[0]} is obsessed with the occult.`
        case 'character-trait-cool-header': return `${args[0]} remains calm during any situation.`
        case 'character-trait-sceptic': return `${args[0]} is never fooled.`
        case 'character-trait-bard': return `${args[0]} is a skilled bard always looking to entertain.`
        case 'dir-east': return 'east'
        case 'dir-north': return 'north'
        case 'dir-west': return 'west'
        case 'dir-south': return 'south'
        case 'dungeon-by-elfs': return `elves known for their ${args[0]}`
        case 'dungeon-by-dwarves': return `dwarves known for their ${args[0]}`
        case 'dungeon-by-wizard': return `wizard known for his ${args[0]}`
        case 'dungeon-by-warlord': return `warlord known for his ${args[0]}`
        case 'dungeon-by-treasurehunters': return `treasure hunters known for their ${args[0]}`
        case 'dungeon-by-monks': return `monks ${args[0]}`
        case 'dungeon-by-warrior': return `warriors of ${args[0]}`
        case 'dungeon-by-darkelves': return `dark elves known for their ${args[0]}`
        case 'dungeon-by-orcs': return `orcs known for their ${args[0]}`
        case 'dungeon-by-demons': return `demon of ${args[0]}`
        case 'dungeon-known-for-bloodthirst': return `blood thirst`
        case 'dungeon-known-for-vengence': return `vengence`
        case 'dungeon-known-for-greed': return `greed`
        case 'dungeon-known-for-vain': return `vain`
        case 'dungeon-known-for-wisdom': return `wisdom`
        case 'dungeon-known-for-beuty': return `beuty`
        case 'dungeon-known-for-cruelty': return `cruelty`
        case 'dungeon-known-for-cunning': return `cunning`
        case 'dungeon-known-for-evil': return `evil`
        case 'dungeon-known-for-kindness': return `kindness`
        case 'dungeon-move': return `Proceeding further into the dungeon the ${args[0]} moves into a ${args[1]}.`
        case 'dungeon-type-corridor': return 'a corridor stretches further down.'
        case 'dungeon-type-cave-in': return 'this part of the cave has caved in.'
        case 'dungeon-type-chasm': return 'a deep chasm, looking down it seems bottomless.'
        case 'dungeon-type-cave-of-bones': return 'a cave full of bones.'
        case 'dungeon-type-flooded-cave': return 'a lake of cold dark water fills the cave.'
        case 'dungeon-type-gemstone-cave': return 'a cave filled with gem stones.'
        case 'dungeon-type-cave-hall': return 'a great stone hall.'
        case 'dungeon-type-cave-catacombs': return 'catacombs'
        case 'dungeon-room-description': return `A ${args[0]} ${args[1]}`
        case 'dungeon-room-type-corridor': return 'corridor'
        case 'dungeon-room-type-hall': return 'hall'
        case 'dungeon-room-type-room': return 'room'
        case 'dungeon-room-type-stairs': return 'stairs'
        case 'dungeon-room-size-small': return 'small'
        case 'dungeon-room-size-tall': return 'tall'
        case 'dungeon-room-size-large': return 'large'
        case 'dungeon-room-size-narrow': return 'narrow'
        case 'dungeon-room-size-big': return 'big'
        case 'dungeon-door-state-open': return 'The door forward is open.'
        case 'dungeon-door-state-closed-unlocked': return 'The door forward is closed.'
        case 'dungeon-door-state-closed-locked': return 'The door forward is locked.'
        case 'dungeon-door-state-secret': return 'It seems the room is a dead end.'
        case 'dungeon-door-state-sealed': return 'A magic seal holds the door forward.'
        case 'dungeon-door-action-opens': return `${args[0]} opens the door.`
        case 'dungeon-door-action-unlocks': return `${args[0]} succeeds in picking the lock.`
        case 'dungeon-door-action-fail': return `${args[0]} atempts to open the door but fails.`
        case 'dungeon-door-action-seal-open': return `${args[0]} speak in ancient and the seal is broken.`
        case 'dungeon-event-flickeringlights-description': return 'Suddenly the torch starts flickering.'
        case 'dungeon-theme-cave': return 'cave'
        case 'dungeon-theme-ruins': return 'ruins'
        case 'dungeon-theme-undercity': return 'undercity'
        case 'dungeon-theme-stronghold': return 'stronghold'

        
        case 'event-date-bloodmoon-description': return 'Tonight is the night of the blood moon.'
        case 'event-date-bloodmoon-resolution': return 'As the red moon fills the black sky all the creatures of the night can be heard howling in the distance.'
        case 'event-rest-story-description': return `At camp ${args[0]} begins telling a story.`
        case 'event-rest-story-success': return `${args[0]} tells a captivating story, everyone feels a little closer to eachother.`
        case 'event-rest-story-fail': return `${args[0]}´s story drags on and no one is listening. Soon everyone is falling asleep.`
        case 'event-rest-hunt-success': return `${args[0]} returns after a successful hunt.`
        case 'event-rest-fishing-success': return `${args[0]} returns after successfully fishing in a nearby lake.`
        case 'event-rest-town-resting': return `${args[0]} spends the night resting at the town in.`
        case 'event-rest-darkNight-description': return `${args[0]} wakes up in the middle of the night.`
        case 'event-rest-season-description': return `${args[0]} sets camp for the night.`
        case 'event-rest-season-fall': return `It´s a grey fall night, a cold wind is blowing from the ${args[0]} .`
        case 'event-rest-season-winter': return `A clear winter night. In the ${args[0]} some wolfes can be heard howling.`
        case 'event-rest-season-summer': return `A warm summer night. A warm breeze is blowing from the ${args[0]}`
        case 'event-rest-season-spring': return `A cold spring night. A cold wind is blowing from the ${args[0]}.`
        case 'event-rest-deepsleep-description': return `Is a beutiful ${args[0]} night.`
        case 'event-rest-deepsleep-resolve': return `${args[0]} wakes up feeling refreshed.`
        
        
        case 'event-rest-argument-description': return `At camp an argument breaks out between the members of ${args[0]}.`
        case 'event-rest-argument-success': return `${args[0]} stops the argument in time, everyone goes to sleep.`
        case 'event-rest-argument-resolved': return `A fight breaks out and ${args[0]} starts to misstrust the rest of the party.`
        //case 'event-rest--': return `${args[0]} .`



        case 'familyTree-build-1': return `- Year of ${args[0]} -`
        case 'familyTree-peopleDie-1': return `${args[0]} of ${args[1]} dies from old age.`
        case 'familyTree-moves-1': return `${args[0]} founded the town of ${args[1]}.`
        case 'familyTree-removeDeadFamilies-1': return `The last of house ${args[0]} has died.`
        case 'familyTree-newFamily-1': return `The house of ${args[0]} enters the nobility of ${args[1]}.`
        case 'party-name-template': return `${args[0]} and party.`
        case 'party-is-in-dwelling': return `${args[0]} is in ${args[1]}.`
    }
    return ''
}