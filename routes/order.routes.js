const express = require("express");
const router = express.Router();

const { createOrder, placeOrder } = require("../controllers/order.controllers");

router.post("/:user", createOrder);
router.post("/placeorder/:user", placeOrder);

module.exports = router;
