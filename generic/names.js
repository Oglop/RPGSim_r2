const {
    getRandomElementFromArray,
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
    'Crossed',
    'Yellow',
    'Red',
    'Green',
    'Dark',
    'Bright',
    'Bloody',
    'Singing',
    'Riding',
    'Blessed',
    'Oaken'
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
    'river',
    'bridge',
    'axes',
    'lance',
    'giants',
    'claw',
    'crown',
    'helmet',
    'flower',
    'rainbow',
    'tower',
    'feather',
    'tree',
    'flower',
    'hart',
    'gate'
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
    'Uvion',
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

const landmarks = {
    mountains: [
        'The fingers',
        'Broken peak',
        'Shadow hills',
        'The needle mountais',
        'Stone head mountains'
    ],
    lakes: [
        'Troll lake',
        'The sisters',
        'The lost river',
        'Southern great lake'
    ],
    forests: [
        'silent woods',
        'golden forest',
        'forest of night',
        'shadow hills',
        'great oaks'
    ]
}


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

const getDwellingName = () => {
    if (chance(30)) {
        return `${getRandomElementFromArray(dwellingNamePrefixes)} ${getRandomElementFromArray(dwellingNames)}`
    }
    return getRandomElementFromArray(dwellingNames)
}

module.exports = {
    getPersonName, getFamilyName, getDwellingName
}