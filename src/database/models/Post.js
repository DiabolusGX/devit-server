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
		tags: [
			{
				type: Types.ObjectId,
				ref: "Tag",
				validate: [
					(v) => v <= tagsLimit,
					`{PATH} exceeds the limit of ${tagsLimit}`,
				],
				index: true,
			},
		],
		images: [
			{
				type: String,
				validate: [
					(v) => v <= imagesLimit,
					`{PATH} exceeds the limit of ${imagesLimit}`,
				],
			},
		],
		comments: [{ type: Types.ObjectId, ref: "Comment" }],
		likes: [{ type: Types.ObjectId, ref: "User" }],
		usersTagged: [
			{
				type: Types.ObjectId,
				ref: "User",
				validate: [
					(v) => v <= usersTaggedLimit,
					`{PATH} exceeds the limit of ${usersTaggedLimit}`,
				],
				index: true,
			},
		],
		channelsTagged: [
			{
				type: Types.ObjectId,
				ref: "Channel",
				validate: [
					(v) => v <= channelsTaggedLimit,
					`{PATH} exceeds the limit of ${channelsTaggedLimit}`,
				],
				index: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Post", Post);
