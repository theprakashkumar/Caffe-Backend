const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: "Product's Name is Required",
    },
    description: {
        type: String,
        required: "Product's Description is Required",
    },
    image: {
        type: String,
        required: "Product's Image is Required",
    },
    category: {
        type: String,
        required: "Product's Category is Required",
    },
    price: {
        type: Number,
        required: "Product's Price is Required",
    },
    mrp: {
        type: Number,
        required: "Product's Price is Required",
    },
    discount: {
        type: String,
        default: "0%",
    },
    rating: {
        type: Number,
        required: "Product's Rating is Required",
    },
    ratings: Number,
    reviews: Number,
    inStock: {
        type: Boolean,
        required: "Product's Stock Status is Required",
    },
    fastDelivery: {
        type: Boolean,
        default: false,
    },
    tastingNodes: String,
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
