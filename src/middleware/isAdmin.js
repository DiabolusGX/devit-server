const isAdmin = (req, res, next) => {
	// TODO: remove these comments - commented out for testing.
	// if (req.isAuthenticated() && req.user.permissionLevel > 4) return next();
	// else res.status(401).json({ message: "Only Admins can do this!" });
	return next();
};

module.exports = isAdmin;
