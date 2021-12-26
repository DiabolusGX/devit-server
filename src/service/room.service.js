const roomInternal = require("../database/internal/room");
const userInternal = require("../database/internal/user");
const roomDto = require("../dto/room.dto");

module.exports = {
	/**
	 * Get all active joinable rooms.
	 * @return {Promise<[Object]>} Returns all rooms info
	 */
	getAllRooms: async () => {
		const rooms = await roomInternal.getAllActiveRooms();
		try {
			await Promise.all(
				rooms.map(async (room) => {
					room.memberCount = await roomInternal.getRoomMemberCount(
						room._id
					);
				})
			);
		} catch (err) {
			console.error(err);
		}
		return roomDto.allActiveRooms(rooms);
	},
	/**
	 * Gets user's learning technologies (rooms) and levels data.
	 * @param {Request} req Received request
	 * @return {Promise<Object>} Returns friend count data
	 * @throws {Error} If user not found
	 */
	getUserLearningLevel: async (req) => {
		const targetUserID = req.user?._id;
		return roomInternal
			.getUserLearningLevel(targetUserID)
			.catch(console.error);
	},
	/**
	 * Create new room with given input data by an admin.
	 * @param {Request} req Recieved request
	 * @returns {Promise<Object>} Returns new room object
	 */
	createNewRoom: async (req) => {
		const newRoomData = roomDto.newRoom(req.body);
		newRoomData.createdBy = req.user._id;
		return roomInternal.createNewRoom(newRoomData);
	},
	/**
	 * Join a room by room ID.
	 * @param {Request} req Received request
	 * @returns {Promise<Object>} Returns joined room object
	 * @throws {Error} If room not found
	 */
	joinRoom: async (req) => {
		// check if user is already in the room
		if (req.user?.joinedRooms?.includes(req.body?.roomID?.toString())) {
			throw new Error("You are already in this room");
		}

		// join room by room ID
		const targetUserID = req.user?._id;
		const roomID = req.body?.roomID;
		if (!roomID) throw new Error("Room ID is required");
		await roomInternal.joinRoom(targetUserID, roomID);

		// set new learning level for given room
		const learningLevel = req.body?.learningLevel;
		if (!learningLevel) throw new Error("Learning level is required");
		await userInternal.setNewUserLearningLevel(
			targetUserID,
			roomID,
			learningLevel
		);

		return "Successfully Joined New Room";
	}
};
