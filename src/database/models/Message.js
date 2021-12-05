const { Schema, model, Types } = require("mongoose");

const Message = new Schema(
    {
        from: { type: Types.ObjectId, ref: "User", index: true },
        to: { type: Types.ObjectId, ref: "User", index: true },
        starred: { type: Boolean, default: false },
        content: { type: String, required: true },
        attachments: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Message", Message);
