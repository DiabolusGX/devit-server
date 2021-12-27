module.exports = {
	suggestions: (users) => {
		const formattedUsers = [];
		users.forEach((user) => {
			formattedUsers.push({
				id: user._id,
				bio: user.bio,
				icon: user.icon,
				banner: user.banner,
				username: user.username,
				displayName: user.displayName,
			});
		});
		return formattedUsers;
	},
};
