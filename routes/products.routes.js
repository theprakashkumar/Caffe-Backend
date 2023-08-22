const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    addNewProduct,
    getProductDetails,
} = require("../controllers/products.controllers");
const { getProductById } = require("../controllers/params.controllers");

router.get("/", getAllProducts);
router.post("/", addNewProduct);

router.param("id", getProductById);
router.get("/:id", getProductDetails);

module.exports = router;
