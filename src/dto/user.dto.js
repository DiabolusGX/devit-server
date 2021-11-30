module.exports = {
	authInfo: (user) => {
		return {
			permissionLevel: user.permissionLevel,
			username: user.username,
			displayName: user.displayName,
			avatar: user.avatar,
			isActivated: user.isActivated,
			batchYear: user.batchYear,
		};
	},
	detailedInfo: (user) => user,
};
