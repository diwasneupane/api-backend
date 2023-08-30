const mongoose = require("mongoose");
const staff = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
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
        type: String
    }
})

module.exports = mongoose.model('staff', staff);