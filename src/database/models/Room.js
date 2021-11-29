const { Schema, model, Types } = require("mongoose");

const Room = new Schema(
	{
		name: { type: String, required: true, index: true },
		topic: { type: String, required: true },
		moderators: [{ type: Types.ObjectId, ref: "User" }],
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Channel", Room);
