// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_COMMANDS,
    ENUM_GENDER,
    ENUM_PERSONALITIES, 
    ENUM_PERSONALITY_DEALS_RESULT, 
    ENUM_PERSONALITY_DEALS_TYPE, 
    ENUM_DWELLING_LOCATION_STATUS,
    ENUM_DWELLING_CONDITIONS,
    ENUM_DWELLINGS,
    ENUM_DWELLING_SIZE,
    ENUM_DWELLING_PRODUCTION_TYPE,
    ENUM_UNDERSPANDING_ACTION,
    ENUM_OVERSPENDING_ACTION,
    ENUM_TROOP_TYPE,
    ENUM_STORY_TYPE,
    ENUM_STORY_TAGS,
    ENUM_DWELLING_LOCATION_TYPE,
    ENUM_NPC_TYPE,
    ENUM_JOB_NAMES,
    ENUM_BIOMES
} = require('../generic/enums')
const { 
    removeElementFromArrayById,
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomFloatInRange,
    getRandomElementFromArray, 
    generateID,
    isEmptyObject,
    point2d
} = require('../lib/utils')
const {
    CONDITION_NONE_MULTIPLYER,
    CONDITION_RUINED_MULTIPLYER,
    CONDITION_POOR_MULTIPLYER,
    CONDITION_GOOD_MULTIPLYER,
    CONDITION_PERFECT_MULTIPLYER,
    GUARD_HAPPINESS_MOD_NONE,
    GUARD_HAPPINESS_MOD_RUINED,
    GUARD_HAPPINESS_MOD_POOR,
    GUARD_HAPPINESS_MOD_GOOD,
    GUARD_HAPPINESS_MOD_PERFECT, 
} = require('../generic/statics')
const { getStoryEntry } = require('../build/story')
// STANDARD IMPORTS

const { getTroopCost } = require('../models/army')
const { buildTroop } = require('../build/army')
const {
    executeCommands
} = require('../persistance/commandQueue')
const bLocation = require('../build/dwellingLocation')
const bNPC = require('../build/npc')
const bCharacter = require('../build/character')
const bProduction = require('../build/production')
const { 
    compabilityCheck, 
    dealWithUnderSpending, 
    dealWithOverSpending, 
    getConstructionPreference } = require('./personality')
const m = require('../models/court')
const { getRandomReligion } = require('../generic/religions')
const { getAgeSimple } = require('../lib/time')
const { hasOngoingProject, getRaceFromDwellingType, getDifferentDwelling } = require('./dwelling')
const { isPointOnMap, getBiomeAtPoint, isBiome } = require('../models/map')

const upgradeCondition = (condition) => {
    switch (condition) {
        case ENUM_DWELLING_CONDITIONS.NONE: return ENUM_DWELLING_CONDITIONS.POOR;
        case ENUM_DWELLING_CONDITIONS.RUINED: return ENUM_DWELLING_CONDITIONS.POOR;
        case ENUM_DWELLING_CONDITIONS.POOR: return ENUM_DWELLING_CONDITIONS.GOOD;
        case ENUM_DWELLING_CONDITIONS.GOOD: return ENUM_DWELLING_CONDITIONS.PERFECT;
    }
}

const downgradeCondition = (condition) => {
    switch (condition) {
        case ENUM_DWELLING_CONDITIONS.RUINED: return ENUM_DWELLING_CONDITIONS.NONE;
        case ENUM_DWELLING_CONDITIONS.POOR: return ENUM_DWELLING_CONDITIONS.RUINED;
        case ENUM_DWELLING_CONDITIONS.GOOD: return ENUM_DWELLING_CONDITIONS.POOR;
        case ENUM_DWELLING_CONDITIONS.PERFECT: return ENUM_DWELLING_CONDITIONS.GOOD;
    }
}


const dwellingQualityMultiplyer = (quality) => {
    switch (quality) {
        case ENUM_DWELLING_CONDITIONS.NONE : return CONDITION_NONE_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.RUINED : return CONDITION_RUINED_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.POOR : return CONDITION_POOR_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.GOOD : return CONDITION_GOOD_MULTIPLYER;
        case ENUM_DWELLING_CONDITIONS.PERFECT : return CONDITION_PERFECT_MULTIPLYER;
    }
}

/**
 * return good bad or normal based on personality compability check
 * @param {object} dwelling 
 * @returns {ENUM_PERSONALITY_DEALS_RESULT}
 */
const consultAdvisor = async (ruler, advisor) => {
    try {
        const advisoryResult = compabilityCheck(ruler, advisor.character)
        const result = (advisoryResult <= 0) ? ENUM_PERSONALITY_DEALS_RESULT.BAD : 
                        (advisoryResult >= 3) ? ENUM_PERSONALITY_DEALS_RESULT.GOOD : 
                                                ENUM_PERSONALITY_DEALS_RESULT.NORMAL
        return result
    }
    catch(e) {
        const err = copyObject(objects.error)
        err.file = __filename
        err.function = 'consultAdvisor'
        err.message = e.message
        logError(err)
    }
}

/**
 * return gold from income
 * @param {object} dwelling 
 * @returns {integer}
 */
