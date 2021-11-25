const { Schema, model, Types } = require("mongoose");

const tagsLimit = 10;
const imagesLimit = 10;
const usersTaggedLimit = 20;
const channelsTaggedLimit = 20;

const Post = new Schema(
	{
		author: [
			{ type: Types.ObjectId, ref: "User", required: true, index: true },
		],
		description: { type: String, required: true },
		images: [{ type: String }],
		tags: [{ type: Types.ObjectId, ref: "Tag", index: true }],
		comments: [{ type: Types.ObjectId, ref: "Comment" }],
		likes: [{ type: Types.ObjectId, ref: "User" }],
		usersTagged: [{ type: Types.ObjectId, ref: "User", index: true }],
		channelsTagged: [{ type: Types.ObjectId, ref: "Channel", index: true }],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Post", Post);
