const express = require("express");

const isLoggedIn = require("../middleware/isLoggedIn");
const friendController = require("../controller/friend.controller");

const router = express.Router();

router.get("/suggestions", isLoggedIn, friendController.suggestions);
router.post("/add/:userID", isLoggedIn, friendController.addFriend);
router.post("/remove/:userID", isLoggedIn, friendController.removeFriend);
router.get("/requests/received", isLoggedIn, friendController.getIncomingReq);
router.get("/requests/sent", isLoggedIn, friendController.getOutgoingReq);
router.post("/request/accept/:reqID", isLoggedIn, friendController.acceptReq);
router.post("/request/cancel/:reqID", isLoggedIn, friendController.cancelReq);
router.post("/request/reject/:reqID", isLoggedIn, friendController.rejectReq);

module.exports = router;