const locationIncomeFromLocation = (dwelling) => {
    let income = 0
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.MARKET) != undefined) {
        income += Math.floor((dwelling.citizens * 0.01) * getRandomNumberInRange(1,3))
    }
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.BANK) != undefined) {
        income += Math.floor((dwelling.citizens * 0.01) * getRandomNumberInRange(3,6))
    }
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.ARENA) != undefined) {
        income += Math.floor((dwelling.citizens * 0.01) * getRandomNumberInRange(1,2))
    }
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.HARBOUR) != undefined) {
        income += Math.floor((dwelling.citizens * 0.01) * getRandomNumberInRange(2,4))
    }
    return income
}

/**
 * 
 * @param {object} dwelling 
 * @returns {ionteger}
 */
const locationCostFromCorruption = (dwelling) => {
    const percetage = dwelling.citizens * 0.01
    let cost = Math.floor(percetage * getRandomNumberInRange(2,4))
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.GUARDS_HOUSE) != undefined) {
        cost -= Math.floor(cost * 0.2)
    }
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.COURT) != undefined) {
        cost -= Math.floor(cost * 0.3)
    }
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.JAIL) != undefined) {
        cost -= Math.floor(cost * 0.3)
    }
    if (dwelling.locations.find(l => l.type == ENUM_DWELLING_LOCATION_TYPE.TOWN_HALL) != undefined) {
        cost -= Math.floor(cost * 0.2)
    }
    return cost
}

/**
 * returns number value for multiplying citizen happiness
 * @param {ENUM_DWELLING_CONDITIONS} guard 
 */
const getGuardHappinessModifyer = (guard) => {
    switch (guard) {
        case ENUM_DWELLING_CONDITIONS.NONE : return GUARD_HAPPINESS_MOD_NONE;
        case ENUM_DWELLING_CONDITIONS.RUINED : return GUARD_HAPPINESS_MOD_RUINED;
        case ENUM_DWELLING_CONDITIONS.POOR : return GUARD_HAPPINESS_MOD_POOR;
        case ENUM_DWELLING_CONDITIONS.GOOD : return GUARD_HAPPINESS_MOD_GOOD;
        case ENUM_DWELLING_CONDITIONS.PERFECT : return GUARD_HAPPINESS_MOD_PERFECT;
    }
}


const getTitleByDwellingSize = (size) => {
    switch (size) {
        case ENUM_DWELLING_SIZE.VILLAGE: return get('character-ruler-title-village');
        case ENUM_DWELLING_SIZE.TOWN: return get('character-ruler-title-town');
        case ENUM_DWELLING_SIZE.CITY: return get('character-ruler-title-city');
        case ENUM_DWELLING_SIZE.CAPITAL: return get('character-ruler-title-capital');
    }
}

/**
 * 
 * @param {text} dwelling 
 * @param {array} deceased 
 * @param {array} advisors 
 * @param {object} currentDate 
 */
