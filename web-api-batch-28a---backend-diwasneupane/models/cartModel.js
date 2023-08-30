const mongoose = require("mongoose");

const Cart = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
    },
    cart_quantity: {
        type: Number,
    },
});

module.exports = mongoose.model("Cart", Cart);