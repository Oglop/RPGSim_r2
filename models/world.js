const objects = require('../generic/objects')
const { logError } = require('../data/errorFile')
const {
    insertWorld,
    insertRoom,
    insertDwelling,
    insertCourt,
    insertAdvisor,
    insertCharacter,
    insertLanguage,
    insertProduction,
    insertSkill
} = require('../persistance').commands
const { WORLD_SIZE } = require('../generic/statics')
const { insertArmy } = require('../persistance/commands/insertArmy')
const { insertTroop } = require('../persistance/commands/insertTroop')


const saveMap = async (map) => {
    for (let y = 0; y < WORLD_SIZE; y++) {
        for (let x = 0; x < WORLD_SIZE; x++) {
            try {
                await insertRoom(map[x][y])
            } catch (e) {
                const err = objects.error
                err.file = __filename
                err.function = 'saveMap'
                err.step = `room:${JSON.stringify(map[x][y])}`
                err.message = e.message
                logError(err)
            }
        }
    }
}

const saveDwellings = async (dwellings) => {
    for (let d of dwellings) {
        try {
            await insertDwelling(d)
            for (let p of d.production) {
                await insertProduction(p)
            }
        } catch (e) {
            const err = objects.error
            err.file = __filename
            err.function = 'saveDwellings'
            err.step = `dwelling: ${JSON.stringify(d)}`
            err.message = e.message
            logError(err)
        }
    }
}

const saveCourts = async (dwellings) => {
    for (let d of dwellings) {
        try {
            await insertCourt(d.court)
            for (let a of d.court.advisors) {
                await insertAdvisor(a)
                await insertCharacter(a.character)
                for (let l of a.character.languages) { await insertLanguage(l) }
                for (let s of a.character.skills) { await insertSkill(s) }
            }
        } catch (e) {
            const err = objects.error
            err.file = __filename
            err.function = 'saveCourts'
            err.step = `dwelling: ${JSON.stringify(d)}`
            err.message = e.message
            logError(err)
        }
    }
}

const saveArmies = async (dwellings) => {
    for (let d of dwellings) {
        try {
            await insertArmy(d.army)
            for (let t of d.army.troops) {
                await insertTroop(t)
            }
        } catch (e) {
            const err = objects.error
            err.file = __filename
            err.function = 'saveArmies'
            err.step = `dwelling: ${JSON.stringify(d)}`
            err.message = e.message
            logError(err)
        }
    }
}


const offLoadWorld = async (world) => {
    const errors = []
    // world
    try {
        await insertWorld(world)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'offLoadWorld'
        err.step = 'insertWorld'
        err.message = e.message                                                                                                                      
        errors.push(err)
    }

    // map
    try {
        await saveMap(world.map)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'offLoadWorld'
        err.step = 'saveMap'
        err.message = e.message                                                                                                                      
        errors.push(err)
    }

    // dwellings
    try {
        await saveDwellings(world.dwellings)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'offLoadWorld'
        err.step = 'saveDwellings'
        err.message = e.message                                                                                                                      
        errors.push(err)
    }

    // courts
    try {
        await saveCourts(world.dwellings)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'offLoadWorld'
        err.step = 'saveDwellings'
        err.message = e.message                                                                                                                      
        errors.push(err)
    }

    try {
        await saveArmies(world.dwellings)
    } catch (e) {
        const err = objects.error
        err.file = __filename
        err.function = 'offLoadWorld'
        err.step = 'saveDwellings'
        err.message = e.message                                                                                                                      
        errors.push(err)
    }
    
    //logError(err)
} 


module.exports = {
    offLoadWorld
}