const replaceAdvisors = async (dwelling, deceacedAdvisor, advisors, currentDate) => {
    let age = 0
    let family
    let coatOfArms
    let religion
    if (chance(50) && getAgeSimple(currentDate, deceacedAdvisor.birthDate) > 50 ) {
        age = getRandomNumberInRange(16, 30)
        family = deceacedAdvisor.family
        religion = deceacedAdvisor.religion
    } else {
        age = getRandomNumberInRange(16, 30)
        family = deceacedAdvisor.family
        religion = getRandomReligion()
    }

    const character = bCharacter.build({
        age,
        gender: (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE,
        race,
        job: ENUM_JOB_NAMES.noble,
        father: '',
        mother: '',
        enforceMinimumSum: false,
        date: currentDate,
        religion,
        title: get('character-ruler-title-lord'),
        family,
        coatOfArms
    })

    const advisor = copyObject(objects.advisor)
    advisor.id = generateID()
    advisor.character = character
    advisor.courtId = dwelling.court.id
    advisors.push(character)

    await executeCommands([
        { command: ENUM_COMMANDS.INSERTADVISOR, data: advisor },
        { command: ENUM_COMMANDS.INSERTCHARACTER, data: character }
    ])
}

/**
 * Find new ruler from advisors or just a new one
 * update court
 * @param {*} dwelling 
 * @param {*} currentDate 
 */
const replaceRuler = async (dwelling, currentDate) => {
    const commands = []
    const advisors = dwelling.court.advisors.filter(a => a.isAlive == true)
    let character;
    if (advisors.length) {
        character = getRandomElementFromArray(advisors)
        commands.push({ command: ENUM_COMMANDS.DELETEADVISOR, data: character.id })
    }
    else {
        character = bCharacter.build({
            age: getRandomNumberInRange(18, 60),
            gender: (chance(50)) ? ENUM_GENDER.FEMALE : ENUM_GENDER.MALE,
            race,
            job: ENUM_JOB_NAMES.noble,
            father: '',
            mother: '',
            enforceMinimumSum: false,
            date: currentDate,
            religion: (!randomReligion) ? religion : getRandomReligion(),
            title: m.getTitleByDwellingSize(dwelling.size)
        })
        commands.push({ command: ENUM_COMMANDS.INSERTCHARACTER, data: character })
    }
    commands.push({ command: ENUM_COMMANDS.UPDATERULERINCOURT, data: court })
    dwelling.court.rulerId = character.id
    dwelling.court.ruler = character

    await executeCommands(commands)
}


/**
 * executes action based on court balance under budget
 * @param {object} dwelling 
 * @param {object} world 
 */
const underBudgetAction = async (dwelling, world) => {

    const personality = dwelling.court.ruler.personality
    const advisor = getRandomElementFromArray(dwelling.court.advisors)
    const ongoingProjects = hasOngoingProject(dwelling)
    const advisorResult = consultAdvisor( dwelling.court.ruler, advisor )

    const action = dealWithUnderSpending(personality, advisorResult, dwelling, ongoingProjects)
    switch (action) {
        case ENUM_UNDERSPANDING_ACTION.DECREASE_TAX: await decreaseTaxrate(dwelling); break;
        case ENUM_UNDERSPANDING_ACTION.INCREASE_DEFENCES: await increaseDefenses(dwelling); break;
        case ENUM_UNDERSPANDING_ACTION.INCREASE_MILITARY: await upSizeArmy(dwelling); break;
        case ENUM_UNDERSPANDING_ACTION.INCREASE_PRODUCTION: await increaseProduction(dwelling); break;
        case ENUM_UNDERSPANDING_ACTION.INCREASE_TREASURY: await putMoneyOnPile(dwelling); break;
        case ENUM_UNDERSPANDING_ACTION.NONE: break;
        case ENUM_UNDERSPANDING_ACTION.SEEK_TRADE: await seekTradePartnership(dwelling, world); break;
        case ENUM_UNDERSPANDING_ACTION.START_CONSTRUCTION: await startConstruction(dwelling); break;
        case ENUM_UNDERSPANDING_ACTION.TOURNEY: await tourney(dwelling, world); break;
    }

}

/**
 * executes action based on court over spending
 * @param {object} dwelling 
 * @param {object} world 
 */
const overBudgetAction = async (dwelling, world) => {

    const personality = dwelling.court.ruler.personality
    const advisor = getRandomElementFromArray(dwelling.court.advisors)
    const ongoingProjects = hasOngoingProject(dwelling)
    const advisorResult = consultAdvisor( dwelling.court.ruler, advisor )

    const action = dealWithOverSpending(personality, advisorResult, dwelling, ongoingProjects)
    switch (action) {
        case ENUM_OVERSPENDING_ACTION.ABANDON_CONSTRUCTION: await abandonConstruction(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.DECREASE_DEFENCES: await decreaseDefenses(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.DOWNSIZE_ARMY: await downSizeArmy(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.GO_PLUNDER: await goPlunder(dwelling, world); break;
        case ENUM_OVERSPENDING_ACTION.INCREASE_PRODUCTION: await increaseProduction(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.INCREASE_TAX: await increaseTaxrate(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.MERCHANTS_LOAN: await merchantsLoan(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.NONE: break;
        case ENUM_OVERSPENDING_ACTION.RELIGIOUS_FUNDS: await seekReligiousFunds(dwelling); break;
        case ENUM_OVERSPENDING_ACTION.SEEK_TRADE: await seekTradePartnership(dwelling, world); break;
    }
}

/**
 * SEEK_TRADE action
 * @param {object} dwelling 
 * @param {object} world 
 */
const seekTradePartnership = async (dwelling, world) => {
    const commands = []
    let possibleDwelling = {}
    const NoOfAtempts = getRandomNumberInRange(2, 6)
    for (let i = 0; i < NoOfAtempts; i++) {
        const partner = getRandomElementFromArray(world.dwellings)
        if (partner.id != dwelling.id) {
            if (isEmptyObject(possibleDwelling)) {
                possibleDwelling = partner
            } else {
                const oldDist = Math.abs(dwelling.x - possibleDwelling.x) + Math.abs(dwelling.y - possibleDwelling.y)
                const newDist = Math.abs(dwelling.x - partner.x) + Math.abs(dwelling.y - partner.y)
                if (newDist < oldDist) {
                    possibleDwelling = partner
                }

            }
        }
    }
    if (!isEmptyObject(possibleDwelling)) {
        for (let production of dwelling.production) {
            if (!possibleDwelling.production.some(p => p.type == production.type)) {
                const negotiation = consultAdvisor(dwelling.court.ruler, { character: possibleDwelling.court.ruler })
                if (negotiation != ENUM_PERSONALITY_DEALS_RESULT.BAD) {
                    const dealDwelling = copyObject(objects.dwellingTrade)
                    const dealPartner = copyObject(objects.dwellingTrade)
                    dealDwelling.id = generateID()
                    dealPartner.id = generateID()
                    dealDwelling.dwellingId = dwelling.id
                    dealPartner.dwellingId = possibleDwelling.id
                    dealDwelling.partnerId = possibleDwelling.id
                    dealPartner.partnerId = dwelling.id

                    const tradeValue = getRandomNumberInRange(40, 200) // get tradevalue
                    dealDwelling.value = tradeValue
                    dealPartner.value = tradeValue

                    dwelling.trade.push(dealDwelling)
                    possibleDwelling.trade.push(dealPartner)

                    commands.push({ command: ENUM_COMMANDS.INSERT_TRADE, data: dealDwelling })
                    commands.push({ command: ENUM_COMMANDS.INSERT_TRADE, data: dealPartner  })
                    commands.push({ 
                        command: ENUM_COMMANDS.INSERT_STORY, 
                        data: getStoryEntry(get('story-history-dwelling-trade-partnership-formed', 
                        [ 
                            dwelling.court.ruler.name, 
                            possibleDwelling.court.ruler.name, 
                            dwelling.name, 
                            possibleDwelling.name 
                        ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH }) 
                    })
                    break;
                }
            }
        }
    }
    await executeCommands(commands)
}

const constructionPreferenceToLocation = async (dwelling, preference) => {
    const commands = []
    if (preference.status == ENUM_DWELLING_LOCATION_STATUS.DESTROYED) {
        const location = dwelling.locations.find(l => l.status = preference.status && l.type == preference.type)
        location.status = ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION
        commands.push({ command: ENUM_COMMANDS.UPDATE_DWELLING_LOCATION, data: location })
        commands.push({ command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('story-history-dwelling-construction-repair', [ dwelling.court.ruler.name, location.name, dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH})})
    }
    if (preference.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION) {
        const location =  bLocation.build(dwelling, { type: preference.type, status: ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION })
        dwelling.locations.push(location)
        commands.push({ command: ENUM_COMMANDS.INSERT_DWELLING_LOCATION, data: location })
        commands.push({ command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('story-history-dwelling-construction-begin', [ dwelling.name, dwelling.court.ruler.title, dwelling.court.ruler.name, location.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH})})
    }
}

/**
 * INCREASE_TAX action
 * @param {object} dwelling 
 */
const increaseTaxrate = async (dwelling) => {
    dwelling.taxRate -= getRandomNumberInRange(1,3)
    dwelling.happinessModifyer += getRandomFloatInRange(0.1, 0.3)
    await executeCommands([{
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-tax-increase', [ dwelling.court.ruler.title, dwelling.court.ruler.name, dwelling.name ]), 
        dwelling.id, ENUM_STORY_TYPE.HISTORY, 
        { tag: ENUM_STORY_TAGS.PARAGRAPH })
    }])
}

/**
 * DECREASE_TAX action
 * @param {object} dwelling 
 */
const decreaseTaxrate = async (dwelling) => {
    dwelling.taxRate -= getRandomNumberInRange(1,3)
    dwelling.happinessModifyer += getRandomFloatInRange(0.1, 0.3)
    await executeCommands([{
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-tax-decrease', [ dwelling.court.ruler.title, dwelling.court.ruler.name, dwelling.name ]), 
        dwelling.id, ENUM_STORY_TYPE.HISTORY, 
        { tag: ENUM_STORY_TAGS.PARAGRAPH })
    }])
}

/**
 * DOWNSIZE_ARMY action
 * @param {object} dwelling 
 */
const downSizeArmy = async (dwelling) => {
    const commands = []
    try {
        if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MERCENARIES) != undefined) {
            const mercenaries = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MERCENARIES)
            if (mercenaries.number < 100) {
                commands.push({ command: ENUM_COMMANDS.DELETE_TROOP, data: mercenaries.id })
                dwelling.army.troops = removeElementFromArrayById(mercenaries.id, dwelling.army.troops)
            } else {
                mercenaries.number -= Math.floor((mercenaries.number * 0.01) * 10)
                commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: mercenaries })
            }
        } else {
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.CATAPULTS) != undefined) {
                const catapults = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.CATAPULTS)
                if (catapults.number < 5) {
                    commands.push({ command: ENUM_COMMANDS.DELETE_TROOP, data: catapults.id })
                    dwelling.army.troops = removeElementFromArrayById(catapults.id, dwelling.army.troops)
                } else {
                    catapults.number -= Math.floor((catapults.number * 0.01) * 50)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: catapults })
                }
            }
        
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.KNIGHTS) != undefined && dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.KNIGHTS).length > 4) {
                const knights = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.KNIGHTS)
                if (knights.number < 4) {
                    commands.push({ command: ENUM_COMMANDS.DELETE_TROOP, data: knights.id })
                    dwelling.army.troops = removeElementFromArrayById(knights.id, dwelling.army.troops)
                } else {
                    knights.number -= Math.floor((knights.number * 0.01) * 40)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: knights })
                }
            }
        
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MEN_AT_ARMS) != undefined && dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MEN_AT_ARMS).length > 40) {
                const menAtArms = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MEN_AT_ARMS)
                if (menAtArms.number < 20) {
                    commands.push({ command: ENUM_COMMANDS.DELETE_TROOP, data: menAtArms.id })
                    dwelling.army.troops = removeElementFromArrayById(menAtArms.id, dwelling.army.troops)
                } else {
                    menAtArms.number -= Math.floor((menAtArms.number * 0.01) * 20)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: menAtArms })
                }
            }
        
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.ARCHERS) != undefined) {
                const archers = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.ARCHERS)
                if (archers.number < 20) {
                    commands.push({ command: ENUM_COMMANDS.DELETE_TROOP, data: archers.id })
                    dwelling.army.troops = removeElementFromArrayById(archers.id, dwelling.army.troops)
                } else {
                    archers.number -= Math.floor((archers.number * 0.01) * 30)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: archers })
                }
            }
        
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.INFANTRY) != undefined) {
                const infantry = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.INFANTRY)
                if (infantry.number < 10) {
                    commands.push({ command: ENUM_COMMANDS.DELETE_TROOP, data: infantry.id })
                    dwelling.army.troops = removeElementFromArrayById(infantry.id, dwelling.army.troops)
                } else {
                    infantry.number -= Math.floor((infantry.number * 0.01) * 10)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: infantry })
                }
            }
        }
        await executeCommands([{
            command: ENUM_COMMANDS.INSERT_STORY,
            data: getStoryEntry(get('story-history-dwelling-army-decrease', [ dwelling.name, dwelling.court.ruler.title, dwelling.court.ruler.name ]), 
            dwelling.id, ENUM_STORY_TYPE.HISTORY, 
            { tag: ENUM_STORY_TAGS.PARAGRAPH })
        }])
    }
    catch(e) {
        const err = copyObject(objects.error)
        err.file = __filename
        err.function = 'downSizeArmy'
        err.message = e.message
        logError(err)
    }
    
    await executeCommands(commands)

}

