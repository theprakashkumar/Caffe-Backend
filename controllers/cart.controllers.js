const Cart = require("../models/cart");
const { extend } = require("lodash");

const getCart = async (req, res) => {
    try {
        const cart = await req.cart;
        res.status(200).json({
            success: true,
            cart,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Accessing User's Cart",
            errorMessage: err.message,
        });
    }
};

const addItemToCart = async (req, res) => {
    let cart = req.cart;
    const product = req.body;

    cart.cartItems.push({
        product: product._id,
    });

    try {
        const updatedCart = await cart.save();
        res.status(200).json({
            success: true,
            updatedCart,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Adding Item to Cart",
            errorMessage: err.message,
        });
    }
};

const updateCart = async (req, res) => {
    let cart = req.cart;
    const productUpdates = req.body;

    // console.log(typeof(cart.cartItems[0].product));
    // console.log(typeof(productUpdates._id));

    cart.cartItems.map((item) => {
        // ! HAVE TO CONVERT INTO STRING
        if (item.product.toString() === productUpdates._id) {
            console.log("true");
            return extend(item, { quantity: productUpdates.quantity });
        }
    });

    try {
        const updatedCart = await cart.save();
        res.status(200).json({
            success: true,
            updatedCart,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Updating Cart",
            errorMessage: err.message,
        });
    }
};

const removeItemFromCart = async (req, res) => {
    let cart = req.cart;
    const product = req.body;

    cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== product._id
    );
    try {
        const updatedCart = await cart.save();
        res.status(200).json({
            success: true,
            updatedCart,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Deleting Item From Cart",
            errorMessage: err.message,
        });
    }
};

module.exports = {
    getCart,
    addItemToCart,
    updateCart,
    removeItemFromCart,
};
