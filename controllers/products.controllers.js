const Product = require("../models/product");

const addNewProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = new Product(product);
        const savedProduct = await newProduct.save();
        res.json({
            success: true,
            product: savedProduct,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to Add New Product",
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.json({
            success: true,
            product,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to Fetch Product List From Server",
        });
    }
};

const getProductDetails = async (req, res) => {
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
    addNewProduct,
    getAllProducts,
    getProductDetails,
};
