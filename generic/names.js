const {
    getRandomElementFromArray,
    shuffleArray,
    chance
} = require('../lib/utils')
const { ENUM_GENDER } = require('../generic/enums')

const firstFamilyNames = [
    'Day',
    'Night',
    'Winter',
    'Summer',
    'Shining',
    'Golden',
    'Silver',
    'Dwarf',
    'Giant',
    'Blood',
    'Stone',
    'Oak',
    'Flower',
    'Bronze',
    'White',
    'Red',
    'Black',
    'Blue',
    'Green',
    'Crossed'
]

const lastFamilyNames = [
    'horse',
    'swan',
    'star',
    'tree',
    'moon',
    'sun',
    'runes',
    'castle',
    'sword',
    'griffin',
    'dragon',
    'mountain',
    'shield',
    'axe',
    'brigde',
    'lake',
    'river'
]

const firstMaleNames = [
    'Joto',
    'Arn',
    'Anno',
    'Boloz',
    'Brokolz',
    'Cez',
    'Corva',
    'Dolom',
    'Dianolmo',
    'Erku',
    'Evolok',
    'Fraz',
    'Frolko',
    'Grobd',
    'Grumni',
    'Horm',
    'Honno',
    'Irko',
    'Ittlon',
    'Jun',
    'Jaz',
    'Kraq',
    'Kaz',
    'Lemo',
    'Loodron',
    'Morno',
    'Merion',
    'Nilionu',
    'Nikoz',
    'Opolon',
    'Odrof',
    'Prez',
    'Pazzender',
    'Qoplox',
    'Rhuv',
    'Rez',
    'Stefono',
    'Soknow',
    'Troxoz',
    'Tavandor',
    'Uvo',
    'Unnoino',
    'Watra',

]

const firstFemaleNames = [
    'Evalyn',
    'Annri',
    'Aniriana',
    'Beatrix',
    'Biona',
    'Cecona',
    'Corni',
    'Deana',
    'Deimi',
    'Enni',
    'Fargi',
    'Fionaciosi',
    'Giovania',
    'Hurno',
    'Ianoia',
    'Ivia',
    'Jonnovia',
    'Jessi',
    'Kanniloix',
    'Konolo',
    'Lionnia',
    'Leovania',
    'Magdania',
    'Marianna',
    'Nyi',
    'Noanna',
    'Ornafolix',
    'Omnioa',
    'Pernialolla',
    'Pazzlia',
    'Querniz',
    'Ronnjo',
    'Riunozkia',
    'Sefilioa',
    'Sonjia',
]

const regionNames = [
    'Terria',
    'Borios',
    'Genos',
    'Nocio',
    'Tresia',
    'Fandios',
    'Eagos',
    'Aenos',
    'Borolia',
    'Ciados',
    'Delemos',
    'Eaonos',
    'Fagria',
    'Gronos',
    'Galion',
    'Hera',
    'Helios',
    'Iaon',
    'Iktos',
    'Junos',
    'Kriaos',
    'Knossos',
    'Lua',
    'Omios',
    'Ourto',
    'Minos',
    'Manossos',
    'Nio',
    'Nakdriss',
    'Piato',
    'Petra',
    'Rito',
    'Rassdos',
    'Spheros',
    'Siattro',
    'Tressios',
    'Tuno'
]

const dwellingNamePrefixes = [
    'High',
    'East',
    'West',
    'North',
    'South',
    'Low'
]

const dwellingNames = [
    'Aronden',
    'Annolin',
    'Benndros',
    'Bronnid',
    'Ciriandon',
    'Cynnos',
    'Dibronnon',
    'Diolis',
    'Elios',
    'Eranios',
    'Famion',
    'Forios',
    'Gallion',
    'Girionden',
    'Holoios',
    'Hirkos',
    'Illios',
    'Irvandon',
    'Kroas',
    'Kruvinden',
    'Lamian',
    'Larkornoch',
    'Mandos',
    'Morfarlian',
    'Nian',
    'Nirochlias',
    'Orio',
    'Onteroch',
    'Perion',
    'Puntorlo',
    'Rindolias',
    'Ross',
    'Sindas',
    'Sumforos',
    'Torfon',
    'Tenhelia',
    'Urhus',
    'Uvion'

]

/**
 * returns a persons name
 */
const getPersonName = sex => {
    if (sex === ENUM_GENDER.FEMALE) {
        return getRandomElementFromArray(firstFemaleNames)
    } else {
        return getRandomElementFromArray(firstMaleNames)
    }
}
/**
 * returns a family name
 */
const getFamilyName = () => {
    const f = getRandomElementFromArray(firstFamilyNames)
    const l = getRandomElementFromArray(lastFamilyNames)
    return `${f} ${l}`
}
/**
 * returns randomized positions 0 to i as array
 * @param {Integer} i 
 */
const getRegionNameArr = i => {
    const arr = shuffleArray(regionNames)
    return arr.slice(0, i)
    
}

const getDwellingName = () => {
    if (chance(30)) {
        return `${getRandomElementFromArray(dwellingNamePrefixes)} ${getRandomElementFromArray(dwellingNames)}`
    }
    return getRandomElementFromArray(dwellingNames)
}

module.exports = {
    getPersonName, getFamilyName, getRegionNameArr, getDwellingName
}