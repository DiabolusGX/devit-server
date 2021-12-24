const Room = require("../models/Room");
const User = require("../models/User");
const LearningLevel = require("../models/Relations/LearningLevel");

module.exports = {
	/**
	 * Create new room with given input data by an admin.
	 * @param {Object} roomData New Room Data
	 * @returns {Promise<Object>} Returns promise for new room object
	 */
	createNewRoom: async (roomData) => {
		const newRoom = new Room(roomData);
		return newRoom.save();
	},
	/**
	 * Get user's friends and friend requests count.
	 * @param {String} id Target user ID
	 * @return {Promise<Number>} Returns user's friends count.
	 * @throws {Error} If user is not found.
	 */
	getUserLearningLevel: async function (id) {
		const learning = [],
			growing = [],
			master = [];
		const learningLevels = await LearningLevel.find({ user: id });
		learningLevels.forEach(async (data) => {
			const room = data.room;
			const roomData = await Room.findOne({ _id: room }, { name: 1 });
			const levelData = {
				id: room,
				name: roomData.name,
				level: data.level,
			};

			if (data.level === "LEARNING") learning.push(levelData);
			else if (data.level === "GROWING") growing.push(levelData);
			else if (data.level === "MASTER") master.push(levelData);
		});
		return {
			learning,
			growing,
			master,
		};
	},
	/**
	 * Get all active rooms that any user can join.
	 * @returns {Promise<[Object]>} Returns all active rooms
	 */
	getAllActiveRooms: async () => {
		return Room.find().catch(console.error);
	},
	/**
	 * Find member count of particular room by ID.
	 * @param {String} roomID Room ID to find member count
	 * @returns {Promise<Number>} Returns member count
	 */
	getRoomMemberCount: async (roomID) => {
		return User.find({ joinedRooms: roomID }).countDocuments();
	},
	/**
	 * Join a room by user ID and room ID.
	 * @param {String} userID User ID to join room
	 * @param {String} roomID Room ID to join
	 * @returns {Promise<Object>} Returns promise for updated user object
	 */
	joinRoom: async (userID, roomID) => {
		const user = await User.findOneAndUpdate(
			{ _id: userID },
			{ $push: { joinedRooms: roomID } },
			{ new: true }
		);
		if (!user) throw new Error("User not found");
		return user;
	}
};
