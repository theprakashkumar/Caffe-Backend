const Wishlist = require("../models/wishlist");

const getWishlist = async (req, res) => {
    try {
        const wishlist = req.wishlist;
        res.status(200).json({
            success: true,
            wishlist,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Accessing Wishlist!",
            errorMessage: err.message,
        });
    }
};

const addItemToWishlist = async (req, res) => {
    try {
        let wishlist = req.wishlist;
        const product = req.body;
        wishlist.wishlistItems.push({
            product: product._id,
        });
        const updatedWishlist = await wishlist.save();
        res.status(200).json({
            success: true,
            updatedWishlist,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Adding Item to Wishlist!",
            errorMessage: err.message,
        });
    }
};

const removeItemFromWishlist = async (req, res) => {
    try {
        let wishlist = req.wishlist;
        const product = req.body;

        wishlist.wishlistItems = wishlist.wishlistItems.filter((item) => {
            return item.product.id !== product._id;
        });
        const updatedWishlist = await wishlist.save();
        res.status(200).json({
            success: true,
            updatedWishlist,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Removing Item From Wishlist!",
            errorMessage: err.message,
        });
    }
};

const moveItemToCart = async (req, res) => {
    try {
        let wishlist = req.wishlist;
        let cart = req.cart;
        const product = req.body;

        const itemAlreadyInCart = cart.cartItems.find(
            (item) => item.product._id.toString() === product._id
        );

        if (itemAlreadyInCart) {
            wishlist.wishlistItems = wishlist.wishlistItems.filter(
                (item) => item.product._id.toString() !== product._id
            );
        } else {
            cart.cartItems.push({
                product: product._id,
            });
            wishlist.wishlistItems = wishlist.wishlistItems.filter(
                (item) => item.product._id.toString() !== product._id
            );
        }

        const updatedCart = await cart.save();
        const updatedWishlist = await wishlist.save();

        res.status(200).json({
            success: true,
            updatedCart,
            updatedWishlist,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message:
                "Something Went Wrong While Moving Item From Wishlist to Cart!",
            errorMessage: err.message,
        });
    }
};

module.exports = {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishlist,
    moveItemToCart,
};
