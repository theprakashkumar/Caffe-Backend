const Product = require("../models/product");
const User = require("../models/user");

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
        });
    }
};

const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Couldn't Get the User With the Given Id",
            });
        }
        req.user = user;
        next();
    } catch (err) {
        res.json({
            success: false,
            message: "Couldn't Fetch the User Data",
        });
    }
};

module.exports = {
    getProductById,
    getUserById,
};
