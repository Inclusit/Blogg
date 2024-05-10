import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        (password) => password.length >= 6,
        "Password must be at least 6 characters long",
      ],
    },
    email: {
      type: String,
      /*  unique: true, */
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (user.isModified("password") || user.isNew) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default model("User", userSchema);
