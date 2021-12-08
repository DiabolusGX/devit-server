const postInternal = require("../database/internal/post");

module.exports = {
	/**
	 * Gets all posts (non paginated for now)
	 *
	 * @param {Request} req Request object
	 * @return {Promise<[Object]>} Returns friend count data
	 * @throws {Error} If user not found
	 */
	getAllPosts: async (req) => {
		const query = req.query;
		if (query.userId !== "") {
			return postInternal.getUserPosts(query.userId);
		}
		return postInternal.getAllPosts();
	},
};
