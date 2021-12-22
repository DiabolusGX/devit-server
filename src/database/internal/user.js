const { v4 } = require("uuid");
const User = require("../models/User");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {String} id Target user ID
	 * @param {Object} data Activation data to be updated
	 * @return {User} Returns updated user.
	 */
	activate: async (id, data) => {
		return User.findOneAndUpdate(
			{ _id: id },
			{ $set: { ...data, isActivated: true } },
			{ new: true }
		);
	},
	/**
	 * Check if document exists with given username.
	 *
	 * @param {String} username Target username
	 * @return {Boolean} Returns is given username available.
	 */
	isUsernameAvailable: async (username) => {
		const isAvailable = await User.exists({ username });
		return !isAvailable;
	},
	/**
	 * Get user's pupulated details.
	 * @param {String} id Target user ID
	 * @return {Promise<User>} Returns user's populated details.
	 * @throws {Error} If user is not found.
	 */
	getRawData: async (id) => {
		const user = await User.findOne({ _id: id });
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
	/**
	 * Update user's details.
	 * @param {String} id Target user ID
	 * @param {Object} data User's data to be updated
	 * @return {Promise<User>} Returns updated user.
	 * @throws {Error} If user is not found.
	 */
	update: async (id, data) => {
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
	/**
	 * Add user's experience
	 * @param {String} id Target user ID
	 * @param {Object} exp User's experience data
	 * @return {Promise<User>} Return updated user.
	 * @throws {Error} If user is not found.
	 */
	addExperience: async (id, exp) => {
		exp.uuid = v4();
		console.log(exp);
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $push: { experiences: exp } },
			{ new: true }
		);
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
};
