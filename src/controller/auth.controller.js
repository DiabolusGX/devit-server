const userDto = require("../dto/user.dto");

const logout = (req, res) => {
	req.logout();
	res.clearCookie("session");
	res.json({ message: "Logout successful" });
};

const checkAuthenticated = (req, res) => {
	if (req.user) {
		res.status(200).json(userDto.authInfo(req.user));
	} else {
		res.clearCookie("session");
		res.sendStatus(204);
	}
};

module.exports = {
	logout,
	checkAuthenticated,
};
