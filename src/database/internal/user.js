const User = require("../models/User");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {String} id Target user ID
	 * @param {Object} data Activation data to be updated
	 *
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
	 *
	 * @return {Boolean} Returns is given username available.
	 */
	isUsernameAvailable: async (username) => {
		const isAvailable = await User.exists({ username });
		return !isAvailable;
	},
};
