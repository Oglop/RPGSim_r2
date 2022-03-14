const { 
    ENUM_DWELLINGS,
    ENUM_RACE_NAMES
} = require('../generic/enums')

const getRaceFromDwellingType = (dwelling) => {
    switch( dwelling.type ) {
        case ENUM_DWELLINGS.DARK_ELF: return ENUM_RACE_NAMES.darkElf;
        case ENUM_DWELLINGS.DWARF: return ENUM_RACE_NAMES.dwarf;
        case ENUM_DWELLINGS.HALFLING: return ENUM_RACE_NAMES.halfling;
        case ENUM_DWELLINGS.HIGH_ELF: return ENUM_RACE_NAMES.highElf;
        case ENUM_DWELLINGS.HUMAN: return ENUM_RACE_NAMES.human;
        case ENUM_DWELLINGS.WOOD_ELF: return ENUM_RACE_NAMES.woodElf;
    }
}

module.exports = {
    getRaceFromDwellingType
}