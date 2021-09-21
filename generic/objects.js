module.exports = {
    world: {
        id: undefined,
        name: undefined,
        map: undefined,
        date: undefined,
        families: []

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
        stats: undefined
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
        dwelling: undefined
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
    }
}