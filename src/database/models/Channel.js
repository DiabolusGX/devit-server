const { Schema, model, Types } = require("mongoose");

const Channel = new Schema(
	{
		name: { type: String, required: true, index: true },
		topic: { type: String, required: true },
		type: {
			type: String,
			enum: ["TEMP", "DISCUSSION"],
			default: "DISCUSSION",
		},
		expiresAt: { type: Date },
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

Channel.index(
	{ expiresAt: 1 },
	{
		expireAfterSeconds: 60 * 60 * 24 * 7,
		partialFilterExpression: { type: "TEMP" },
	}
);

module.exports = model("Channel", Channel);
