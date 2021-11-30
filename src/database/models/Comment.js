const { Schema, model, Types } = require("mongoose");

const Comment = new Schema(
	{
		content: { type: String, required: true },
		post: { type: Types.ObjectId, ref: "Post", index: true },
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Comment", Comment);
