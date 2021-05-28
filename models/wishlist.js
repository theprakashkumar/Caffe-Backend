const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Product = require("./product");

const WishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    WishlistItems: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;