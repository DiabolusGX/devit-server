const express = require("express");

const isLoggedIn = require("../middleware/isLoggedIn");
const userController = require("../controller/user.controller");

const router = express.Router();

router.post("/activate", isLoggedIn, userController.activate);
router.post("/check-username", isLoggedIn, userController.isUsernameAvailable);

module.exports = router;
