const { Schema, model, Types } = require("mongoose");

const Question = new Schema(
	{
		author: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		title: { type: String, required: true, maxlength: 125, index: true },
		description: { type: String, required: true, maxlength: 2048 },
		attachments: [{ type: String }],
		isAnswered: { type: Boolean, default: false },
		room: { type: Types.ObjectId, ref: "Room", required: true },
		tags: [{ type: Types.ObjectId, ref: "Tag", index: true }],
		comments: [{ type: Types.ObjectId, ref: "Comment" }],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Question", Question);
