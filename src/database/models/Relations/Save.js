const { Schema, model, Types } = require("mongoose");

const Save = new Schema(
	{
		user: { type: Types.ObjectId, ref: "User", index: true },
		post: { type: Types.ObjectId, ref: "Post", index: true },
		question: { type: Types.ObjectId, ref: "Question", index: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Save", Save);
