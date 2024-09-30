const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_url: { type: String, required: true },
  },
  { collection: "user-data" },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
