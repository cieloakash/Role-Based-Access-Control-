import mongoose from "mongoose";
const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "logistic", "sales"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", user);
export default User;
