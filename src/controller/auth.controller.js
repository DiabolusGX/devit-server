const logout = (req, res) => {
	req.logout();
	res.clearCookie("session");
	res.json({ message: "Logout successful" });
};

const checkAuthenticated = (req, res) => {
	if (req.user) {
		res.status(200).json({
			permissionLevel: req.user.permissionLevel,
			email: req.user.email,
			username: req.user.username,
			displayName: req.user.displayName,
			avatar: req.user.avatar,
			isAlumnus: req.user.isAlumnus,
			isActivated: req.user.isActivated,
			gender: req.user.gender,
			batchYear: req.user.batchYear,
			phoneNumber: req.user.phoneNumber,
			bio: req.user.bio,
			repositories: req.user.repositories,
			socialLinks: req.user.socialLinks,
		});
	} else {
		res.clearCookie("session");
		res.sendStatus(204);
	}
};

module.exports = {
	logout,
	checkAuthenticated,
};
