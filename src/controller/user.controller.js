const userService = require("../service/user.service");

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
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(424).json({ msg: err.message }));
	},
	// update user profile header
	updateHeader: async (req, res) => {
		userService
			.updateHeader(req)
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(424).json({ msg: err.message }));
	},
};
