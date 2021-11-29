const { Schema, model, Types } = require("mongoose");

const Message = new Schema(
	{
		content: { type: String, required: true },
		attachments: [{ type: String }],
		isAccepted: { type: Boolean },
		channel: { type: Types.ObjectId, ref: "Channel", index: true },
		question: { type: Types.ObjectId, ref: "Question", index: true },
		createdBy: { type: Types.ObjectId, ref: "User", index: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Channel", Message);
