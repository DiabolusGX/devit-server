const Friend = require("../models/Relations/Friend");

module.exports = {
	/**
	 * Get user's friends and friend requests count.
	 * @param {String} id Target user ID
	 * @return {Promise<Number>} Returns user's friends count.
	 * @throws {Error} If user is not found.
	 */
	getFriendsCount: async (id) => {
		return Friend.count({
			$or: [{ from: id }, { to: id }],
			$and: [{ accepted: true }],
		}).catch(console.error);
	},
	/**
	 * Get user's incoming friend requests count.
	 * @param {String} id Target user ID
	 * @return {Promise<Number>} Returns user's incoming friend requests count.
	 * @throws {Error} If user is not found.
	 */
	getIncomingRequestsCount: async (id) => {
		return Friend.count({
			to: id,
			accepted: false,
		}).catch(console.error);
	},
	/**
	 * Get user's outgoing friend requests count.
	 * @param {String} id Target user ID
	 * @return {Promise<Object>} Returns user's outgoing friend requests count.
	 * @throws {Error} If user is not found.
	 */
	getOutgoingRequestsCount: async (id) => {
		return Friend.count({
			from: id,
			accepted: false,
		}).catch(console.error);
	},
};
