const mongoose = require("mongoose");
const roomInternal = require("../database/internal/room");
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
		const targetUserID = req.user?._id;
		const roomID = req.params.roomID;
		return roomInternal.joinRoom(targetUserID, roomID);
	}
};
