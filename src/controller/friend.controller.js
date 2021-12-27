const friendService = require("../service/friend.service");

module.exports = {
	// suggest users for add friend
	suggestions: async (req, res) => {
		friendService
			.suggestions(req)
			.then((users) => res.status(200).json(users))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
	// send friend request
	addFriend: async (req, res) => {
		friendService
			.addFriend(req)
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
	// remove friend
	removeFriend: async (req, res) => {
		friendService
			.removeFriend(req)
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
	// accept incoming friend request
	acceptReq: async (req, res) => {
		friendService
			.acceptRequest(req)
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
	// cancel outgoing friend request
	cancelReq: async (req, res) => {
		friendService
			.cancelRequest(req)
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
	// delete incoming friend request
	rejectReq: async (req, res) => {
		friendService
			.rejectRequest(req)
			.then((msg) => res.status(200).json({ msg }))
			.catch((err) => res.status(500).json({ msg: err.message }));
	},
};
