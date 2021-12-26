const userInternal = require("../database/internal/user");
const userDto = require("../dto/user.dto");

const friendService = require("./friend.service");
const roomService = require("./room.service");
const aws = require("../aws");

const { User } = require("../validators");
const clean = require("../utils/cleanObject");
const fileFilter = require("../utils/fileFilter");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 * @param {Request} req Received request
	 * @return {Promise<User>} Returns updated user.
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
	 * @param {Request} req Received request
	 * @return {Promise<Boolean>} Returns availability.
	 */
	isUsernameAvailable: async (req) => {
		const targetUsername = req.body.username;
		return userInternal.isUsernameAvailable(targetUsername);
	},
	/**
	 * Gets user data and pupoulate required fields for user profile page
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
			req
		);
		user.learningLevel = learningLevelData;

		return userDto.profileInfo(user);
	},
	/**
	 * Update user about data.
	 * @param {Request} req Received request
	 * @return {Promise<String>} Returns success message
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

		await userInternal.update(targetUserID, aboutData);
		return "Updated about section successfully!";
	},
	/**
	 * Update user header data.
	 * @param {Request} req Received request
	 * @return {Promise<Object>} Returns success message
	 */
	updateHeader: async (req) => {
		const targetUserID = req.user?.id;
		const body = req.body;

		const newData = {
			avatar: body.avatar,
			banner: body.banner,
			username: body.username,
			displayName: body.displayName,
		};

		if (!body?.avatar.startsWith("https")) {
			const imageBuffer = fileFilter.imageFilter(body.avatar);
			newData.avatar = await aws.uploadImage(imageBuffer);
		}
		if (!body?.banner.startsWith("https")) {
			const imageBuffer = fileFilter.imageFilter(body.banner);
			newData.banner = await aws.uploadImage(imageBuffer);
		}

		const user = await userInternal.update(targetUserID, newData);
		return userDto.headerInfo(user);
	},
	/**
	 * Add user experience in user data.
	 * @param {Request} req Received request
	 * @return {Promise<[Experience]>} Returns all experiences array
	 */
	addExperience: async (req) => {
		const targetUserID = req.user?.id;
		const exp = User.addExperience(req.body);
		if (exp.isCurrent) delete exp.endData;
		const user = await userInternal.addExperience(targetUserID, exp);
		return user.experiences;
	},
	/**
	 * Remove particular experience data from user.
	 * @param {Request} req Received reques
	 * @return {Promise<[Experience]>} Returns all experiences array
	 */
	deleteExperience: async (req) => {
		const targetUserID = req.user._id;
		const expToDelete = req.params.expID;
		const user = await userInternal.deleteExperience(targetUserID, expToDelete);
		return user.experiences;
	},
};