/**
 * INCREASE_MILITARY action
 * @param {object} dwelling 
 */
const upSizeArmy = async (dwelling) => {
    const commands = []
    let hasUpscaled = false
    const disposable = Math.floor( dwelling.citizens * 0.01 )

    try {
        if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MERCENARIES) != undefined) {
            const mercenaries = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MERCENARIES)
            if (disposable < getTroopCost(mercenaries)) {
                mercenaries.number += Math.floor(disposable * 0.1)
                commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: mercenaries })
                hasUpscaled = true
            }
        } else {
            const noOftroop = Math.floor(disposable * 0.2)
            const troop = buildTroop(a.id, ENUM_TROOP_TYPE.MERCENARIES, noOftroop)
            dwelling.army.troops.push(troop)
            commands.push({ command: ENUM_COMMANDS.INSERTTROOP, data: troop })
            hasUpscaled = true
        }
        if (!hasUpscaled) {
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.INFANTRY) != undefined) {
                const troop = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.INFANTRY)
                if (disposable < getTroopCost(troop)) {
                    troop.number += Math.floor(disposable * 0.1)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: troop })
                    hasUpscaled = true
                }
            } else {
                const noOftroop = Math.floor(disposable * 0.3)
                const troop = buildTroop(a.id, ENUM_TROOP_TYPE.INFANTRY, noOftroop)
                dwelling.army.troops.push(troop)
                commands.push({ command: ENUM_COMMANDS.INSERTTROOP, data: troop })
                hasUpscaled = true
            }
        }

        if (!hasUpscaled) {
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.ARCHERS) != undefined) {
                const troop = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.ARCHERS)
                if (disposable < getTroopCost(troop)) {
                    troop.number += Math.floor(disposable * 0.1)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: troop })
                    hasUpscaled = true
                }
            } else {
                const noOftroop = Math.floor(disposable * 0.2)
                const troop = buildTroop(a.id, ENUM_TROOP_TYPE.ARCHERS, noOftroop)
                dwelling.army.troops.push(troop)
                commands.push({ command: ENUM_COMMANDS.INSERTTROOP, data: troop })
                hasUpscaled = true
            }
        }

        if (!hasUpscaled) {
            if (dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MEN_AT_ARMS) != undefined) {
                const troop = dwelling.army.troops.find(t => t.type == ENUM_TROOP_TYPE.MEN_AT_ARMS)
                if (disposable < getTroopCost(troop)) {
                    troop.number += Math.floor(disposable * 0.1)
                    commands.push({ command: ENUM_COMMANDS.UPDATETROOP, data: troop })
                    hasUpscaled = true
                }
            } else {
                const noOftroop = Math.floor(disposable * 0.2)
                const troop = buildTroop(a.id, ENUM_TROOP_TYPE.MEN_AT_ARMS, noOftroop)
                dwelling.army.troops.push(troop)
                commands.push({ command: ENUM_COMMANDS.INSERTTROOP, data: troop })
                hasUpscaled = true
            }
        }

        if (hasUpscaled) {
            await executeCommands(commands)
        }
    } catch (e) {
        const err = copyObject(objects.error)
        err.file = __filename
        err.function = 'upSizeArmy'
        err.message = e.message
        logError(err)
    }
}

