const express = require("express");
const router = express.Router();

const {
    createOrder,
    placeOrder,
    gerOrders,
} = require("../controllers/order.controllers");

router.post("/:user", createOrder);
router.post("/placeorder/:user", placeOrder);
router.get("/:user", gerOrders);

module.exports = router;
