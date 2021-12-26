const express = require("express");

const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const roomController = require("../controller/room.controller");

const router = express.Router();

router.get("/", isLoggedIn, roomController.getAllRooms);
router.post("/create", isAdmin, roomController.createNewRoom);
router.post("/join", isLoggedIn, roomController.joinRoom);

module.exports = router;
