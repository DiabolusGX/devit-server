const friendInternal = require("../database/internal/friend");
const userInternal = require("../database/internal/user");
const friendDto = require("../dto/friend.dto");

module.exports = {
	suggestions: async (req) => {
		const userID = req.user?._id;
		const formattedUsers = [];
		await Promise.all(
			users.map((user) => {
				console.log(user._id, userID, user._id === userID);
				if (user._id.toString() !== userID)
					formattedUsers.push(friendDto.friendUser(user));
			})
		);
		return formattedUsers;
	},
	/**
	 * Gets user's friends count data
	 * @param {Request} req Received request
	 * @return {Promise<Object>} Returns friend count data
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
	/**
	 * Send friend request to target user ID
	 * @param {Request} req Incoming request
	 * @returns {Promise<String>} Returns success message
	 */
	addFriend: async (req) => {
		const senderUserID = req.user?._id;
		const recieverUserID = req.params?.userID;

		// validate
		if (!recieverUserID) throw new Error("Target User ID is required");
		if (senderUserID === recieverUserID)
			throw new Error("Can't send friend request to yourself.");

		await friendInternal.addFriend(senderUserID, recieverUserID);
		return "Friend Request Sent Successfully";
	},
	/**
	 * Remove given user from friend list
	 * @param {Request} req Incoming request
	 * @returns {Promise<String>} Success message
	 */
	removeFriend: async (req) => {
		const userID = req.user?._id;
		const targetFriendID = req.params?.userID;
		if (!targetFriendID) throw new Error("Target User ID is required");
		await friendInternal.removeFriend(userID, targetFriendID);
		return "Friend Removed successfully";
	},
	/**
	 * Get user's all incoming friend requests
	 * @param {Request} req Incoming request
	 * @returns {Promise<[Object]>} All friend req users
	 */
	getIncomingRequests: async (req) => {
		const userID = req.user?._id;
		const friendRequests = await friendInternal.getIncomingRequests(userID);
		const userIDs = [];
		await Promise.all(
			friendRequests.map((friendRequest) =>
				userIDs.push(friendRequest.to)
			)
		);
		const users = await userInternal.getAllUsersWithID(userIDs);
		const formattedUsers = [];
		await Promise.all(
			users.map((user) => {
				formattedUsers.push(friendDto.friendUser(user));
			})
		);
		return formattedUsers;
	},
	/**
	 * Get user's all outgoing friend requests
	 * @param {Request} req Incoming request
	 * @returns {Promise<[Object]>} All friend req users
	 */
	getOutgoingRequests: async (req) => {
		const userID = req.user?._id;
		const friendRequests = await friendInternal.getOutgoingRequests(userID);
		const userIDs = [];
		await Promise.all(
			friendRequests.map((friendRequest) =>
				userIDs.push(friendRequest.to)
			)
		);
		const users = await userInternal.getAllUsersWithID(userIDs);
		const formattedUsers = [];
		await Promise.all(
			users.map((user) => {
				formattedUsers.push(friendDto.friendUser(user));
			})
		);
		return formattedUsers;
	},
	/**
	 * Accept incoming friend request to logged in user with given friend request ID.
	 * @param {request} req Incoming Request
	 * @returns {Promise<String>} Returns success message
	 */
	acceptRequest: async (req) => {
		const userID = req.user?._id;
		const reqID = req.params?.reqID;
		if (!reqID) throw new Error("Friend Request ID is required");
		await friendInternal.acceptRequest(userID, reqID);
		return "Friend Request accepted successfully";
	},
	/**
	 * cancel outgoing friend request from logged in user with given ID.
	 * @param {Request} req Incoming Request
	 * @returns {Promise<String>} Success Message
	 */
	cancelRequest: async (req) => {
		const userID = req.user?._id;
		const reqID = req.params?.reqID;
		if (!reqID) throw new Error("Friend Request ID is required");
		await friendInternal.cancelRequest(userID, reqID);
		return "Friend Request Cancelled Successfully";
	},
	/**
	 * Delete incoming friend request to logged in user.
	 * @param {Request} req Incoming Request
	 * @returns {Promise<String>} Returns success message
	 */
	rejectRequest: async (req) => {
		const userID = req.user?._id;
		const reqID = req.params?.reqID;
		if (!reqID) throw new Error("Friend Request ID is required");
		await friendInternal.rejectRequest(userID, reqID);
		return "Friend Request deleted successfully";
	},
};
