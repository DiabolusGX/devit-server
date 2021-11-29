const User = require("../models/User");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {String} id Target user ID
	 * @param {Object} data Activation data to be updated
	 *
	 * @return {User.document} Returns updated user.
	 */
	activate: async (id, data) => {
		return User.findOneAndUpdate(
			{ _id: id },
			{ $set: { ...data, isActivated: true } },
			{ new: true }
		);
	},
};
