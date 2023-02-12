import mongoose from "mongoose";
const lotteryNumbers = new mongoose.Schema({
  lotteryNumbers: Array,
  lotteryDate : String
});

const LotteryModel = mongoose.model("lottery", lotteryNumbers);
export = LotteryModel;
