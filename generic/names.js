const { getElfWord } = require('../lib/language')
const {
    getRandomElementFromArray,
    chance
} = require('../lib/utils')
const { ENUM_GENDER, ENUM_BIOME_DESCRIPTIONS, ENUM_BIOMES } = require('../generic/enums')

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
    'Shining',
    'Round',
    'Diamond',
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
    'spear',
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
    'Elda',
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
    'Low',
    'Upper',
    'Grand'
]

const dwellingNamePostFixes = [
    'burg',
    'heim',
    'rock',
    'river',
    'borg'
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
    'Qurio',
    'Qazad',
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
    'Tuno',
    'Turi',
    'Modran'

]

const landmarkDescrptions = [
    'finger',
    'silent',
    'troll',
    'shadow',
    'broken',
    'head',
    'lost',
    'great',
    'golden',
    'three',
    'twin',
    'father',
    'snowy',
    'hidden',
    'dead',
    'spider',
    'sunny',
    'moon',
]


/**
 * return name of landmark based on bioms
 * @param {ENUM_BIOMES} biome 
 */
const getLandmarkName = (biome) => {
    const elfWord = getElfWord()
    const landWord = getRandomElementFromArray(landmarkDescrptions)
    let biomeWord = ''
    switch (biome) {
        case ENUM_BIOMES.badlands: biomeWord = ENUM_BIOME_DESCRIPTIONS.badlands; break;
        case ENUM_BIOMES.dessert: biomeWord = ENUM_BIOME_DESCRIPTIONS.dessert; break;
        case ENUM_BIOMES.farmlands: biomeWord = ENUM_BIOME_DESCRIPTIONS.plains; break;
        case ENUM_BIOMES.forest: biomeWord = ENUM_BIOME_DESCRIPTIONS.forest; break;
        case ENUM_BIOMES.hills: biomeWord = ENUM_BIOME_DESCRIPTIONS.hills; break;
        case ENUM_BIOMES.lake: biomeWord = ENUM_BIOME_DESCRIPTIONS.lake; break;
        case ENUM_BIOMES.mountains: biomeWord = ENUM_BIOME_DESCRIPTIONS.mountains; break;
        case ENUM_BIOMES.plains: biomeWord = ENUM_BIOME_DESCRIPTIONS.plains; break;
        case ENUM_BIOMES.swamp: biomeWord = ENUM_BIOME_DESCRIPTIONS.swamp; break;
    }
    return `${elfWord}, the ${landWord} ${biomeWord}`
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
    return `${f}${l}`
}

const getDwellingName = () => {
    if (chance(30)) {
        return `${getRandomElementFromArray(dwellingNamePrefixes)} ${getRandomElementFromArray(dwellingNames)}`
    }
    return getRandomElementFromArray(dwellingNames)
}

const getVileNames = () => {
    const names = [
        'Ashtrok',
        'Akkru',
        'Brrok',
        'Bakku',
        'Chruz',
        'Chraz',
        'Drok',
        'Drekk',
        'Ekklo'
    ]
    return getRandomElementFromArray(names)

}

module.exports = {
    getPersonName, getFamilyName, getDwellingName, getLandmarkName, getVileNames
}