const userService = require("../service/user.service");
const fileFilter = require("../utils/fileFilter");
const aws = require("../aws");

// const multer, { memoryStorage } = require("multer");

// // Use multer to store file in memory temporarily
// const storage = memoryStorage();
// const upload = multer({
// 	storage,
// 	// 7MB limit on file size
// 	limits : {fileSize : 7 * 1024 * 1024},
// 	fileFilter: async(_, _, cb) => {
// 		return cb(null, true)
// 	}
// });

module.exports = {
	// activate user
	activate: async (req, res) => {
		userService
			.activate(req)
			.then((updatedUser) => res.status(200).json(updatedUser))
			.catch((err) => res.status(409).json({ msg: err.message }));
	},
	// check if username is available or taken
	isUsernameAvailable: async (req, res) => {
		const isAvailable = await userService.isUsernameAvailable(req);
		res.status(200).json({
			isAvailable,
		});
	},
	// get user profile
	profile: async (req, res) => {
		userService
			.profile(req)
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(404).json({ msg: err.message }));
	},
	// update user about section
	updateAbout: async (req, res) => {
		userService
			.updateAbout(req)
			.then((updatedUser) => res.status(200).json(updatedUser))
			.catch((err) => res.status(424).json({ msg: err.message }));
	},
	// update user profile header
	updateHeader: async (req, res) => {
		const body = req.body;
		console.log(body);

		const imageBuffer = fileFilter.imageFilter(body.avatar);
		const link = await aws.uploadImage(
			"test",
			"cdn.devit",
			imageBuffer,
			"public-read"
		);
		res.send(link);
	},
};
