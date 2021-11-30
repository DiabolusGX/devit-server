const { Schema, model, Types } = require("mongoose");

const Tag = new Schema(
	{
		name: { type: String, required: true, unique: true, index: true },
		topic: { type: String, required: true },
		typeID: { type: Types.ObjectId, ref: "TagType" },
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

Tag.virtual("type", {
	ref: "TagType",
	localField: "typeID",
	foreignField: "_id",
});

module.exports = model("Tag", Tag);
