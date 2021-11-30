const userInternal = require("../database/internal/user");
const userDto = require("../dto/user.dto");

const clean = require("../utils/cleanObject");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {Request} req Received request
	 *
	 * @return {User} Returns updated user.
	 */
	activate: async (req) => {
		const targetUserID = req.user?._id;
		const activationData = clean({
			username: req.body.username,
			avatar: req.body.avatar,
			githubURL: req.body.links?.github,
			linkedInURL: req.body.links?.linkedin,
			phoneNumber: req.body.phoneNumber,
			bio: req.body.bio,
			gender: req.body.gender?.toUpperCase(),
		});

		const user = await userInternal.activate(targetUserID, activationData);

		return userDto.authInfo(user);
	},
	/**
	 * Check if sent username is available or not.
	 *
	 * @param {Request} req Received request
	 *
	 * @return {Promise<Boolean>} Returns availability.
	 */
	isUsernameAvailable: async (req) => {
		const targetUsername = req.body.username;
		return userInternal.isUsernameAvailable(targetUsername);
	},
};
