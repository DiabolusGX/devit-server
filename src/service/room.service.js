const roomInternal = require("../database/internal/room");

module.exports = {
    /**
     * Gets user's learning technologies (rooms) and levels data
     * 
     * @param {Request} req Received request
     * @return {Promise<Object>} Returns friend count data
     * @throws {Error} If user not found
    */
    getUsersLearningLevel: async (req) => {
        const targetUserID = req.user?._id;
        return roomInternal.getUsersLearningLevel(targetUserID).catch(console.error);
    }
};
