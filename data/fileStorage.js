const { ENUM_FILE_TYPE } = require('../generic/enums')
const { MissingParameterError } = require('../exceptions')
const { fileStorage } = require('../config')
const fs = require('fs');
const { config } = require('process');

/**
 * return sub catalouge based on file type
 * @param {ENUM_FILE_TYPE} fileType 
 * @returns string
 */
const getCatalougeByFileType = fileType => {
    switch (fileType) {
        case ENUM_FILE_TYPE.WORLD: return 'world'
    }
    return ''
}
/**
 * Create directory if it does not exist
 * @param {string} directory 
 */
const checkAndCreateDirectory = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
    }
}

/**
 * 
 * @param {Object} data 
 * @param {Object} args { 
 * type: ENUM_FILE_TYPE 
 * id: string
 * }
 */
module.exports.save = (data, args) => {
    try {
        // If data is an object turn into string
        if (data instanceof Object) {
            data = JSON.stringify(data)
        }
        // Get required arguments
        let id = (args.id) ? args.id : ''
        let fileType = (args.fileType) ? args.fileType : ENUM_FILE_TYPE.NONE

        // Throw missing arguments
        if (id === '') { throw new MissingParameterError(`id`) }
        if (fileType === ENUM_FILE_TYPE.NONE) { throw new MissingParameterError(`fileType`) }

        checkAndCreateDirectory(`${fileStorage}\\${getCatalougeByFileType(fileType)}\\`)
        const fileName = `${fileStorage}\\${getCatalougeByFileType(fileType)}\\${id}.json`
        fs.writeFileSync(fileName, data)
    } catch (e) {
        if (e instanceof MissingParameterError) {
            console.log(`Required argument ${e.data.error} missing.`)
        }
        console.log(e.message)
    }
} 

module.exports.load = (args) => {

}