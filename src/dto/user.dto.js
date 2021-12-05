module.exports = {
	authInfo: (user) => {
		return {
			id: user._id,
			permissionLevel: user.permissionLevel,
			username: user.username,
			displayName: user.displayName,
			avatar: user.avatar,
			isActivated: user.isActivated,
			batchYear: user.batchYear,
		};
	},
	profileInfo: (user) => {
		return {
			id: user._id,
			permissionLevel: user.permissionLevel,
			username: user.username,
			name: user.displayName,
			avatar: user.avatar,
			banner: user.banner,
			isAlumnus: user.isAlumnus,
			isActivated: user.isActivated,
			roomAddress: user.roomAddress,
			batch: user.batchYear,
			bio: user.bio,
			email: user.email,
			gender: user.gender,
			phone: user.phoneNumber,
			links: {
				linkedin: user.linkedInURL,
				github: user.githubURL,
			},
			experience: user.experience,
			learningLevel: user.learningLevel,
			friendsCountData: user.friendsCountData,
		}
	},
	rawInfo: (user) => user,
};
