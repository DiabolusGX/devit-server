const isLoggedIn = (req, res, next) => {
	// TODO: remove these comments - commented out for testing.
	// if (req.isAuthenticated()) return next();
	// else res.status(401).json({ message: "Login to perform this action!" });

	// TODO: remove this hardcoding after testing
	// req.user = {
	// 	_id: "61c61444af7df2a01e3ec2a6",
	// };

	return next();
};

module.exports = isLoggedIn;
