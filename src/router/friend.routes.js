const express = require("express");

const isLoggedIn = require("../middleware/isLoggedIn");
const friendController = require("../controller/friend.controller");

const router = express.Router();

router.post("/add/:userID", isLoggedIn, friendController.addFriend);
router.post("/remove/:userID", isLoggedIn, friendController.removeFriend);
router.post("/request/accept/:reqID", isLoggedIn, friendController.acceptReq);
router.post("/request/cancel/:reqID", isLoggedIn, friendController.cancelReq);
router.post("/request/reject/:reqID", isLoggedIn, friendController.rejectReq);

module.exports = router;
