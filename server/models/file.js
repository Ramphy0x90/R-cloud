const mongoose = require('mongoose')
const Schema = mongoose.Schema

let File = new Schema({
    name: {
        type: String
    },
    format: {
        type: String
    },
    containerPath: {
        type: String
    }
});

module.exports = mongoose.model('File', File);