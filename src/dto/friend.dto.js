module.exports = {
	friendUser: (user) => {
		return {
			id: user._id,
			avatar: user.avatar,
			username: user.username,
			displayName: user.displayName,
		};
	},
};
