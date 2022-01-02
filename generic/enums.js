module.exports = {
    ENUM_SKILL_NAMES: {
        lockPicking: 'Lock picking',
        steal: 'Steal',
        dagger: 'Dagger',
        oneHandSword: '1H Sword',
        twoHandSword: '2H Sword',
        bow: 'Bow',
        staff: 'Staff',
        shield: 'Shield',
        helmet: 'Helmet',
        axe: 'Axe',
        mace: 'Mace',
        spear: 'Spear',
        fishing: 'Fishing',
        cooking: 'Cooking',
        tracking: 'Tracking',
        persuade: 'Persuade',
        swim: 'Swim',
        lightArmor: 'Light Armor',
        heavyArmor: 'Heavy Armor',
        robes: 'Robes',
        scout: 'Scout',
        findTraps: 'Find traps',
        healing: 'Healing',
        hunting: 'Hunting',
        woodWorking: 'Wood working',
        scholar: 'Scholar',
        leadership: 'Leadership',
        none: 'None'
    },
    ENUM_STAT_NAMES: {
        str: 'Strength',
        agi: 'Agility',
        vit: 'Vitality',
        int: 'Intelligence',
        wis: 'Wisdom',
        luc: 'Luck',
        cha: 'Charm'
    },
    ENUM_JOB_NAMES: {
        rouge: 'Rouge',
        fighter: 'Fighter',
        knight: 'Knight',
        wizard: 'Wizard',
        cleric: 'Cleric',
        thief: 'Thief',
        noble: 'Noble',
        peseant: 'Peseant',
        monk: 'Monk',
        ranger: 'Ranger'
    },
    ENUM_LANGUAGES: {
        common: 'Common',
        commonElven: 'Common elven',
        highElven: 'High elven',
        darkElven: 'Dark elven',
        woodElven: 'Wood elven',
        dwarven: 'Dwarven',
        ancient: 'Ancient',
        black: 'Black',
        orcen: 'Orc',
        nobility: 'Nobility'
    },
    ENUM_RACE_NAMES: {
        human: 'Human',
        halfElf: 'Half elf',
        highElf: 'High elf',
        darkElf: 'Dark elf',
        woodElf: 'Wood elf',
        halfling: 'Halfling',
        dwarf: 'Dwarf'
    },
    ENUM_EQUIPMENT_TYPE: {
        oneHandSword: 'one hand sword',
        twoHandSword: 'two hand sword',
        lightArmor: 'light armor',
        heavyArmor: 'heavy armor',
        
    },
    ENUM_BODY_PART: {
        head:'head',
        rightHand:'rightHand',
        leftHand: 'leftHand',
        body: 'body',
        legs: 'legs'
    },
    ENUM_DICE: {
        d4:'D4',
        d6:'D6',
        d8:'D8',
        d10:'D10',
        d12:'D12',
        d20:'D20',
        d100:'D100',
    },
    ENUM_PERSONALITIES: {
        AMBITIOUS:0, // starts projects wants to be ruler
        INTELLIGENT:1, // reasons questioning
        GIFTED:2, // solves problems
        KIND:3, // meddles
        CRUEL:4, // calculating
        LAZY:5, // ignores issues
        NAIVE:6, // easy to manipulate
        PARANOID:7, // defensive
        RELIGIOUS:8, // good at chrsis
        GREEDY:9, // manipulative
        ALL:98,
        NONE:99
    },
    ENUM_PERSONALITY_DEALS_RESULT: {
        BAD:'BAD',
        GOOD:'GOOD',
        NORMAL:'NORMAL'
    },
    ENUM_PERSONALITY_DEALS_TYPE: {
        STRESS:0,
        PLANNING:1,
        DEFENCE:2,
        CHRISIS:3,
        PREPERATIONS:4,
        INITIATIVE:5,
        STRATEGY:6,
        RESOLUTION:7

    },
    ENUM_SEASONS: {
        winter: 'Winter',
        spring: 'Spring',
        summer: 'Summer',
        fall: 'Fall'
    },
    ENUM_EXPLORE_DIR: {
        north: 'N',
        south: 'S',
        west: 'W',
        east: 'E',
        unknown: 'U'
    },
    ENUM_EXPLORE_STATUS: {
        valid: 1,
        visited: 2,
        empty: 3,
        start: 4,
        goal: 5,
        obstacle:6,
        blocked:7,
        invalid:8,
        unknown:9
    },
    ENUM_BIOMES: {
        forest: 'F',
        hills: 'H',
        swamp: 'S',
        mountains: 'M',
        plains: 'P',
        lake: 'L',
        dessert: 'D',
        badlands: 'B',
        farmlands: 'A'
    },
    ENUM_BIOME_DESCRIPTIONS: {
        forest: 'forest',
        hills: 'hills',
        swamp: 'swamp',
        mountains: 'mountains',
        plains: 'plains',
        lake: 'lake',
        dessert: 'dessert',
        badlands: 'badlands',
        farmlands: 'farmlands'
    },
    ENUM_EVENT_TYPE: {
        restEvent:'restEvent',
        travelEvent:'travelEvent',
        questEvent: 'questEvent'
    },
    ENUM_CHARACTER_STATUS: {
        dead: 'dead',
        alive: 'alive',
        died: 'died'
    },
    ENUM_CHARACTER_TRAITS: {
        ABOMINATION: 0,
        DARK_PAST: 1,
        ESCAPED_SLAVE: 2,
        TRAVLER: 3,
        FISHER:4,
        CURSED: 5,
        FORMER_NOBLE: 6,
        ADVENTURER: 7,
        VETERAN: 8,
        SPIRIT_TALKER: 9,
        STICKY_FINGERS: 10,
        ALCOHOLIC: 11,
        GAMBLER: 12,
        SHIELDED: 13,
        RIDER: 14,
        OCCULTIST: 15,
        COOL_HEADED: 16
    },
    ENUM_TRAVEL_RESULTS: {
        allGood: 'allGood',
        noTravel: 'noTravel'
    },
    ENUM_GAME_STATE: {
        IDLE: 0,
        BUILDING_WORLD: 1
    },
    ENUM_GAME_MODE: {
        HISTORY: 0,
        ADVENTURE: 1,
        FAMILY: 2
    },
    ENUM_DWELLINGS: {
        NONE: 0,
        TOWN: 1,
        CITY: 2,
        TOWER: 3,
        DWARVEN_MINE: 4,
        ELF_TOWN: 5,
        RUINS: 6
    },
    ENUM_GENDER: {
        MALE: 'male',
        FEMALE: 'female'
    },
    ENUM_FILE_TYPE: {
        NONE: 0,
        WORLD: 1,
        VISUALIZATION: 2
    },
    ENUM_MASTERY_LEVELS: {
        NOVICE:0,
        SKILLED: 1,
        MASTER: 2
    },
    ENUM_GODS: {
        Gaeleath:0,
        Eyrnid:1,
        Zinzu:2,
        Norneiros:3,
        Norfaes:4,
        Neybne:5,
        Nerimoira:6,
        Wrezar:7
    },
    ENUM_EVENT_TYPE: {
        HISTORY: 0,
        ADVENTURE: 1,
        DOOM: 2,
        DUNGEON: 3,
    },
    ENUM_EVENT_ADVENTURE_TYPE: {
        TOWN:0
    },
    ENUM_ENEMY_TYPE: {
        VILE:0,
        WILD:1,
        ANCIENT:2
    },
    ENUM_ENEMY_STRENGTH: {
        WEAK:0,
        MEDIUM:1,
        STRONG:2,
        EPIC:3
    },
    ENUM_ENEMY_ATTACK: {
        HIT: 0,
        BITE: 1,
        SMASH: 2
    },
    ENUM_EVENT_ITEM_STATUS: {
        UNRESOLVED:0,
        SUCCESS:1,
        RESOLVED:2,
        FAILURE:3
    },
    ENUM_ITEM_TYPE: {
        ITEM:1,
        ONE_HAND_SWORD:2,
        TWO_HAND_SWORD:3,
        LIGHT_ARMOR:4,
        HEAVY_ARMOR: 5,
        ROBES:6,
        DAGGER: 7,
        BOW:8,
        SPEAR:9,
        STAFF:10,
        MACE:11,
        AXE:12,
        SHIELD:13,
        HELMET: 14
        
    },
    ENUM_ITEM_TIER: {
        COMMON: 1,
        ELITE: 2,
        MAGICAL: 3,
        LEGENDARY: 4,
    },
    ENUM_ITEM_EFFECTS: {
        FIRE: 1,
        BLIND: 2
    },
    ENUM_QUEST_STATUS: {
        NONE: 0,
        SEEK_QUEST:1,
        IN_PROGRESS:2,
        FAILED:3,
        FINISHED:4
    },
    ENUM_DUNGEON_SIZE: {
        SMALL: 0,
        MEDIUM: 1,
        LARGE: 2,
        EPIC: 4
    },
    ENUM_DUNGEON_ROOM_TYPE: {
        CORRIDOR: 0,
        CAVE_IN: 1,
        CHASM: 2,
        CAVE_OF_BONES: 3,
        FLOODED_CAVE: 4,
        GEMSTONE_CAVE: 5,
        GREAT_HALL: 6,
    },
    ENUM_LIGHT_LEVEL: {
        BRIGHT:0,
        DIM:1,
        DARK:2
    },
    ENUM_DUNGEON_DOOR_STATUS: {
        NONE: 0,
        OPEN: 1,
        CLOSED: 2,
        LOCKED: 3,
        HIDDEN: 4,
        MAGIC_SEAL: 5
    },
    
}