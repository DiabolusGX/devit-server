const { Schema, model, Types } = require("mongoose");

const LearningLevel = new Schema(
    {
        user: { type: Types.ObjectId, ref: "User", index: true },
        room: { type: Types.ObjectId, ref: "Room", index: true },
        level: { type: String, enum: ["MASTER", "GROWING", "LEARNING"], default: "LEARNING" },
    },
    {
        timestamps: true,
    }
);

module.exports = model("LearningLevel", LearningLevel);
