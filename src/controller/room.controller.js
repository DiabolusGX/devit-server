const roomService = require("../service/room.service");

module.exports = {
	// get all rooms
	getAllRooms: async (req, res) => {
		roomService
			.getAllRooms()
			.then((rooms) => res.status(200).json(rooms))
			.catch((err) => res.status(409).json({ msg: err.message }));
	},
	// create new room
	createNewRoom: async (req, res) => {
		roomService
			.createNewRoom(req)
			.then((room) => res.status(200).json(room))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
	// join a room
	joinRoom: async (req, res) => {
		roomService
			.joinRoom(req)
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(500).json({ msg: err.message }));
	}
};
