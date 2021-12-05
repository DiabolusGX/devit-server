const { Schema, model, Types } = require("mongoose");

const Friend = new Schema(
	{
		from: { type: Types.ObjectId, ref: "User", index: true },
		to: { type: Types.ObjectId, ref: "User", index: true },
		accepted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Friend", Friend);
