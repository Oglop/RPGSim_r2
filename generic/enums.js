module.exports = {
    ENUM_SKILL_NAMES: {
        lockPicking: 'Lock picking',
        steal: 'Steal',
        sneak: 'Sneak',
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
        COOL_HEADED: 16,
        SCEPTIC: 17,
        BARD: 18
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
        HUMAN: 1,
        DARK_ELF: 2,
        HIGH_ELF: 3,
        WOOD_ELF: 4,
        HALFLING: 5,
        DWARF: 6,
        
    },
    ENUM_DWELLING_SIZE: {
        VILLAGE: 0,
        TOWN: 1,
        CITY: 2,
        CAPITAL: 3
    },
    ENUM_DWELLING_PROJECTS: {
        DEFENSES: 0,
        MONUMENT: 1,
        TRADE: 3,
        ARMY: 4,
        GUARDS: 6
    },
    ENUM_DWELLING_CONDITIONS: {
        NONE: 0,
        RUINED: 1,
        POOR: 2,
        GOOD: 3,
        PERFECT: 4
    },
    ENUM_DWELLING_PRODUCTION_TYPE: {
        NONE: 0,
        WHEAT: 1,
        CATTLE: 2,
        DEER: 3,
        FISH: 4,
        WOOD: 6,
        MUSHROOMS: 7,
        IRON: 8,
        STONE: 9,
        SALT: 10,
        GOLD: 11,
        CRYSTAL: 12,
        GEMS: 13,
        ADAMANTINE: 14
    },
    ENUM_DWELLING_LOCATION_TYPE: {
        INN: 0,
        TAVERN: 1,
        BLACKSMITH: 2,
        TRAINING_GROUNDS: 3,
        GUARDS_HOUSE: 4,
        TEMPLE: 5,
        LIBRARY: 6,
        STREET: 7,
        HARBOUR: 8,
        MARKET: 9,
        PALACE: 10,
        SQUARE: 11,
        CEMETARY: 12,
        UNIVERSITY: 13,
        SHRINE: 14,
        BATHS: 15,
        COURT: 16,
        JAIL: 17,
        TREASAURY: 18,
        WIZARDS_TOWER: 19,
        TOWN_HALL: 20,
        BANK: 21,
        CARPENTER: 22,
        GUILD: 23,
        MAGIC_ACADEMY: 24,
        PARK: 25,
        TOURNAMENT_FIELD: 26,
        ARENA: 27,
        CATACOMBS: 28,
        BAKER: 29,
        STABLES: 30,
        SEWERS: 31
        
    },
    ENUM_DWELLING_LOCATION_STATUS: {
        UNDER_CONSTRUCTION: 0,
        ACTIVE: 1,
        ABANDONED: 2,
        DESTROYED: 3
    },
    ENUM_LOCATIONS: {
        NONE: 0,
        RUINS: 1,
        TOWER: 2,
        DWARVEN_MINE: 3
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
        REST: 4,
        DATE: 5,
        TRAVEL: 6
    },
    ENUM_EVENT_ADVENTURE_TYPE: {
        TOWN:0
    },
    ENUM_ENEMY_TYPE: {
        VILE:0,
        WILD:1,
        ANCIENT:2,
        HUMAN: 3
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
    ENUM_ADVENTURE_DAILY_ACTION: {
        REST_TOWN:0,
        REST_MAP:1,
        TRAVEL_MAP:2,
        SEEK_QUEST_TOWN:3,
        EVENT_TOWN:4,
        ATEMPT_QUEST:5
    },
    ENUM_PARTY_STATE: {
        TRAVEL: 0,
        SEEK_NEW_QUEST: 1,
        RESTING: 2,
        QUESTING: 3,
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
    ENUM_QUEST_TYPE: {
        RUIN:0
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
    ENUM_TROOP_TYPE: {
        KNIGHTS: 0,
        MEN_AT_ARMS: 1,
        ARCHERS: 2,
        MERCENARIES: 3,
        INFANTRY: 4,
        CATAPULTS: 5
    },
    ENUM_NPC_TYPE: {
        ADMINISTRATOR: 0,
        INN_KEEPER: 1,
        NOBLE: 2,
        MASTER: 3,
        BAR_KEEPER: 4,
        DWARF: 5,
        ELF: 6,
        HALFLING: 7,
        WIZARD: 8,
        BOUNCER: 9,
        ADVENTURER: 10,
        BOY: 11,
        TEEN: 12,
        SMITH: 13,
        GIRL: 14,
        GUARD: 15,
        KNIGHT: 16,
        FIGHTER: 17,
        APRENTICE: 18,
        PRIEST: 19,
        LIBRARIAN: 20,
        OLD_MAN: 21,
        SAILOR: 22,
        MERCHANT: 23,
        GRAVE_KEEPER: 24,
        CARPENTER: 25,
        BAKER: 26
    },
    ENUM_OVERSPENDING_ACTION: {
        NONE: 0,
        INCREASE_TAX: 1,
        DOWNSIZE_ARMY: 2,
        RELIGIOUS_FUNDS: 3,
        MERCHANTS_LOAN: 4,
        ABANDON_CONSTRUCTION: 5,
        SEEK_TRADE: 6,
        GO_PLUNDER: 7,
        DECREASE_DEFENCES: 8,
        INCREASE_PRODUCTION: 9
    },
    ENUM_UNDERSPANDING_ACTION: {
        NONE: 0,
        DECREASE_TAX: 1,
        TOURNEY: 2,
        INCREASE_MILITARY: 3,
        INCREASE_DEFENCES: 4,
        INCREASE_TREASURY: 5,
        START_CONSTRUCTION: 6,
        SEEK_TRADE: 7,
        INCREASE_PRODUCTION: 8
    },
    ENUM_CHARACTER_HEALTH_STATUS: {
        BAD_HEARING: 0,
        BAD_EYESIGHT: 1,
        BACK_PAIN: 2,
        NECK_PAIN: 3,
        DIABETES: 4,
        DEMENTIA: 5,
        OSTEOARTHRISTIS: 6,
        DEPRESSION: 7
    },
    ENUM_COMMANDS: {
        DELETEADVISOR: 'deleteAdvisor',
        DELETECHARACTER: 'deleteCharacter',
        DELETE_TRADE: 'deleteTrade',
        DELETE_TROOP: 'deleteTroop',
        DELETE_QUEST: 'deleteQuest',
        DELETE_PARTY: 'deleteParty',

        INSERTROOM: 'insertRoom',
        INSERTDWELLING: 'insertDwelling',
        INSERT_DWELLING_LOCATION: 'insertDwellingLocation',
        INSERTCHARACTER: 'insertCharacter',
        INSERTWORLD: 'insertWorld',
        INSERTCOURT: 'insertCourt',
        INSERTADVISOR: 'insertAdvisor',
        INSERTLANGUAGE: 'insertLanguage',
        INSERTSKILL: 'insertSkill',
        INSERTRELATION: 'insertRelation',
        INSERTPRODUCTION: 'insertProduction',
        INSERTARMY: 'insertArmy',
        INSERTTROOP: 'insertTroop',
        INSERTLOAN: 'insertLoan',
        INSERT_NPC: 'insertNPC',
        INSERT_TRADE: 'insertTrade',
        INSERT_STORY: 'insertStory',
        INSERT_QUEST: 'insertQuest',
        INSERT_PARTY: 'insertParty',

        UPDATEROOM: 'updateRoom',
        UPDATEDWELLING: 'updateDwelling',
        UPDATE_DWELLING_LOCATION: 'updateDwellingLocation',
        UPDATECHARACTER: 'updateCharacter',
        UPDATEWORLDDATE: 'updateWorldDate',
        UPDATELANGUAGEMASTERY: 'updateLanguageMastery',
        UPDATERELATIONPOINTS: 'updateRelationPoints',
        UPDATEPRODUCTION: 'updateProduction',
        UPDATETROOP: 'updateTroop',
        UPDATELOAN: 'updateLoan',
        UPDATERULERINCOURT: 'updateRulerInCourt',
        UPDATE_TRADE: 'updateTrade',
        UPDATE_QUEST: 'updateQuest',
        UPDATE_PARTY: 'updateParty',
        UPDATE_SKILL: 'updateSkill'
    },
    ENUM_STORY_TYPE: {
        WORLD: 0,
        ADVENTURE: 1,
        HISTORY: 2
    },
    ENUM_STORY_SUB_TYPE: {
        NONE: 0
    },
    ENUM_STORY_TAGS: {
        HEADER_1: 'h1',
        HEADER_2: 'h2',
        HEADER_3: 'h3',
        PARAGRAPH: 'p',
        ITALIC: 'i',
        BOLD: 'b'
    },
    ENUM_DWELLING_DAILY_ACTION: {
        TRAIN: 1,
        RESUPPLY: 2,
        SHOP: 3,
        SEEK_AUDIENCE: 4,
        SEEK_QUEST: 5,
    },
    ENUM_SPELLS: {
        THIRD_EYE: 0,
        HEAL: 1,
        DISGUISE: 2,
        QUICK_FEET: 3
    },
    ENUM_ENCOUNTER_RANGE: {
        FAR: 0,
        LONG: 1,
        SHORT: 2
    },
    ENUM_ENCOUNTER_QUEUE_ITEM_TYPE: {
        HERO: 0,
        MONSTER: 1
    },
    ENUM_ENCOUNTER_ACTION_TYPE: {
        MELEE: 0,
        RANGED: 1,
        MAGIC: 2
    },
    ENUM_HEALTH_STATUS: {
        UNCONSCIOUS: 0
    }
}