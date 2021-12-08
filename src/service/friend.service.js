const friendInternal = require("../database/internal/friend");

module.exports = {
	/**
	 * Gets user's friends count data
	 *
	 * @param {Request} req Received request
	 * @return {Promise<Object>} Returns friend count data
	 * @throws {Error} If user not found
	 */
	getCount: async (req) => {
		const targetUserID = req.user?._id;
		const friendCount = await friendInternal.getFriendsCount(targetUserID);
		const outgoingRequestsCount =
			await friendInternal.getOutgoingRequestsCount(targetUserID);
		const incomingRequestsCount =
			await friendInternal.getIncomingRequestsCount(targetUserID);
		return {
			friendCount,
			outgoingRequestsCount,
			incomingRequestsCount,
		};
	},
};
