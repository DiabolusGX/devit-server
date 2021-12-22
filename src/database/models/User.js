const { Schema, model, Types } = require("mongoose");

const User = new Schema(
	{
		permissionLevel: { type: Number, required: true, default: 1 },
		email: { type: String, required: true, unique: true, index: true },
		username: { type: String, required: true, unique: true, index: true },
		displayName: { type: String, required: true, maxlength: 100 },
		avatar: { type: String, maxlength: 1000 },
		banner: {
			type: String,
			maxlength: 1000,
			default: "https://devit-files.s3.amazonaws.com/profile-banner",
		},
		isAlumnus: { type: Boolean, default: false },
		isActivated: { type: Boolean, default: false },
		gender: { type: String, enum: ["MALE", "FEMALE", "OTHERS"] },
		batchYear: { type: String, required: true, maxlength: 10 },
		roomAddress: { type: String, maxlength: 100 },
		phoneNumber: { type: String, maxlength: 10 },
		bio: { type: String, maxlength: 1000 },
		repositories: [{ type: String }],
		githubURL: { type: String },
		linkedInURL: { type: String },
		socialLinks: [{ type: String }],
		experiences: [
			{
				type: {
					uuid: { type: String, required: true },
					title: { type: String, maxlength: 100 },
					company: { type: String, maxlength: 100 },
					description: { type: String, maxlength: 1000 },
					isCurrent: { type: Boolean, default: false },
					startDate: { type: Date },
					endDate: { type: Date },
				},
			},
		],
		joinedRooms: [{ type: Types.ObjectId, ref: "Room" }],
		followingTags: [{ type: Types.ObjectId, ref: "Tag" }],
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", User);
