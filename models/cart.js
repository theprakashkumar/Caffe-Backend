const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
