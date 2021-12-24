const { Schema, model, Types } = require("mongoose");

const Room = new Schema(
	{
		name: { type: String, required: true, index: true },
		topic: { type: String, required: true },
		icon: { type: String, required: true },
		moderators: [{ type: Types.ObjectId, ref: "User" }],
		channels: [{ type: Types.ObjectId, ref: "Channel" }],
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Room", Room);
