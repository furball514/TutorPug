const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uniqueID: String,
    accessToken: String,
    refreshToken: String,
    provider: String,
    firstName: String,
    lastName: String,
    dp: String,
    website: String
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
