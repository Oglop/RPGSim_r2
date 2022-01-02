
const { findShortestPath, resetQuestGoal } = require('../models/pathFinding')

const map = [
    [
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P","description":"Liaed, the broken plains"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"F"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"F"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"}
    ],[
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":7,"biome":"L"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":7,"biome":"L"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"}
    ],[
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":7,"biome":"L"},
        {"elevation":0,"temprature":0,"exploreStatus":7,"biome":"L"},
        {"elevation":0,"temprature":0,"exploreStatus":7,"biome":"L"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"}
    ],[
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P","dwelling":{"inhabited":true,"id":"smb3krta0V","type":1,"name":"Low Annolin"}},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"F"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"}
    ],[
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"F"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"A"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"},
        {"elevation":0,"temprature":0,"exploreStatus":3,"biome":"P"}
    ],
]

describe('test for pathfinding', () => {
    test('find shortest path', () => {
        const partyPosition = { x: 0, y: 4 }
        const goalPoint = { x: 2, y: 1 }
        const path1 = findShortestPath(partyPosition, map, goalPoint)
        expect(path1.toString()).toBe('N,N,N,N,E,E,S')
        expect(map[goalPoint.y][goalPoint.x].exploreStatus).toBe(5)
        resetQuestGoal(map, goalPoint)
        expect(map[goalPoint.y][goalPoint.x].exploreStatus).toBe(3)
    })
})


