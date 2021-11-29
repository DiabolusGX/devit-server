const userInternal = require("../database/internal/user");

const clean = require("../utils/cleanObject");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {String} id Target user ID
	 * @param {Object} data Activation data to be updated
	 *
	 * @return {User} Returns updated user.
	 */
	activate: async (req) => {
		const targetUserID = req.user._id;
		const activationData = clean({
			username: req.body.username,
			avatar: req.body.avatar,
			githubURL: req.body.links?.github,
			linkedInURL: req.body.links?.linkedin,
			phone: req.body.phone,
			bio: req.body.bio,
			gender: req.body.gender?.toUpperCase(),
		});

		return userInternal.activate(targetUserID, activationData);
	},
};
