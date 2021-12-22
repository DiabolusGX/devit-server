const express = require("express");

const isLoggedIn = require("../middleware/isLoggedIn");
const userController = require("../controller/user.controller");

const router = express.Router();

router.post("/activate", isLoggedIn, userController.activate);
router.post("/check-username", isLoggedIn, userController.isUsernameAvailable);

router.get("/profile", isLoggedIn, userController.profile);
router.patch("/profile/about", isLoggedIn, userController.updateAbout);
router.patch("/profile/header", isLoggedIn, userController.updateHeader);

router.patch("/experience", isLoggedIn, userController.addExperience);
router.delete("/experience/:id", isLoggedIn, userController.deleteExperience);

module.exports = router;
