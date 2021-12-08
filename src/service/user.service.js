const userInternal = require("../database/internal/user");
const userDto = require("../dto/user.dto");

const friendService = require("./friend.service");
const roomService = require("./room.service");

const clean = require("../utils/cleanObject");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {Request} req Received request
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
	 * @return {Promise<Boolean>} Returns availability.
	 */
	isUsernameAvailable: async (req) => {
		const targetUsername = req.body.username;
		return userInternal.isUsernameAvailable(targetUsername);
	},
	/**
	 * Gets user data and pupoulate required fields for user profile page
	 *
	 * @param {Request} req Received request
	 * @return {Promise<User>} Returns user data
	 * @throws {Error} If user not found
	 */
	profile: async (req) => {
		const targetUserID = req.user?._id;
		// get raw user data
		const user = await userInternal.getRawData(targetUserID);

		// populate friends count
		const friendsCountData = await friendService.getCount(req);
		user.friendsCountData = friendsCountData;

		// populate learning level data
		const learningLevelData = await roomService.getUserLearningLevel(
			targetUserID
		);
		user.learningLevel = learningLevelData;

		return userDto.profileInfo(user);
	},
	/**
	 * Update user about data.
	 *
	 * @param {Request} req Received request
	 * @return {Promise<User>} Returns updated user data
	 */
	updateAbout: async (req) => {
		const targetUserID = req.user?._id;
		const aboutData = clean({
			bio: req.body.bio,
			phoneNumber: req.body.phone,
			roomAddress: req.body.roomAddress,
			githubURL: req.body?.links?.github,
			linkedInURL: req.body?.links?.linkedin,
		});

		return userInternal.update(targetUserID, aboutData);
	},
};
