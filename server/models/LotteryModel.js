const mongoose = require("mongoose")
const lotteryNumbers = new mongoose.Schema({
  lotteryNumbers: Array,
  lotteryDate : String,
  id : Number
});

const LotteryModel = mongoose.model("lottery", lotteryNumbers);
module.exports = LotteryModel;