/**
 * creates new nobles from dwellings
 * TOURNEY action
 * @param {object} dwelling 
 * @param {object} world 
 */
const tourney = async (dwelling, world) => {
    const commands = []
    const participants = [{ 
        npc: bNPC.build(ENUM_NPC_TYPE.KNIGHT),
        dwelling
    }]
    for (let i = 0; i < getRandomNumberInRange(2,5); i++) {
        const participant = { 
            npc: bNPC.build(ENUM_NPC_TYPE.KNIGHT),
            dwelling: getRandomElementFromArray(world.dwellings)
        }
        participants.push( participant )
    }
    let strParticipants = ''
    participants.forEach(e => {
        strParticipants += `${e.npc.name} of ${e.dwelling.name}, `
    });
    commands.push({
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-tourney-participants', [ dwelling.name, strParticipants ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH })
    })
    const champion1 = getRandomElementFromArray(participants)
    let champion2 = { npc: { id: champion1.npc.id }}
    while (champion1.npc.id == champion2.npc.id) {
        champion2 = getRandomElementFromArray(participants)
    }

    commands.push({
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-tourney-battle', [ `${champion1.npc.name} of ${champion1.dwelling.name}`
        , `${champion2.npc.name} of ${champion2.dwelling.name}` ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH })
    })
    const winner = (chance(50)) ? champion1 : champion2
    commands.push({
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-tourney-winner', [ winner.npc.name, winner.dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH })
    })
    const advisor = bCharacter.build({
        name: winner.npc.name,
        job: ENUM_JOB_NAMES.noble,
        race: getRaceFromDwellingType(winner.dwelling),
        date: world.date,
        asAdvisor: true,
        courtId: winner.dwelling.court.id
    })
    winner.dwelling.court.advisors.push(advisor)
    commands.push({
        command: ENUM_COMMANDS.INSERTCHARACTER,
        data: advisor.character
    },
    {
        command: ENUM_COMMANDS.INSERTADVISOR,
        data: advisor
    })
    await executeCommands(commands)
}

