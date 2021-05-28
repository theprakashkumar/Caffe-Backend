const express = require("express");
const router = express.Router();

const { getAllProducts, getProductDetails } = require("../controllers/products.controllers");
const { getProductByID } = require("../controllers/params.controllers");

router.get("/", getAllProducts);

router.param("id", getProductByID);
router.get("/:id", getProductDetails);

module.exports = router;