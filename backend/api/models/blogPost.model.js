import { Schema, model } from "mongoose";
import moment from "moment";

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      /*  required: true, */
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

blogPostSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.createdAt = moment(ret.createdAt).format("YYYY-MM-DD HH:mm");
    ret.updatedAt = moment(ret.updatedAt).format("YYYY-MM-DD HH:mm");
    return ret;
  },
});

export default model("BlogPost", blogPostSchema);
