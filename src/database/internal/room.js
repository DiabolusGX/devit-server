const Room = require("../models/Room");
const LearningLevel = require("../models/Relations/LearningLevel");

module.exports = {
    /**
     * Get user's friends and friend requests count.
     * @param {String} id Target user ID
     * @return {Promise<Number>} Returns user's friends count.
     * @throws {Error} If user is not found.
    */
    getUserLearningLevel: async function (id) {
        const learning = [], growing = [], master = [];
        const learningLevels = await LearningLevel.find({ user: id });
        learningLevels.forEach(async data => {
            const room = data.room;
            const roomData = await Room.findOne({ _id: room }, { name: 1 });
            const levelData = {
                id: room,
                name: roomData.name,
                level: data.level
            };

            if (data.level === "LEARNING") learning.push(levelData);
            else if (data.level === "GROWING") growing.push(levelData);
            else if (data.level === "MASTER") master.push(levelData);
        });
        return {
            learning,
            growing,
            master
        };
    },
};
