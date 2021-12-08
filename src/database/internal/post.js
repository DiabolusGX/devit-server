const Post = require("../models/Post");

module.exports = {
	/**
	 * Get user's posts (no pagination for now).
	 * @param {String} id Target user ID
	 * @return {Promise<[Object]>} Returns user's posts (no pagination for now).
	 * @throws {Error} If user is not found.
	 */
	getUserPosts: async (id) => {
		return Post.find({ author: id }).catch(console.error);
	},
	/**
	 * Get all posts (no pagination for now).
	 * @return {Promise<[Object]>} Returns all posts (no pagination for now).
	 */
	getAllPosts: async () => {
		return Post.find({}).catch(console.error);
	},
};