/**
 * RELIGIOUS_FUNDS action
 * @param {object} dwelling 
 */
const seekReligiousFunds = async (dwelling) => {
    const loan = takeLoan(
        dwelling.court.id,
        dwelling.court.rulerId,
        'CHURCH',
        dwelling
    )
    dwelling.court.loans.push(loan)
    await executeCommands([
        { 
            command: ENUM_COMMANDS.INSERT_STORY, 
            data: getStoryEntry(get('story-history-dwelling-loan-religion', [ dwelling.court.ruler.title, dwelling.court.ruler.name, dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH}) 
        }
    ])
}

/**
 * MERCHANTS_LOAN action
 * @param {object} dwelling 
 */
const merchantsLoan = async (dwelling) => {
    const loan = takeLoan(
        dwelling.court.id,
        dwelling.court.rulerId,
        'MERCHANTS',
        dwelling
    )
    dwelling.court.loans.push(loan)
    await executeCommands([
        { 
            command: ENUM_COMMANDS.INSERT_STORY, 
            data: getStoryEntry(get('story-history-dwelling-loan-merchants', [ dwelling.court.ruler.title, dwelling.court.ruler.name, dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH}) 
        }
    ])
}

/**
 * ABANDON_CONSTRUCTION action
 * @param {object} dwelling 
 */
const abandonConstruction = async (dwelling) => {
    for (let location of dwelling.locations) {
        if (location.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION) {
            location.status = ENUM_DWELLING_LOCATION_STATUS.ABANDONED 
            await executeCommands([
                { command: ENUM_COMMANDS.UPDATE_DWELLING_LOCATION, data: location },
                { command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('story-history-dwelling-construction-abandoned', [ dwelling.name, location.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH}) }
            ])
            return
        }
    }
}

/**
 * START_CONSTRUCTION action
 * @param {object} dwelling 
 */
const startConstruction = async (dwelling) => {
    const preference = getConstructionPreference(dwelling.court.ruler.personality, dwelling)
    await constructionPreferenceToLocation(dwelling, preference)
    
}

/**
 * GO_PLUNDER action
 * @param {object} dwelling 
 * @param {object} world 
 */
const goPlunder = async (dwelling, world) => {
    const commands = []
    const target = getDifferentDwelling(world.dwellings)
    const targetPercentage = Math.floor(target.citizens * 0.01)

    let gold = getRandomNumberInRange(targetPercentage * 1, targetPercentage * 3)
    let food = getRandomNumberInRange(targetPercentage * 2, targetPercentage * 6)

    if (target.gold + gold > 0) {
        target.gold -= gold
        dwelling.gold += gold
    } 

    if (target.food + food > 0) {
        target.food -= food
        dwelling.food += food
    }

    commands.push({
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-raid-do', [
            dwelling.court.ruler.title, dwelling.court.ruler.name, dwelling.name, target.name
        ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH })
    })

    commands.push({
        command: ENUM_COMMANDS.INSERT_STORY,
        data: getStoryEntry(get('story-history-dwelling-raid-by', [
            target.name, dwelling.name
        ]), target.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH })
    })
    commands.push({ command: ENUM_COMMANDS.UPDATEDWELLING, data: target })
    await executeCommands(commands)
}

/**
 * DECREASE_DEFENCES action
 * @param {object} dwelling 
 */
