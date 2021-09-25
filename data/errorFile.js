// const fs = require('fs')

const logError = async (error) => {
    if (error instanceof Object) {
        error.date = new Date().toISOString()
    }
    // TODO
    console.log(JSON.stringify(error))
}

module.exports = {
    logError
}