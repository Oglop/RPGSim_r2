
const { language } = require('../config')
const en = require('./en')

/**
 * id in format
 * module-function-number
 * 
 * @param {string} id 
 * @param {Array} args 
 */
module.exports.get = (id, args) => {
    console.log(language)
    let lang = ''
    switch (language) {
        case 'en': lang = en; break;
        default: lang = en; break;
    }
    return lang.get(id, args)
}
