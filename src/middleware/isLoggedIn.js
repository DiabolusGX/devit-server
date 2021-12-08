const isLoggedIn = (req, res, next) => {
	// TODO: remove these comments - commented out for testing.
	// if (req.isAuthenticated()) return next();
	// else res.status(401).json({ message: "Login to perform this action!" });
	return next();
};

module.exports = isLoggedIn;
