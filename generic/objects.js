module.exports = {
    world: {
        id: undefined,
        name: undefined,
        map: undefined,
        date: undefined,
        families: [],
        darkness: undefined
    },
    character: {
        id: undefined,
        name: undefined,
        gender: undefined,
        marriedTo: undefined,
        mother: undefined,
        father: undefined,
        pregnant: false,
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
        maxStamina: 0
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
    room: {
        elevation: 0,
        temprature: 0,
        biome: undefined,
        dwelling: undefined,
        description: undefined
    },
    point: {
        x: undefined,
        y: undefined
    },
    dwelling: {
        id: undefined,
        name: undefined,
        type: undefined
    },
    language: {
        name: undefined,
        mastery: 0
    },
    family: {
        id: undefined,
        name: undefined,
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
        rooms: []
    },
    dungeonRoom: {

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
        items: []
    },
    eventItem: {
        language: undefined,
        test: undefined,
        skill: undefined,
        resolution: undefined
    }
}