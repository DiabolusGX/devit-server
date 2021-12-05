const express = require("express");

const isLoggedIn = require("../middleware/isLoggedIn");
const postController = require("../controller/post.controller");

const router = express.Router();

router.get("/all", isLoggedIn, postController.allPosts);

module.exports = router;
