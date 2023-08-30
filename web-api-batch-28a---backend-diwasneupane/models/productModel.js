const mongoose = require("mongoose");
const product = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_sku: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number

    },
    product_category: {
        type: String

    },
    product_image: {
        type: String
    },
})

module.exports = mongoose.model('product', product);