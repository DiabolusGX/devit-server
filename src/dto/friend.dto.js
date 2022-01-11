module.exports = {
	suggestions: (users) => {
		const formattedUsers = [];
		users.forEach((user) => {
			formattedUsers.push({
				id: user._id,
				bio: user.bio,
				avatar: user.avatar,
				banner: user.banner,
				username: user.username,
				displayName: user.displayName,
			});
		});
		return formattedUsers;
	},
	requestUser: (user) => {
		return {
			id: user._id,
			avatar: user.avatar,
			username: user.username,
			displayName: user.displayName,
		};
	},
};
