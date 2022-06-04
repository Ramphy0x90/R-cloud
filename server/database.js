const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')

class Database {
    static init() {
        mongoose.connect(dbConfig.url).then(() => {
            console.log('DB up');
        }).catch(err => {
            console.log(`DB error ${err}`);
        })
    }
}

module.exports = Database;