const { Schema, model, Types } = require("mongoose");

const Channel = new Schema(
	{
		name: { type: String, required: true, index: true },
		topic: { type: String, required: true },
		followers: [{ type: Types.ObjectId, ref: "User" }],
		moderators: [{ type: Types.ObjectId, ref: "User" }],
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Channel", Channel);
