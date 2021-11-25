const express = require("express");
const passport = require("passport");

const config = require("../../configs/config");

const isLoggedIn = require("../middleware/isLoggedIn");
const { logout, checkAuthenticated } = require("../controller/auth");

const router = express.Router();

router.get("/google", passport.authenticate("google"));
router.get(
	"/google/redirect",
	passport.authenticate("google", {
		successRedirect: config.client.successRedirectURL,
		failureRedirect: config.client.failureRedirectURL,
	})
);
router.get("/logout", isLoggedIn, logout);
router.get("/check", checkAuthenticated);

module.exports = router;
