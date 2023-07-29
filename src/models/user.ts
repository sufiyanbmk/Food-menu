import mongoose, { Schema, model } from "mongoose";
import { encryptPassword } from "../helper/authHelper";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "please add a user name"],
    maxlength: 32,
  },
  email: {
    type: String,
    required: [true, "please add a email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: 10,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await encryptPassword(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = model("User", userSchema, "users");

export default User;
