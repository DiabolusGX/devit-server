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
	 * @param {String} userID Target user ID
	 * @return {Promise<Number>} Returns user's friends count.
	 * @throws {Error} If user is not found.
	 */
	getUserLearningLevel: async function (userID) {
		const learning = [],
			growing = [],
			mastering = [];
		const learningLevels = await LearningLevel.find({ user: userID });
		await Promise.all(
			learningLevels.map(async (learningData) => {
				const roomID = learningData.room;
				const roomData = await Room.findOne({ _id: roomID }, { name: 1 });
				const levelData = {
					id: roomID,
					name: roomData.name,
					level: learningData.level,
				};

				if (learningData.level === "LEARNING") learning.push(levelData);
				else if (learningData.level === "GROWING") growing.push(levelData);
				else if (learningData.level === "MASTERING") mastering.push(levelData);
			})
		);
		return {
			learning,
			growing,
			mastering,
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
		return User.count({ joinedRooms: roomID });
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
