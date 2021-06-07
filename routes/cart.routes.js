const express = require("express");
const router = express.Router();

const {
    getOrCreateCartByUserId,
} = require("../controllers/params.controllers");
const {
    getCart,
    addItemToCart,
    removeItemFromCart,
    updateCart,
} = require("../controllers/cart.controllers");

router.param("user", getOrCreateCartByUserId);
router.get("/:user", getCart);

router.post("/:user", addItemToCart);
router.put("/:user", updateCart);
router.delete("/:user", removeItemFromCart);

module.exports = router;
