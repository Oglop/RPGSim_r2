const { 
    ENUM_EXPLORE_STATUS,
    ENUM_DUNGEON_DOOR_STATUS,
    ENUM_QUEST_STATUS,
    ENUM_PARTY_STATE,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLING_PRODUCTION_TYPE

} = require('../generic/enums')
module.exports = {
    app: {
        data:{
            id: undefined
        },
        routes: []
    },
    world: {
        id: undefined,
        name: undefined,
        map: undefined,
        dwellings: [],
        locations: [],
        date: undefined,
        families: [],
        dead: [],
        darkness: undefined,
        events: {
            history:[],
            adventure:[]
        },
        parties:[]
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
        isAlive: true,
        diedFrom:undefined,
        equipment: {
            head: undefined,
            weaponHand: undefined,
            shieldHand:undefined,
            body: undefined
        }
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
    point: {
        x: undefined,
        y: undefined
    },
    court: {
        id: undefined,
        dwellingId: undefined,
        rulerId: undefined,
        ruler: undefined,
        advisors: [],
        loans: []
    },
    loan: {
        id: undefined,
        courtId: undefined,
        rulerId: undefined,
        amount: 0,
        from: undefined,
    },
    advisor: {
        id: undefined,
        character: undefined,
        courtId: undefined
    },
    dwelling: {
        id: undefined,
        x: undefined,
        y: undefined,
        name: undefined,
        type: undefined,
        size: undefined,
        courtId: undefined,
        production: [],
        army: undefined,
        citizens: undefined,
        citizenTaxable: 1.0,
        gold: 0,
        food: 0,
        taxRate: 0,
        happiness: 0,
        gate: ENUM_DWELLING_CONDITIONS.NONE,
        walls: ENUM_DWELLING_CONDITIONS.NONE,
        moats: ENUM_DWELLING_CONDITIONS.NONE,
        guards: ENUM_DWELLING_CONDITIONS.NONE
    },
    dwellingProduction: {
        id: undefined,
        dwellingId: undefined,
        type: ENUM_DWELLING_PRODUCTION_TYPE.NONE,
        production: 0,
    },
    citizens: {
        id: undefined,
        count: 0
    },
    army: {
        id: undefined,
        dwellingId: undefined,
        name: undefined,
        troops: []
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
    family: {
        id: undefined,
        name: undefined,
        coatOfArms: undefined,
        ruler: undefined,
        influence: 0,
        members: [],
        dwellingId: undefined
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
    skill: {
        characterId: undefined,
        name: undefined,
        statsBase: undefined,
        luckTest: false,
        mastery: 0
    },
    date: {
        year: 0,
        month: 0,
        day: 0
    },
    language: {
        name: undefined,
        mastery: 0
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
    god: {
        name: undefined,
        description: undefined,
        type: undefined
    },
    enemy: {
        id: undefined,
        type: undefined,
        name: undefined,
        hp: 0,
        stats: undefined,
        attacks: []

    },
    enemyStats: {
        str:0,
        agi:0,
        res:0,
        int:0
    },
    enemyAttack: {
        min: 0,
        max: 0,
        name: undefined,
    },
    item: {
        id: undefined,
        type: undefined,
        name: undefined,
        use: undefined,
        effect: undefined,
        value: 0,
        skillRequired: undefined
    },
    npc: {
        id: undefined,
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
        crowns:0,
        food:0
    }
}