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
        leadership: 'Leadership'
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
        egoistic:'egoistic',
        currious:'currious',
        friendly:'friendly',
        lonewolf:'lonewolf',
        stoic:'stoic',
        leader:'leader',
        loudmouth:'loudmouth',
        clumpsy:'clumpsy',
        meddler:'meddler',
        religious: 'religious',
        all:'all',
        none: 'none'
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
        WORLD: 1
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
    }
}