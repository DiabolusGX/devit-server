const User = require("../models/User");
const Friend = require("../models/Relations/Friend");

const mongoose = require("mongoose");

module.exports = {
	/**
	 * Get users suggestions to add as friends.
	 * @param {String} userID Logged in user ID
	 * @returns {Promise<[Object]>} 10 randon users
	 */
	suggestions: async (_userID) => {
		const users = await User.find().limit(10);
		return users;
	},
	/**
	 * Get user's friends and friend requests count.
	 * @param {String} userID Target user ID
	 * @return {Promise<Number>} Returns user's friends count.
	 */
	getFriendsCount: async (userID) => {
		return Friend.count({
			$and: [
				{ $or: [{ from: userID }, { to: userID }] },
				{ accepted: true },
			],
		});
	},
	/**
	 * Get user's incoming friend requests count.
	 * @param {String} userID Target user ID
	 * @return {Promise<Number>} Returns user's incoming friend requests count.
	 */
	getIncomingRequestsCount: async (userID) => {
		return Friend.count({
			to: userID,
			accepted: false,
		});
	},
	/**
	 * Get user's outgoing friend requests count.
	 * @param {String} userID Target user ID
	 * @return {Promise<Number>} Returns user's outgoing friend requests count.
	 */
	getOutgoingRequestsCount: async (userID) => {
		return Friend.count({
			from: userID,
			accepted: false,
		});
	},
	/**
	 * Get user's incoming friend request users.
	 * @param {String} userID Target user ID
	 * @return {Promise<[Object]>} Returns user's incoming friend request users.
	 */
	getIncomingRequests: async (userID) => {
		return Friend.find({
			to: userID,
			accepted: false,
		});
	},
	/**
	 * Get user's outgoing friend request users.
	 * @param {String} userID Target user ID
	 * @return {Promise<[Object]>} Returns user's outgoing friend request users.
	 */
	getOutgoingRequests: async (userID) => {
		return Friend.find({
			from: userID,
			accepted: false,
		});
	},
	/**
	 * Send friend request if not friend and no friend req exists.
	 * @param {String} senderUserID Friend req sender user ID
	 * @param {String} recieverUserID Friend req reciever / target user ID
	 * @returns {Promise<String>} Success Message
	 */
	addFriend: async (senderUserID, recieverUserID) => {
		// check if user exists for given req reciever user id
		const targetUser = await User.findById(recieverUserID);
		if (!targetUser) throw new Error("Invalid User ID");

		// check if they're already friends OR friend req exists
		const reqExists = await Friend.count({
			$or: [
				{ from: senderUserID, to: recieverUserID },
				{ from: recieverUserID, to: senderUserID },
			],
		});
		if (reqExists) throw new Error("Friend request already exists");

		// send new friend request
		const newFriendReq = new Friend({
			from: senderUserID,
			to: recieverUserID,
		});
		await newFriendReq.save();
		return "Success";
	},
	/**
	 * Delete friend relation b/w logged in user id and target user id.
	 * @param {String} userID Logged In User ID
	 * @param {String} targetFriendID Target User ID
	 * @returns {Promise<String>} Returns success msg
	 */
	removeFriend: async (userID, targetFriendID) => {
		const del = await Friend.deleteOne({
			$and: [
				{
					$or: [
						{ from: targetFriendID, to: userID },
						{ from: userID, to: targetFriendID },
					],
				},
				{ accepted: true },
			],
		});
		if (!del.deletedCount) throw new Error("No friend found with given ID");
		return "Success";
	},
	/**
	 * Accept incoming friend request to target user with given friend request ID.
	 * @param {String} userID Target User ID
	 * @param {String} reqID Friend request ID to accept
	 * @returns {Promise<String>} Success Message
	 */
	acceptRequest: async (userID, reqID) => {
		const acceptedReq = await Friend.findOneAndUpdate(
			{ _id: reqID, to: userID },
			{ accepted: true },
			{ new: true }
		);
		if (!acceptedReq)
			throw new Error("No friend request found for you with this ID.");
		return "Success";
	},
	/**
	 * Cencel given outgoing friend request from logged in user ID.
	 * @param {String} userID Logged In User ID
	 * @param {String} reqID Target Friend Request ID
	 * @returns {Promise<String>} Success Message
	 */
	cancelRequest: async (userID, reqID) => {
		const cancelled = await Friend.deleteOne({
			_id: mongoose.Types.ObjectId(reqID),
			from: userID,
			accepted: false,
		});
		if (!cancelled.deletedCount)
			throw new Error("No pending outgoing request found with given ID.");
		return "Success";
	},
	/**
	 * Reject incoming friend request with given ID.
	 * @param {String} userID Logged In User ID
	 * @param {String} reqID Friend request ID
	 * @returns {Promise<String>} success message
	 */
	rejectRequest: async (userID, reqID) => {
		const del = await Friend.deleteOne({
			_id: reqID,
			to: userID,
			accepted: false,
		});
		if (!del.deletedCount)
			throw new Error("No pending friend request found with given ID.");
		return "Success";
	},
};
