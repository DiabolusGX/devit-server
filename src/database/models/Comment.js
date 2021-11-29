const { Schema, model, Types } = require("mongoose");

const Comment = new Schema(
	{
		content: { type: String, required: true },
		likes: [{ type: Types.ObjectId, ref: "User" }],
		post: { type: Types.ObjectId, ref: "Post", index: true },
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Channel", Comment);
