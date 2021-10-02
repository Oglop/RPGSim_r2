

/**
 * 
 * 
 * @param {Object} char1 
 * @param {Object} char2 
 * @returns {boolean}
 */
 const validateCharacterCompabilityForMarige = (char1, char2) => {
    if (char1.race != char2.race) { return false }
    if (char1.gender == char2.gender) { return false }
    if (Math.abs(char1.age - char2.age) > 10) { return false }
    if (char1.age < 16 || char2.age < 16) { return false }
    if (char1.marriedTo || char2.marriedTo) { return false }
    if (char1.mother == char2.mother || char1.father == char2.father) { return false }
    return true
}


module.exports = {
    validateCharacterCompabilityForMarige
}