const { Schema, model, Types } = require("mongoose");

const Like = new Schema(
	{
		user: { type: Types.ObjectId, ref: "User", index: true },
		post: { type: Types.ObjectId, ref: "Post", index: true },
		comment: { type: Types.ObjectId, ref: "Comment", index: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Like", Like);
