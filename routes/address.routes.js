const express = require("express");
const router = express.Router();

const {
    getOrCreateAddressByUserId,
} = require("../controllers/params.controllers");

const {
    getAddress,
    addNewAddress,
} = require("../controllers/address.controllers");

router.param("user", getOrCreateAddressByUserId);

router.get("/:user", getAddress);
router.post("/:user", addNewAddress);

module.exports = router;
