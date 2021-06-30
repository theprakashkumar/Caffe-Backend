const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
    getUserLogin,
    createNewUser,
    getUserDetails,
} = require("../controllers/users.controllers");
const { getUserById } = require("../controllers/params.controllers");

router.post("/login", getUserLogin);
router.post("/signup", createNewUser);

// middleware for authentication
router.use(authenticate);

router.param("id", getUserById);
router.get("/:id", getUserDetails);

module.exports = router;
