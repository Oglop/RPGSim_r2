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
    ENUM_OVERSPENDING_ACTION
} = require('../generic/enums')
const { 
    chance,
    copyObject, 
    getRandomNumberInRange, 
    getRandomElementFromArray, 
    generateID,
    isEmptyObject
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

// STANDARD IMPORTS

const {
    executeCommands
} = require('../persistance/commandQueue')


const { getCharacterById, getCourtByDwellingId } = require('../persistance').queries
const { tryToUnderstandEachOther } = require('./language')
const { personalityDealsWith, compabilityCheck, getChanceOfDowngrade, dealWithUnderSpending, dealWithOverSpending } = require('./personality')
const m = require('../models/court')
const { getRandomReligion } = require('../generic/religions')
const { getAgeSimple } = require('../lib/time')
const { hasOngoingProject } = require('./dwelling')
const { noOfAdventuringParties } = require('../config')

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
        const err = objects.error
        err.file = __filename
        err.function = 'consultAdvisor'
        err.message = e.message
        logError(err)
    }
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
                const negotiation = consultAdvisor(dwelling.court.ruler, possibleDwelling.court.ruler)
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
                    dwelling.trade.push(dealPartner)

                    await executeCommands([
                        { command: ENUM_COMMANDS.INSERT_TRADE, data: dealDwelling },
                        { command: ENUM_COMMANDS.INSERT_TRADE, data: dealPartner  }
                    ])

                }
            }
        }
    }
}

/**
 * INCREASE_TAX action
 * @param {object} dwelling 
 */
const increaseTaxrate = async (dwelling) => {
    dwelling.taxRate += getRandomNumberInRange(1,3)
}

/**
 * DECREASE_TAX action
 * @param {object} dwelling 
 */
const decreaseTaxrate = async (dwelling) => {
    dwelling.taxRate -= getRandomNumberInRange(1,3)
}

/**
 * DOWNSIZE_ARMY action
 * @param {object} dwelling 
 */
const downSizeArmy = async (dwelling) => {
    
}

/**
 * INCREASE_MILITARY action
 * @param {object} dwelling 
 */
const upSizeArmy = async (dwelling) => {

}

/**
 * creates new nobles from dwellings
 * TOURNEY action
 * @param {object} dwelling 
 * @param {object} world 
 */
const tourney = async (dwelling, world) => {

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
                { command: ENUM_COMMANDS.UPDATE_DWELLING_LOCATION, data: location }
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
    
}

/**
 * GO_PLUNDER action
 * @param {object} dwelling 
 * @param {object} world 
 */
const goPlunder = async (dwelling, world) => {

}

/**
 * DECREASE_DEFENCES action
 * @param {object} dwelling 
 */
const decreaseDefenses = async (dwelling) => {
    
}

/**
 * INCREASE_DEFENCES action
 * @param {object} dwelling 
 */
const increaseDefenses = async (dwelling) => {

}

/**
 * INCREASE_TREASURY action
 * @param {object} dwelling 
 */
const putMoneyOnPile = async (dwelling) => {

}

/**
 * INCREASE_PRODUCTION action
 * @param {object} dwelling 
 * @param {object} world
 */
const increaseProduction = async (dwelling, world) => {

}

const testFinishConstruction = (dwelling) => {
    let finishedConstruction = false
    for (let location of dwelling.locations) {
        if (location.status == ENUM_DWELLING_LOCATION_STATUS.UNDER_CONSTRUCTION) {
            if (chance(getRandomNumberInRange(10, 40))) { 
                location.status = ENUM_DWELLING_LOCATION_STATUS.ACTIVE 
                finishedConstruction = true
            }
        }
    }
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
    testFinishConstruction
}
