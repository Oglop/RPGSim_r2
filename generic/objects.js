const { ENUM_EXPLORE_STATUS } = require('../generic/enums')
module.exports = {
    world: {
        id: undefined,
        name: undefined,
        map: undefined,
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
        birthDate: undefined,
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
        id: undefined,
        points: 0
    },
    room: {
        elevation: 0,
        temprature: 0,
        biome: undefined,
        dwelling: undefined,
        description: undefined,
        exploreStatus: ENUM_EXPLORE_STATUS.empty,
    },
    point: {
        x: undefined,
        y: undefined
    },
    dwelling: {
        id: undefined,
        name: undefined,
        type: undefined,
        inhabited: true
    },
    language: {
        language: undefined,
        mastery: 0
    },
    family: {
        id: undefined,
        name: undefined,
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
        theme: undefined,
        rooms: []
    },
    dungeonRoom: {
        id:''
    },
    skill: {
        name: undefined,
        printable: undefined,
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
        function: undefined
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
        hp: 0
    },
    item: {
        type: undefined,
        name: undefined,
        use: undefined,
        effect: undefined,
        value: 0,
        skillRequired: undefined
    },
    party: {
        id: undefined,
        karma: 0,
        members: [],
        path: [],
        position: { x: 0, y: 0 },
        quest: undefined,
        questStatus: undefined,
        questGoal: { x: 0, y: 0 },
        crowns:0,
        food:0
    }
}