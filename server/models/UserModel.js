const mongoose =require("mongoose")
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  earned: Number,
  memberSince: String,
  profilePicture : String,
  latestWin : Object,
  lotteryNumbers: Array,

});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
