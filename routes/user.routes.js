const express = require("express");
const router = express.Router();

const { getUserLogin, createNewUser, getUserDetails } = require("../controllers/users.controllers");
const { getUserById } = require("../controllers/params.controllers");

router.post("/login", getUserLogin);
router.post("/signup", createNewUser);

router.param("id", getUserById);
router.get("/:id", getUserDetails);

module.exports = router;


// login route unique is not working
