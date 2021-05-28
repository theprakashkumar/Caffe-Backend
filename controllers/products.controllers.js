const Product = require("../models/product");

const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find();
        res.json({
            product,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to Fetch Product List From Server",
        });
    }
};

const getProductDetails = async (res, res) => {
    try {
        const product = req.product;
        res.json({
            product,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Product Not Found With Given Id",
        });
    }
};

module.exports = {
    getAllProduct,
    findProductById,
};
