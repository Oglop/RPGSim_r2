

/**
 * Check if skill exists in two array of skill
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @param {string} skill
 * @returns {bool} 
 */
const checkMatchingSkills = (arr1, arr2, skill) => {
    const t1 = arr1.find(s => s.name === skill)
    const t2 = arr2.find(s => s.name === skill)
    if (t1.name === t2.name && t2.name === skill) {
        return true
    }
    return false
}