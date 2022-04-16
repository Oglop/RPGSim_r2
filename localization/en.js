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

        case 'dwelling-location-name-library': return `${args[0]} library`
        case 'dwelling-location-name-tournament-field': return `Tournament field`
        case 'dwelling-location-name-arena': return `Arena`
        case 'dwelling-location-name-park': return `park`
        case 'dwelling-location-name-shrine': return `Shrine of ${args[0]}`
        case 'dwelling-location-name-catacombs': return `${args[0]} catacombs`
        case 'dwelling-location-name-cemetary': return `${args[0]} cemetary`
        case 'dwelling-location-name-sewers': return `${args[0]} sewers`
        case 'dwelling-location-name-university': return `${args[0]} university`
        case 'dwelling-location-name-baths': return `${args[0]} baths`
        case 'dwelling-location-name-court': return `${args[0]} court`
        case 'dwelling-location-name-wizards-tower': return `${args[0]}´s tower`
        case 'dwelling-location-name-jail': return `${args[0]} jail`
        case 'dwelling-location-name-treasury': return `${args[0]} treasury`
        case 'dwelling-location-name-bank': return `${args[0]} bank`
        case 'dwelling-location-name-town-hall': return `${args[0]} town hall`
        case 'dwelling-location-name-carpenter': return `${args[0]}´s carpentry`
        case 'dwelling-location-name-baker': return `${args[0]}´s bakery`
        case 'dwelling-location-name-palace': return `${args[0]} palace`
        case 'dwelling-location-name-palace': return `${args[0]} stables`
        case 'dwelling-location-name-square': return `${args[0]} square`
        case 'dwelling-location-name-guild': return `Guild of ${args[0]}`
        case 'dwelling-location-name-court': return `${args[0]} court house`
        case 'dwelling-location-name-magic-academy': return `${args[0]}´s acaddemy`
        case 'dwelling-location-name-harbour': return `harbour`
        case 'dwelling-location-name-market': return `market`
        case 'dwelling-location-name-street': return `${args[0]} street`
        case 'dwelling-location-name-guardhouse': return `${args[0]} guard house`
        case 'dwelling-location-name-traininggrounds': return `${args[0]} training grounds`
        case 'dwelling-location-name-smith': return `${args[0]}´s black smith`
        case 'dwelling-location-name-inn-tavern': return `The ${args[0]} ${args[1]}`
        case 'dwelling-location-name-first-running': return `running`
        case 'dwelling-location-name-first-green': return `green`
        case 'dwelling-location-name-first-iron': return `iron`
        case 'dwelling-location-name-first-standing': return `standing`
        case 'dwelling-location-name-first-crimson': return `crimson`
        case 'dwelling-location-name-first-polite': return `polite`
        case 'dwelling-location-name-first-lucky': return `lucky`
        case 'dwelling-location-name-first-secret': return `secret`
        case 'dwelling-location-name-first-olde': return `olde`
        case 'dwelling-location-name-first-poor': return `poor`
        case 'dwelling-location-name-first-queen´s': return `queens`
        case 'dwelling-location-name-first-shattered': return `shattered`
        case 'dwelling-location-name-first-wandering': return `wandering`
        case 'dwelling-location-name-first-red': return `red`
        case 'dwelling-location-name-first-bard´s': return `bards`
        case 'dwelling-location-name-first-dancing': return `dancing`
        case 'dwelling-location-name-first-drunken': return `drunken`
        case 'dwelling-location-name-first-barking': return `barking`
        case 'dwelling-location-name-first-golden': return `golden`

        case 'dwelling-location-name-second-hamster': return `hamster`
        case 'dwelling-location-name-second-hound': return `hound`
        case 'dwelling-location-name-second-arms': return `arms`
        case 'dwelling-location-name-second-axe': return `axe`
        case 'dwelling-location-name-second-fox': return `fox`
        case 'dwelling-location-name-second-pony': return `pony`
        case 'dwelling-location-name-second-hen': return `hen`
        case 'dwelling-location-name-second-dragon': return `dragon`
        case 'dwelling-location-name-second-goblin': return `goblin`
        case 'dwelling-location-name-second-miner': return `miner`
        case 'dwelling-location-name-second-grotto': return `grotto`
        case 'dwelling-location-name-second-glory': return `glory`
        case 'dwelling-location-name-second-anvil': return `anvil`
        case 'dwelling-location-name-second-barrel': return `barrel`
        case 'dwelling-location-name-second-flagon': return `flagon`
        case 'dwelling-location-name-second-ogre': return `ogre`
        case 'dwelling-location-name-second-haven': return `haven`
        case 'dwelling-location-name-second-house': return `house`
        case 'dwelling-location-name-second-gate': return `gate`
        case 'dwelling-location-name-second-rest': return `rest`
        case 'dwelling-location-name-second-lantern': return `lantern`
        case 'dwelling-location-name-second-cup': return `cup`
        case 'dwelling-location-name-second-horn': return `horn`
        case 'dwelling-location-name-second-crow': return `crow`
        case 'dwelling-location-name-second-sleep': return `sleep`
        case 'dwelling-location-name': return `The ${args[0]} ${args[1]}`

        case 'dwelling-location-temple': return 'temple'
        case 'dwelling-location-church': return 'church'
        case 'dwelling-location-cathedral': return 'cathedral'
        case 'dwelling-location-chapel': return 'chapel'
        case 'dwelling-location-temple-description-high': return 'high'
        case 'dwelling-location-temple-description-grand': return 'grand'
        case 'dwelling-location-temple-description-secret': return 'secret'
        case 'dwelling-location-temple-description-first': return 'first'
        case 'dwelling-location-temple-description-great': return 'great'
        case 'dwelling-location-temple-description-elated': return 'elated'
        case 'dwelling-location-temple-description-exalted': return 'exalted'
        case 'dwelling-location-temple-name': return `The ${args[0]} ${args[1]} of ${args[2]}`

        case 'combat-fight-turn': return `${args[0]} ${args[1]} ${args[2]} for ${args[3]} damage.`
        case 'combat-defeated': return `${args[0]} fell to the ground.`
        case 'character-died-from-age': return 'age'
        case 'coat-of-arms-description': return `${args[0]} ${args[1]}. A ${args[2]} ${args[3]} over a ${args[4]} ${args[5]}`
        case 'coat-of-arms-field-color-or': return 'or'
        case 'coat-of-arms-field-color-argent': return 'argent'
        case 'coat-of-arms-field-color-gules': return 'gules'
        case 'coat-of-arms-field-color-azure': return 'azure'
        case 'coat-of-arms-field-color-vert': return 'vert'
        case 'coat-of-arms-field-color-sable': return 'sable'
        case 'coat-of-arms-field-color-purpure': return 'purpure'
        case 'coat-of-arms-field-color-tenne': return 'tenne'
        case 'coat-of-arms-field-color-sanguine': return 'sanguine'
        case 'coat-of-arms-field-shape-shield': return 'shield'
        case 'coat-of-arms-field-shape-flag': return 'flag'
        case 'coat-of-arms-field-shape-oval': return 'oval'
        case 'coat-of-arms-field-shape-lozenge': return 'lozenge'
        case 'coat-of-arms-field-shape-hex': return 'hex'
        case 'coat-of-arms-field-shape-heather': return 'heather'
        case 'coat-of-arms-field-shape-crescent': return 'crescent'
        case 'coat-of-arms-division-fess': return 'fess'
        case 'coat-of-arms-division-pale': return 'pale'
        case 'coat-of-arms-division-bend': return 'bend'
        case 'coat-of-arms-division-chevron': return 'chevron'
        case 'coat-of-arms-division-cross': return 'cross'
        case 'coat-of-arms-division-saltire': return 'saltire'
        case 'coat-of-arms-division-chief': return 'chief'
        case 'coat-of-arms-division-bordure': return 'bordure'
        case 'coat-of-arms-division-pile': return 'pile'
        case 'coat-of-arms-figure-fish': return 'fish'
        case 'coat-of-arms-figure-hawk': return 'hawk'
        case 'coat-of-arms-figure-griffin': return 'griffin'
        case 'coat-of-arms-figure-sword': return 'sword'
        case 'coat-of-arms-figure-axe': return 'axe'
        case 'coat-of-arms-figure-crown': return 'crown'
        case 'coat-of-arms-figure-lance': return 'lance'
        case 'coat-of-arms-figure-hound': return 'hound'
        case 'coat-of-arms-figure-boar': return 'boar'
        case 'coat-of-arms-figure-lion': return 'lion'
        case 'coat-of-arms-figure-passant': return 'passant'
        case 'coat-of-arms-figure-wolf': return 'wolf'
        case 'coat-of-arms-figure-dragon': return 'dragon'
        case 'coat-of-arms-figure-cup': return 'cup'
        case 'coat-of-arms-figure-star': return 'star'
        case 'coat-of-arms-figure-crow': return 'crow'
        case 'coat-of-arms-figure-unicorn': return 'unicorn'
        case 'coat-of-arms-figure-scepter': return 'scepter'
        case 'coat-of-arms-figure-horse': return 'horse'
        case 'coat-of-arms-figure-hart': return 'hart'
        case 'coat-of-arms-figure-key': return 'key'
        case 'coat-of-arms-figure-rose': return 'rose'
        case 'coat-of-arms-figure-tower': return 'tower'
        case 'coat-of-arms-figure-bolt': return 'bolt'
        case 'coat-of-arms-figure-bridge': return 'bridge'
        case 'coat-of-arms-figure-feather': return 'feather'
        case 'coat-of-arms-figure-skull': return 'skull'
        case 'character-expression-smirks': return `${args[0]} smirks.`
        case 'character-expression-angry': return `${args[0]} is looking angry.`
        case 'character-expression-smiles': return `${args[0]} smiles.`
        case 'character-expression-frowns': return `${args[0]} frowns.`
        case 'character-expression-worried': return `${args[0]} is looking worried.`
        case 'character-expression-thankful': return `${args[0]} is thankful.`

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
        case 'character-haircolor-auburn': return 'auburn'
        case 'character-haircolor-brunette': return 'brunette'
        case 'character-haircolor-light-brown': return 'light brown'
        case 'character-haircolor-dark': return 'dark'
        case 'character-haircolor-blonde': return 'blonde'
        case 'character-haircolor-gray': return 'gray'
        case 'character-haircolor-black': return 'black'
        case 'character-haircolor-white': return 'white'
        case 'character-haircolor-red': return 'red'
        case 'character-eyes-blue': return 'blue'
        case 'character-eyes-green': return 'green'
        case 'character-eyes-dark-brown': return 'dark brown'
        case 'character-eyes-brown': return 'brown'
        case 'character-eyes-gray': return 'gray'
        case 'character-body-tall': return 'tall'
        case 'character-body-slender': return 'slender'
        case 'character-body-tenuous': return 'tenuous'
        case 'character-body-feeble': return 'feeble'
        case 'character-body-potent': return 'potent'
        case 'character-body-sinewy': return 'sinewy'
        case 'character-body-potent': return 'potent'
        case 'character-body-vivid': return 'vivid'
        case 'character-body-short': return 'short'
        case 'character-body-stocky': return 'stocky'
        case 'character-body-round': return 'round'
        case 'character-body-slim': return 'slim'
        case 'character-body-muscular': return 'muscular'
        case 'character-description-religion': return `${args[0]} worships ${args[1]}.`
        case 'character-description-personality': return `${args[0]} often appears ${args[1]}.`
        case 'character-job-pesant-pessant': return 'pessant'
        case 'character-job-pesant-farmer': return 'farmer'
        case 'character-birthDate': return `${args[0]} was born in the ${args[1]}.`
        case 'character-job-warrior-barbarian': return 'barbarian'
        case 'character-job-warrior-gladiator': return 'gladiator'
        case 'character-ruler-title-lord': return 'Lord'
        case 'character-ruler-title-village': return 'Mayor'
        case 'character-ruler-title-town': return 'Earl'
        case 'character-ruler-title-city': return 'Baron'
        case 'character-ruler-title-capital': return 'King'

        case 'character-status-bad-hearing': return 'bad hearing'
        case 'character-status-bad-eyesight': return 'bad-eyesight'
        case 'character-status-back-pain': return 'back-pain'
        case 'character-status-neck-pain': return 'neck-pain'
        case 'character-status-diabetes': return 'diabetes'
        case 'character-status-dementia': return 'dementia'
        case 'character-status-osteoarthistis': return 'osteoarthistis'
        case 'character-status-depression': return 'depression'

        case 'dir-east': return 'east'
        case 'dir-north': return 'north'
        case 'dir-west': return 'west'
        case 'dir-south': return 'south'

        case 'dwelling-location-name-tavern-base': return `The ${args[0]} ${args[1]}.`
        

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

        case 'npc-description-administrator': return `administrator ${args[0]}`
        case 'npc-description-inn-keeper': return `${args[0]} the inn keeper`
        case 'npc-description-bar-keeper': return `${args[0]} the bar keeper`
        case 'npc-description-noble': return `the noble ${args[0]} `
        case 'npc-description-master': return `master ${args[0]} `
        case 'npc-description-dwarf': return `${args[0]} the dwarf`
        case 'npc-description-elf': return `${args[0]} the elf`
        case 'npc-description-halfling': return `${args[0]} the halfling`
        case 'npc-description-wizard': return `${args[0]} the wizaard`
        case 'npc-description-bouncer': return `${args[0]} the bouncer`
        case 'npc-description-adventurer': return `${args[0]} the adventurer`
        case 'npc-description-boy': return `the young boy ${args[0]}`
        case 'npc-description-teen': return `the teen ${args[0]}`
        case 'npc-description-smith': return `the young girl ${args[0]}`
        case 'npc-description-girl': return `the young girl ${args[0]}`
        case 'npc-description-guard': return `${args[0]} the guard`
        case 'npc-description-knight': return `${args[0]} the knight`
        case 'npc-description-fighter': return `${args[0]} the fighter`
        case 'npc-description-priest': return `${args[0]} the priest`
        case 'npc-description-aprentice': return `the aprentice ${args[0]}`
        case 'npc-description-librarian': return `Librarian ${args[0]}`
        case 'npc-description-old-man': return `Old man ${args[0]}`
        case 'npc-description-sailor': return `Sailor ${args[0]}`
        case 'npc-description-merchant': return `Merchant ${args[0]}`
        case 'npc-description-grave-keeper': return `Grave keeper ${args[0]}`
        case 'npc-description-carpenter': return `${args[0]} the carpenter`
        case 'npc-description-baker': return `${args[0]} the baker`
        // case 'npc-description-': return `${args[0]} `

        case 'npc-approaches-party': return `${args[0]} is approaching ${args[1]}.`
        case 'npc-greets-party': return `${args[0]} greets ${args[1]}.`

        case 'party-name-template': return `${args[0]} and party`
        case 'party-is-in-dwelling': return `${args[0]} is in ${args[1]}.`
        case 'personality-description-ambitious' : return `to be working hard`
        case 'personality-description-cruel' : return `cold and calculating`
        case 'personality-description-gifted' : return `to be one step ahead`
        case 'personality-description-greedy' : return `wanting more`
        case 'personality-description-intelligent' : return `to be in deep thoughts`
        case 'personality-description-kind' : return `to be smiling`
        case 'personality-description-lazy' : return `to be uninsterested`
        case 'personality-description-naive' : return `take others at their word`
        case 'personality-description-paranoid' : return `nervous`
        case 'personality-description-religious' : return `to be praying`
        case 'troop-archers': return 'archers'
        case 'troop-men-at-arms': return 'men-at-arms'
        case 'troop-knights': return 'knights'
        case 'troop-infantry': return 'infantry'
        case 'troop-mercenaries': return 'mercenaries'
        case 'troop-catapults': return 'catapults'

        case 'story-adventure-party-formed': return `${args[0]} was formed.`
        case 'story-adventure-part-member': return `${args[0]} the ${args[1]} ${args[2]}. ${args[3]}`
        case 'story-history-dwelling-construction-finished': return `In ${args[0]}, construction of ${args[1]} was finished.`
        case 'story-history-dwelling-construction-begin': return `In ${args[0]}, ${args[1]} ${args[2]} ordered the construction of ${args[3]}.`
        case 'story-history-dwelling-construction-repair': return `By the command of ${args[0]}, repair has begun on ${args[1]} in ${args[2]}.`
        case 'story-history-dwelling-construction-abandoned': return `In ${args[0]}, construction of ${args[1]} was abandoned.`
        case 'story-history-dwelling-decrease-defences': return `The defences of ${args[0]} is degenerating.`
        case 'story-history-dwelling-increase-defences': return `${args[0]} ${args[1]} has strengthend the defences of ${args[2]}.`
        case 'story-history-dwelling-increase-treasury': return `${args[0]} ${args[1]} is keeping this months gold.`
        case 'story-history-dwelling-loan-religion': return `${args[0]} ${args[1]} seeks financial help from the church in ${args[2]}.`
        case 'story-history-dwelling-loan-merchants': return `${args[0]} ${args[1]} seeks financial help from the merchants guild of ${args[2]}.`
        case 'story-history-dwelling-trade-partnership-formed': return `${args[0]} and ${args[1]} has agreed upon a trade partnership between ${args[2]} and ${args[3]}.`
        case 'story-history-progress-month': return `- ${args[0]}.`



        case 'system-word-a': return 'a'
        case 'system-word-an': return 'an'
        case 'system-word-he': return 'he'
        case 'system-word-she': return 'she'
        case 'system-word-one': return 'one'
        case 'system-word-two': return 'two'
        case 'system-word-three': return 'three'
        case 'system-word-four': return 'four'
        case 'system-word-five': return 'five'
        case 'system-word-six': return 'six'
        case 'time-birthDate': return `month of ${args[0]} in the year ${args[1]}`
    }
    return ''
}