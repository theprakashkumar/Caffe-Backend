const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");

const getProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Couldn't Get the Product With the Given Id",
            });
        }
        req.product = product;
        next();
    } catch (err) {
        res.json({
            success: false,
            message: "Couldn't Fetch the Product Data",
            errorMessage: err.message,
        });
    }
};

const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(500).json({
                success: false,
                message: "Couldn't Get the User With the Given Id",
                errorMessage: err.message,
            });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldn't Fetch the User Data",
            errorMessage: err.message,
        });
    }
};

const getOrCreateCartByUserId = async (req, res, next, id) => {
    try {
        // try to find the cart
        let cart = await Cart.findOne({ user: id });
        // if cart not found the create one;
        if (!cart) {
            newCart = new Cart({ user: id, product: [] });
            cart = await newCart.save();
        }
        req.cart = cart;
        next();
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Accessing or Creating Cart!",
            errorMessage: err.message,
        });
    }
};

const getOrCreateWishlistByUserId = async (req, res, next, id) => {
    try {
        let wishlist = await Wishlist.findOne({ user: id });
        if (!wishlist) {
            newWishlist = new Wishlist({ user: id, product: [] });
            wishlist = await newWishlist.save();
        }
        req.wishlist = wishlist;
        next();
    } catch (err) {
        res.status(400).json({
            success: false,
            message:
                "Something Went Wrong While Accessing or Creating Wishlist!",
            errorMessage: err.message,
        });
    }
};

module.exports = {
    getProductById,
    getUserById,
    getOrCreateCartByUserId,
    getOrCreateWishlistByUserId,
};
