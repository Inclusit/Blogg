import { Schema, model } from "mongoose";
import moment from "moment";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        blogPost: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.createdAt = moment(ret.createdAt).format("YYYY-MM-DD HH:mm");
    ret.updatedAt = moment(ret.updatedAt).format("YYYY-MM-DD HH:mm");
    return ret;
  },
});

export default model("Comment", commentSchema);
