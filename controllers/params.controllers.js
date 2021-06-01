const Product = require("../models/product");

const getProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Could not Get the Product With the Given Id",
            });
        }
        req.product = product;
        next();
    } catch (err) {
        res.json({
            success: false,
            message: "Couldn't Fetch the Data",
        });
    }
};

module.exports = {
    getProductById,
};
