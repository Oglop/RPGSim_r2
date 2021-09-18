const copyObject = (o) => {
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

const generateID = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const getRandomElementFromArray = col => {
    const i = Math.floor(Math.random() * col.length)
    return col[i]
}

const jsonToArray = obj => {
    const arr = []
    for(var i in obj) {
        arr.push(obj[i])
    }
    return arr
}

const getRandomNumber = i => {
    return Math.floor(1 + Math.random() * i)
}

const getRandomNumberInRange = (from, to) => {
    return Math.floor( from + Math.random() * to)
}

const getObjectByIDInArray = (arr, id) => {
    const x = arr.find(a => a.ID === id)
    return x
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

module.exports = {
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
    getObjectByIDInArray
}