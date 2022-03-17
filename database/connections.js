const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const { databasePath } = require('../config')

class DatabaseContext {
    static db;
    static async connect() {
        this.db = await open({
            filename: databasePath,
            driver: sqlite3.Database,
        })
    }
    static async close() {
        await this.db.close()
    }
}

module.exports = {
    DatabaseContext
}
