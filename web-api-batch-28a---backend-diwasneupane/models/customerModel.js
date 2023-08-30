const mongoose = require('mongoose')

const customer = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true

    },
    address: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
    }
})
module.exports = mongoose.model('customer', customer);