const userService = require("../service/user.service");

module.exports = {
	// activate user
	activate: async (req, res) => {
		userService
			.activate(req)
			.then((updatedUser) => res.status(200).json(updatedUser))
			.catch((err) => res.status(409).json({ msg: err.message }));
	},
};
