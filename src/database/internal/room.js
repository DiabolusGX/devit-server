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
		const room = await newRoom.save();
		return room;
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
		const allRooms = await Room.find().catch(console.error);
		return allRooms;
	},
	/**
	 * Find member count of particular room by ID.
	 * @param {String} roomID Room ID to find member count
	 * @returns {Promise<Number>} Returns member count
	 */
	getRoomMemberCount: async (roomID) => {
		console.log(roomID);
		const count = await User.where({
			joinedRooms: { $in: ["61c5f6703d588acdb951e322"] },
		})
			.countDocuments()
			.catch(console.error);
		console.log(count);
		const res = await User.find({
			joinedRooms: `61c5f6703d588acdb951e322`,
		});
		const z = await User.find().select({ joinedRooms: 1 });
		console.log(res);
		console.log(z);
		return count;
	},
};
