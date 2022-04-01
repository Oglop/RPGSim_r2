const { DatabaseContext } = require('../connections')
module.exports.migrate = async () => {
    try {
        await DatabaseContext.connect()
        await DatabaseContext.db.migrate()
    }catch(e) {
        console.log(e.message)
    }
}