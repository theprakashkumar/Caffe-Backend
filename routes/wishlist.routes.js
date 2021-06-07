const express = require("express");
const router = express.Router();

const {
    getOrCreateWishlistByUserId,
} = require("../controllers/params.controllers");
const {
    getOrCreateCartByUserId,
} = require("../controllers/params.controllers");
const {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishlist,
    moveItemToCart,
} = require("../controllers/wishlist.controllers");

router.param("user", getOrCreateWishlistByUserId);
router.get("/:user", getWishlist);

router.post("/:user", addItemToWishlist);
router.delete("/:user", removeItemFromWishlist);

router.param("user", getOrCreateCartByUserId);
router.put("/:user", moveItemToCart);

module.exports = router;