const decreaseDefenses = async (dwelling) => {
    let hasDegenerated = false
    if (dwelling.moats != ENUM_DWELLING_CONDITIONS.NONE && ENUM_DWELLING_CONDITIONS.RUINED) {
        dwelling.moats = downgradeCondition(dwelling.moats)
        hasDegenerated = true
    }
    else if (!hasDegenerated && (dwelling.gate != ENUM_DWELLING_CONDITIONS.NONE && ENUM_DWELLING_CONDITIONS.RUINED)){
        dwelling.gate = downgradeCondition(dwelling.gate)
        hasDegenerated = true
    }
    else if (!hasDegenerated && (dwelling.walls != ENUM_DWELLING_CONDITIONS.NONE && ENUM_DWELLING_CONDITIONS.RUINED)){
        dwelling.walls = downgradeCondition(dwelling.walls)
        hasDegenerated = true
    }
    else if (!hasDegenerated && (dwelling.guards != ENUM_DWELLING_CONDITIONS.NONE && ENUM_DWELLING_CONDITIONS.RUINED)){
        dwelling.guards = downgradeCondition(dwelling.guards)
        hasDegenerated = true
    }
    if (hasDegenerated) {
        await executeCommands([{ 
            command: ENUM_COMMANDS.INSERT_STORY, 
            data: getStoryEntry(get('story-history-dwelling-decrease-defences', [ dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH}) 
        }])
    }

}

/**
 * INCREASE_DEFENCES action
 * @param {object} dwelling 
 */
const increaseDefenses = async (dwelling) => {
    let hasStregnthened = false
    if (!hasStregnthened && (dwelling.guards != ENUM_DWELLING_CONDITIONS.PERFECT)){
        dwelling.guards = upgradeCondition(dwelling.guards)
        hasStregnthened = true
    }
    if (!hasStregnthened && (dwelling.walls != ENUM_DWELLING_CONDITIONS.PERFECT)){
        dwelling.walls = upgradeCondition(dwelling.walls)
        hasStregnthened = true
    }
    if (!hasStregnthened && (dwelling.gate != ENUM_DWELLING_CONDITIONS.PERFECT)){
        dwelling.gate = upgradeCondition(dwelling.gate)
        hasStregnthened = true
    }
    if (!hasStregnthened && (dwelling.moats != ENUM_DWELLING_CONDITIONS.PERFECT)){
        dwelling.moats = upgradeCondition(dwelling.moats)
        hasStregnthened = true
    }
    if(hasStregnthened) {
        await executeCommands([{ 
            command: ENUM_COMMANDS.INSERT_STORY, 
            data: getStoryEntry(get('story-history-dwelling-increase-defences', [ dwelling.court.ruler.title, dwelling.court.ruler.name, dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH}) 
        }])
    }
}

/**
 * INCREASE_TREASURY action
 * @param {object} dwelling 
 */
const putMoneyOnPile = async (dwelling) => {
    dwelling.gold += Math.floor(((dwelling.gold * 0.01) * getRandomNumberInRange(1, 3)))
    dwelling.happinessModifyer -= getRandomFloatInRange(0.1, 0.3)
    await executeCommands([{ 
        command: ENUM_COMMANDS.INSERT_STORY, 
        data: getStoryEntry(get('story-history-dwelling-increase-treasury', [ dwelling.court.ruler.title, dwelling.court.ruler.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {tag: ENUM_STORY_TAGS.PARAGRAPH}) 
    }])
}

/**
 * INCREASE_PRODUCTION action
 * @param {object} dwelling 
 * @param {object} world
 */
const increaseProduction = async (dwelling, world) => {
    const commands = []
    let hasIncreasedProduction = false
    const boardersWater = false
    const boardersMountains = false
    const boardersSwamps = false
    const boardersDessert = false
    const boardersForest = false

    // EAST
    if (isPointOnMap(dwelling.x + 1, dwelling.y)) {
        const biome = getBiomeAtPoint(world.map, point2d(dwelling.x + 1, dwelling.y))
        if (isBiome( ENUM_BIOMES.lake, biome )) { boardersWater = true }
        if (isBiome( ENUM_BIOMES.mountains, biome )) { boardersMountains = true }
        if (isBiome( ENUM_BIOMES.swamp, biome )) { boardersSwamps = true }
        if (isBiome( ENUM_BIOMES.dessert, biome )) { boardersDessert = true }
        if (isBiome( ENUM_BIOMES.forest, biome )) { boardersDessert = true }
    }

    // NORTH
    if (isPointOnMap(dwelling.x, dwelling.y - 1)) {
        const biome = getBiomeAtPoint(world.map, point2d(dwelling.x, dwelling.y - 1))
        if (isBiome( ENUM_BIOMES.lake, biome )) { boardersWater = true }
        if (isBiome( ENUM_BIOMES.mountains, biome )) { boardersMountains = true }
        if (isBiome( ENUM_BIOMES.swamp, biome )) { boardersSwamps = true }
        if (isBiome( ENUM_BIOMES.dessert, biome )) { boardersDessert = true }
        if (isBiome( ENUM_BIOMES.forest, biome )) { boardersDessert = true }
    }
    // WEST
    if (isPointOnMap(dwelling.x - 1, dwelling.y)) {
        const biome = getBiomeAtPoint(world.map, point2d(dwelling.x - 1, dwelling.y))
        if (isBiome( ENUM_BIOMES.lake, biome )) { boardersWater = true }
        if (isBiome( ENUM_BIOMES.mountains, biome )) { boardersMountains = true }
        if (isBiome( ENUM_BIOMES.swamp, biome )) { boardersSwamps = true }
        if (isBiome( ENUM_BIOMES.dessert, biome )) { boardersDessert = true }
        if (isBiome( ENUM_BIOMES.forest, biome )) { boardersDessert = true }
    }

    // SOUTH
    if (isPointOnMap(dwelling.x, dwelling.y + 1)) {
        const biome = getBiomeAtPoint(world.map, point2d(dwelling.x, dwelling.y + 1))
        if (isBiome( ENUM_BIOMES.lake, biome )) { boardersWater = true }
        if (isBiome( ENUM_BIOMES.mountains, biome )) { boardersMountains = true }
        if (isBiome( ENUM_BIOMES.swamp, biome )) { boardersSwamps = true }
        if (isBiome( ENUM_BIOMES.dessert, biome )) { boardersDessert = true }
        if (isBiome( ENUM_BIOMES.forest, biome )) { boardersDessert = true }
    }
    let newProduction = {}
    if (!hasIncreasedProduction && boardersWater && dwelling.production.find(p => p.type == ENUM_DWELLING_PRODUCTION_TYPE.FISH) == undefined) {
        newProduction = bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.FISH, dwelling.id)
        hasIncreasedProduction = true
    }
    if (!hasIncreasedProduction && boardersMountains && dwelling.production.find(p => p.type == ENUM_DWELLING_PRODUCTION_TYPE.STONE) == undefined) {
        newProduction = bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.STONE, dwelling.id)
        hasIncreasedProduction = true
    }
    if (!hasIncreasedProduction && boardersMountains && dwelling.production.find(p => p.type == ENUM_DWELLING_PRODUCTION_TYPE.IRON) == undefined) {
        newProduction = bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.IRON, dwelling.id)
        hasIncreasedProduction = true
    }
    if (!hasIncreasedProduction && boardersSwamps && dwelling.production.find(p => p.type == ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS) == undefined) {
        newProduction = bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS, dwelling.id)
        hasIncreasedProduction = true
    }
    if (!hasIncreasedProduction && boardersDessert && dwelling.production.find(p => p.type == ENUM_DWELLING_PRODUCTION_TYPE.SALT) == undefined) {
        newProduction = bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.SALT, dwelling.id)
        hasIncreasedProduction = true
    }
    if (!hasIncreasedProduction && boardersForest && dwelling.production.find(p => p.type == ENUM_DWELLING_PRODUCTION_TYPE.DEER) == undefined) {
        newProduction = bProduction.build(ENUM_DWELLING_PRODUCTION_TYPE.DEER, dwelling.id)
        hasIncreasedProduction = true
    }
    if (!hasIncreasedProduction) {
        const production = getRandomElementFromArray(dwelling.production)
        newProduction = bProduction.build(production.type, dwelling.id)
    }
    if (hasIncreasedProduction) {
        dwelling.production.push(newProduction)
        commands.push({
            command: ENUM_COMMANDS.INSERTPRODUCTION,
            data: newProduction
        },
        {
            command: ENUM_COMMANDS.INSERT_STORY,
            data: getStoryEntry(get('story-history-dwelling-production-increase', [ dwelling.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, { tag: ENUM_STORY_TAGS.PARAGRAPH })
        })
    }

    await executeCommands(commands)
}

const testFinishConstruction = async (dwelling) => {
    const commands = []
    let finishedConstruction = false
    for (let location of dwelling.locations) {
        if (location.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION) {
            if (chance(getRandomNumberInRange(10, 40))) { 
                location.status = ENUM_DWELLING_LOCATION_STATUS.ACTIVE 
                finishedConstruction = true
                commands.push({ command: ENUM_COMMANDS.UPDATE_DWELLING_LOCATION, data: copyObject(location) })
                commands.push({ command: ENUM_COMMANDS.INSERT_STORY, data: getStoryEntry(get('story-history-dwelling-construction-finished', [ dwelling.name, location.name ]), dwelling.id, ENUM_STORY_TYPE.HISTORY, {}) })

            }
        }
    }
    await executeCommands(commands)
    return finishedConstruction
}

/**
 * take a loan
 * @param {string} courtId 
 * @param {string} rulerId 
 * @param {string} from 
 * @param {object} dwelling 
 * @returns 
 */
 const takeLoan = (courtId, rulerId, from, dwelling) => {
    const l = copyObject(objects.loan)
    l.id = generateID()
    l.courtId = courtId
    l.rulerId = rulerId
    l.amount = Math.floor( (dwelling.citizens * 0.01) * 10 )
    l.from = from
    return l
}

/**
 * pay off loan
 * @param {object} dwelling 
 * @param {object} loan 
 * @returns {integer}
 */
 const payLoans = (dwelling, loan) => {
    const interest = Math.floor(loan.amount * 0.01) + 1
    const toBePayed = Math.floor(loan.amount * 0.2) + interest
    return toBePayed
}

const incomeFromProduction = (dwelling) => {
    let income = 0
    for (let p of dwelling.production) {
        switch (p.type) {
            case ENUM_DWELLING_PRODUCTION_TYPE.ADAMANTINE: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(46, 68); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.CRYSTAL: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(8, 16); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.GEMS: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(24, 35); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.GOLD: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(16, 27); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.IRON: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(6, 10); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.SALT: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(13, 17); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.STONE: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(3, 5); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.WOOD: income += (dwelling.citizens * 0.01) * getRandomNumberInRange(2, 4); break;
        }
    }
    return income
}

const foodFromProduction = (dwelling) => {
    let food = 0
    for (let p of dwelling.production) {
        switch (p.type) {
            case ENUM_DWELLING_PRODUCTION_TYPE.CATTLE: food += (dwelling.citizens * 0.01) * getRandomNumberInRange(15, 40); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.DEER: food += (dwelling.citizens * 0.01) * getRandomNumberInRange(5, 25); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.FISH: food += (dwelling.citizens * 0.01) * getRandomNumberInRange(15, 35); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.MUSHROOMS: food += (dwelling.citizens * 0.01) * getRandomNumberInRange(40, 60); break;
            case ENUM_DWELLING_PRODUCTION_TYPE.WHEAT: food += (dwelling.citizens * 0.01) * getRandomNumberInRange(60, 70); break;
        }
    }
    return Math.floor(food)
}

module.exports = {
    incomeFromProduction,
    foodFromProduction,
    takeLoan,
    payLoans,
    getTitleByDwellingSize,
    replaceAdvisors,
    replaceRuler,
    consultAdvisor,
    upgradeCondition,
    downgradeCondition,
    dwellingQualityMultiplyer,
    getGuardHappinessModifyer,
    underBudgetAction,
    overBudgetAction,
    testFinishConstruction,
    locationIncomeFromLocation,
    locationCostFromCorruption
}
