const { 
    ENUM_EXPLORE_STATUS,
    ENUM_DUNGEON_DOOR_STATUS,
    ENUM_QUEST_STATUS,
    ENUM_PARTY_STATE,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLING_PRODUCTION_TYPE,
    ENUM_STORY_TYPE,
    ENUM_STORY_SUB_TYPE,
    ENUM_MAGIC_SCHOOLS

} = require('../generic/enums')
module.exports = {
    app: {
        data:{
            id: undefined
        },
        routes: []
    },
    advisor: {
        id: undefined,
        character: undefined,
        courtId: undefined
    },
    army: {
        id: undefined,
        dwellingId: undefined,
        name: undefined,
        troops: []
    },
    court: {
        id: undefined,
        dwellingId: undefined,
        rulerId: undefined,
        ruler: undefined,
        monthlyIncome: 0,
        monthlyExpense: 0,
        advisors: [],
        loans: [],
        projects: []
    },
    character: {
        id: undefined,
        name: undefined,
        family: undefined,
        coatOfArms: undefined,
        title: undefined,
        description: undefined,
        gender: undefined,
        marriedTo: undefined,
        mother: undefined,
        father: undefined,
        pregnant: false,
        pregnantTime: 0,
        job: undefined,
        race: undefined,
        languages: [],
        skills: [],
        statuses: [],
        spells: [],
        birthDate: undefined,
        trait: undefined,
        age: 0,
        stats: undefined,
        health: 0,
        maxHealth: 0,
        stamina: 0,
        maxStamina: 0,
        religion: undefined,
        personality: undefined,
        relationships: [],
        history: [],
        encounterRules: [],
        isAlive: true,
        magicSchool: ENUM_MAGIC_SCHOOLS.NONE,
        diedFrom:undefined,
        equipment: {
            head: undefined,
            weaponHand: undefined,
            shieldHand:undefined,
            body: undefined
        }
    },
    citizens: {
        id: undefined,
        count: 0
    },
    dwelling: {
        id: undefined,
        x: undefined,
        y: undefined,
        name: undefined,
        description: undefined,
        type: undefined,
        size: undefined,
        courtId: undefined,
        production: [],
        locations: [],
        trade: [],
        army: undefined,
        citizens: undefined,
        citizenTaxable: 1.0,
        gold: 0,
        food: 0,
        growth: 0,
        taxRate: 0,
        happiness: 0,
        happinessModifyer: 0,
        gate: ENUM_DWELLING_CONDITIONS.NONE,
        walls: ENUM_DWELLING_CONDITIONS.NONE,
        moats: ENUM_DWELLING_CONDITIONS.NONE,
        guards: ENUM_DWELLING_CONDITIONS.NONE
    },
    dwellingTrade: {
        id: undefined,
        dwellingId: undefined,
        partnerId: undefined,
        value: undefined
    },
    dwellingProduction: {
        id: undefined,
        dwellingId: undefined,
        type: ENUM_DWELLING_PRODUCTION_TYPE.NONE,
        production: 0,
    },
    dwellingLocation: {
        id: undefined,
        dwellingId: undefined,
        name: undefined,
        npcs: [],
        type: undefined,
        status: undefined
    },
    dwellingProject: {
        id: undefined,
        type: undefined,
        name: undefined
    },
    dwellingRumor: {
        dwellingId: undefined,
        rumorId: undefined
    },
    dungeon: {
        id: '',
        size: '',
        position: 0,
        description: undefined,
        theme: undefined,
        room: undefined
    },
    dungeonRoom: {
        id:'',
        description: '',
        door: ENUM_DUNGEON_DOOR_STATUS.NONE,
        event: undefined
    },
    dungeonRoomDoor: {
        to: undefined
    },
    dungeonEventItem: {
        description: undefined,
        execute: undefined,
        status: undefined
    },
    date: {
        year: 0,
        month: 0,
        day: 0
    },
    encounter: {
        id: undefined,
        range: undefined,
        party: undefined,
        enemies: []
    },
    encounterItem: {
        id: undefined,
        initiative: 0,
        type: undefined,
        acted: 0
    },
    enemy: {
        id: undefined,
        type: undefined,
        name: undefined,
        health: 0,
        maxHealth: 0,
        statuses: [],
        stats: undefined,
        actions: []

    },
    enemyStats: {
        str:0,
        agi:0,
        vit:0,
        int:0,
        luc:0
    },
    enemyAttack: {
        min: 0,
        max: 0,
        statBase: undefined,
        name: undefined,
    },
    error: {
        time: undefined,
        message: undefined,
        file: undefined,
        function: undefined,
        step: undefined
    },
    event: {
        active: true,
        items: [],
        output: undefined
    },
    eventItem: {
        description: undefined,
        language: undefined,
        execute: undefined,
        test: undefined,
        skill: undefined,
        resolution: 0,
        resolutionText: undefined
    },
    family: {
        id: undefined,
        name: undefined,
        coatOfArms: undefined,
        ruler: undefined,
        influence: 0,
        members: [],
        dwellingId: undefined
    },
    god: {
        id: undefined,
        name: undefined,
        profile: undefined,
        symbol: undefined,
        description: undefined
    },
    stats: {
        str: 0,
        vit: 0,
        agi: 0,
        wis: 0,
        int: 0,
        cha: 0,
        luc: 0
    },
    relation: {
        characterId: undefined,
        id: undefined,        
        points: 0
    },
    room: {
        id: undefined,
        worldId: undefined,
        x: 0,
        y:0,
        magicWind: 0,
        elevation: 0,
        temprature: 0,
        biome: undefined,
        dwellingId: undefined,
        description: undefined,
        exploreStatus: ENUM_EXPLORE_STATUS.empty,
    },
    rumor: {
        id: undefined,
        questId: undefined,
        description: undefined,
        type: 0,
        position: {
            x: 0,
            y: 0
        },
        target: {
            x:0,
            y:0
        }
    },
    point: {
        x: undefined,
        y: undefined
    },
    loan: {
        id: undefined,
        courtId: undefined,
        rulerId: undefined,
        amount: 0,
        from: undefined,
    },
    troop: {
        id: undefined,
        armyId: undefined,
        name: undefined,
        type: undefined,
        power: 0,
        number: 0,
    },
    language: {
        characterId: undefined,
        language: undefined,
        mastery: 0
    },
    traits: {
        human: {
            str: 0,
            agi: 0,
            vit: 0,
            int: 0,
            wis: 0,
            luc: 0,
            cha: 0
        },
        halfElf: {
            str: 0,
            agi: 1,
            vit: -1,
            int: 1,
            wis: 0,
            luc: 0,
            cha: 1
        },
        woodElf: {
            str: -1,
            agi: 2,
            vit: -1,
            int: 1,
            wis: 1,
            luc: 0,
            cha: 0
        },
        darkElf: {
            str: 0,
            agi: 2,
            vit: -1,
            int: 2,
            wis: 0,
            luc: -1,
            cha: -2
        },
        highElf: {
            str: -1,
            agi: 1,
            vit: -1,
            int: 3,
            wis: 2,
            luc: 0,
            cha: 1
        },
        dwarf: {
            str: 2,
            agi: 0,
            vit: 1,
            int: -1,
            wis: 1,
            luc: -2,
            cha: -1
        },
        halfling: {
            str: -2,
            agi: 3,
            vit: -2,
            int: 0,
            wis: 0,
            luc: 4,
            cha: 2
        }
    },
    skill: {
        id: undefined,
        characterId: undefined,
        name: undefined,
        statsBase: undefined,
        luckTest: false,
        mastery: 0
    },
    language: {
        id: undefined,
        name: undefined,
        mastery: 0
    },
    god: {
        name: undefined,
        description: undefined,
        type: undefined
    },
    item: {
        id: undefined,
        type: undefined,
        name: undefined,
        use: undefined,
        effect: undefined,
        min: 0,
        max: 0,
        value: 0,
        skillRequired: undefined
    },
    npc: {
        id: undefined,
        dwellingLocationId: undefined,
        name: undefined,
        description: undefined,
        type: undefined,
        personality: undefined,
        history: []
    },
    party: {
        id: undefined,
        name: undefined,
        karma: 0,
        members: [],
        path: [],
        state: ENUM_PARTY_STATE.SEEK_NEW_QUEST,
        position: { x: -1, y: -1 },
        quest: {},
        questStatus: ENUM_QUEST_STATUS.NONE,
        questGoal: { x: -1, y: -1 },
        knownRumors: [],
        crowns:0,
        food:0
    },
    partyRumor: {
        partyId: undefined,
        rumorId: undefined
    },
    quest: {
        id: undefined,
        type: undefined,
        status: undefined,
        x: undefined,
        y: undefined,
        originLocationId: undefined,
        originNpcId: undefined,
        originDwellingLocationId: undefined
    },
    queueItem: {
        command: undefined,
        data: undefined
    },
    story: {
        id: undefined,
        aboutId: undefined,
        type: ENUM_STORY_TYPE.WORLD,
        subType: ENUM_STORY_SUB_TYPE.NONE,
        date: undefined,
        message: undefined,
        tag: undefined
    },
    spell: {
        name: undefined,
        type: undefined,
        cost: 0
    },
    world: {
        id: undefined,
        name: undefined,
        map: undefined,
        dwellings: [],
        locations: [],
        gods: [],
        date: undefined,
        families: [],
        dead: [],
        darkness: undefined,
        events: {
            history:[],
            adventure:[]
        },
        parties:[]
    }
    
    
}