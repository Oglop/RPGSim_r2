const objects = require("../generic/objects")

const copyObject = (o, generateId = false) => {
    if (generateId) { o = { ...o, id: generateID() } }
    return JSON.parse(JSON.stringify(o))
}

const copyArray = arr => {
    return [...arr]
}

const echo = s => {
    console.log(s)
}

const getPercetage = (total, part) => {
    return Math.floor((part / total) * 100)
}

/**
 * enter value between 0 and 100
 * @param {int} test
 * @returns bool 
 */
const chance = test => {
    const x = Math.floor(Math.random() * 100)
    if (test > x) { return true }
    return false
}

const point2d = (x, y) => {
    const o = copyObject(objects.point)
    o.x = x
    o.y = y
    return o
}

const isPoint2dInArray = (points, point2d) => {
    if (points.find(p => p.x == point2d.x && p.y == point2d.y) != undefined) {
        return true
    }
    return false
}

/**
 * returns true if first caracter is vowel
 * @param {string} c 
 * @returns bool
 */
const isVowel = (c) => {
    if (c == undefined) { return false }
    if (c.length > 1) {
        c = c.substring(0, 1)
    }
	return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}

const generateID = () => {
    const stamp = new Date().getTime().toString()
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < 4; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${stamp}-${result}`;
 }

 /**
 *  returns random item from array
 * @param {Array} col 
 * @returns {Any} item
 */
 const getRandomElementFromArray = col => {
    const i = Math.floor(Math.random() * col.length)
    return col[i]
}

/**
 * Returns all instances where obj.id === id
 * 
 * @param {Array} arr 
 * @param {String} id 
 * @returns {}
 */
const findAllById = (arr, id) => {
    const result = []
    for(key of arr) { if(key.id === id) { result.push(key.id)}}
    return result
}

/**
 * Returns all instances where obj.id === id
 * 
 * @param {Array} arr 
 * @param {String} id 
 * @returns {}
 */
 const countById = (arr, id) => {
    const result = []
    for(key of arr) { if(key.id === id) { result.push(key.id)}}
    return result.length
}
  

const jsonToArray = obj => {
    const arr = []
    for(var i in obj) {
        arr.push(obj[i])
    }
    return arr
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * returns random integer between 0 and i
 * @param {Number} i 
 * @returns {int: Number}
 */
const getRandomNumber = i => {
    return Math.floor(1 + Math.random() * i)
}

const getRandomNumberInRange = (from, to) => {
    let i = from
    let j = to
    if (from > to) {
        i = to
        j = from
    }
    let k = j + 1 - i
    return Math.floor(i + Math.random() * k)
}

const getRandomFloatInRange = (min, max) => {
    const str = (Math.random() * (max - min) + min).toFixed(1);
    return parseFloat(str);
  }

const getObjectByIDInArray = (arr, id) => {
    const x = arr.find(a => a.ID === id)
    return x
}

const getObjectByidInArray = (arr, id) => {
    const x = arr.find(a => a.id === id)
    return x
}

const removeElementFromArrayById = (id, arr) => {
    return arr.filter(item => item.id !== id)
}

/**
 * return position in array of object with id = 'x'
 * returns -1 if not found
 * 
 * @param {Array} arr 
 * @param {string} id 
 * @returns {Int} index 
 */
const getIndexOfObjectInArrayById = (arr, id) => {
	for (let i = 0; i < arr.length; i++) {
  	if (arr[i].id == id) { return i }
  }
  return -1
}

const getAmountByPercentage = (total, percentage) => {
    return Math.floor((percentage / 100) * total)
}

const shuffleArray = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

const boolToInt = (value) => {
    return (value) ? 1 : 0
}

const intToBool = (value) => {
    return (value == 1) ? true : false
}

const isEmptyObject = (obj) => {
	return JSON.stringify(obj) === JSON.stringify({});
}

// const a = pipe(upper, lower)('Hello')
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const objectToString = o => {
	if (o == undefined) { return '' }
  return JSON.stringify(o)
}

const stringToObject = s => {
	if (s == '') { return {} }
  return JSON.parse(s)
}

module.exports = {
    boolToInt,
    intToBool,
    copyObject, 
    copyArray, 
    echo, 
    getPercetage, 
    generateID, 
    getRandomElementFromArray,
    getRandomNumber,
    getRandomNumberInRange,
    jsonToArray,
    shuffleArray,
    getAmountByPercentage,
    getObjectByIDInArray,
    getObjectByidInArray,
    chance,
    capitalizeFirstLetter,
    getIndexOfObjectInArrayById,
    findAllById,
    countById,
    point2d,
    isVowel,
    isPoint2dInArray,
    isEmptyObject,
    getRandomFloatInRange,
    removeElementFromArrayById,
    pipe,
    objectToString,
    stringToObject
}