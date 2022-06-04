const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Folder = new Schema({
    name: {
        type: String
    },
    path: {
        type: String
    },
    isPrivate: {
        type: Boolean
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Folder', Folder);