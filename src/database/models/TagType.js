const { Schema, model, Types } = require("mongoose");

const TagType = new Schema(
	{
		name: { type: String, required: true, unique: true, index: true },
		topic: { type: String, required: true },
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

TagType.virtual("tags", {
	ref: "Tag",
	localField: "name",
	foreignField: "typeID",
});

module.exports = model("TagType", TagType);
