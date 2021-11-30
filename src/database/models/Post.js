const { Schema, model, Types } = require("mongoose");

const Post = new Schema(
	{
		author: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		description: { type: String, required: true },
		attachments: [{ type: String }],
		channelsTagged: [{ type: Types.ObjectId, ref: "Channel" }],
		tags: [{ type: Types.ObjectId, ref: "Tag", index: true }],
		usersTagged: [{ type: Types.ObjectId, ref: "User", index: true }],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Post", Post);
