const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    userName: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);