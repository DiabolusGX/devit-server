const postService = require("../service/post.service");

module.exports = {
    // TODO: Add pagination support
    // get user's posts (no pagination for now)
    allPosts: async (req, res) => {
        const posts = await postService.getAllPosts(req);
        return res.status(200).json(posts);
    }
};
