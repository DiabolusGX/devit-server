const { Schema, model, Types } = require("mongoose");

const User = new Schema(
	{
		permissionLevel: { type: Number, required: true, default: 1 },
		email: { type: String, required: true, unique: true, index: true },
		username: { type: String, required: true, unique: true, index: true },
		displayName: { type: String, required: true, maxlength: 100 },
		avatar: { type: String, maxlength: 1000 },
		isAlumnus: { type: Boolean, default: false },
		gender: { type: String, enum: ["MALE", "FEMALE", "OTHERS"] },
		batchYear: { type: String, required: true, maxlength: 10 },
		phoneNumber: { type: String, maxlength: 10 },
		bio: { type: String, maxlength: 1000 },
		repositories: [{ type: String }],
		socialLinks: [{ type: String }],
		friends: [{ type: Types.ObjectId, ref: "User" }],
		likedPosts: [{ type: Types.ObjectId, ref: "Post" }],
		savedPosts: [{ type: Types.ObjectId, ref: "Post" }],
		followingChannels: [{ type: Types.ObjectId, ref: "Channel" }],
		followingTags: [{ type: Types.ObjectId, ref: "Tag" }],
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", User);
