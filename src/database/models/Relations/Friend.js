const { Schema, model, Types } = require("mongoose");

const Friend = new Schema(
	{
		user1: { type: Types.ObjectId, ref: "User", index: true },
		user2: { type: Types.ObjectId, ref: "User", index: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Friend", Friend);
