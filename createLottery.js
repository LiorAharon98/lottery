const LotteryModel = require("./models/LotteryModel");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
const currentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const createNumbers = () => {
  let tempArr = [];
  let randomNumber;
  let specialNum = { number: Math.floor(Math.random() * 7) + 1, special: true };
  if (specialNum.number === 0) specialNum = { number: Math.floor(Math.random() * 7) + 1, special: true };
  for (let i = 0; i < 6; i++) {
    let add = true;
    randomNumber = { number: Math.floor(Math.random() * 36) + 1, special: false };

    for (let y = 0; y < 36; y++) {
      if (tempArr[y]?.number == randomNumber.number) {
        add = false;
      }
    }
    if (add) {
      tempArr.push(randomNumber);
    } else {
      i--;
    }
  }
  tempArr.push(specialNum);
  return tempArr;
};

const createTime = async () => {
  const currentTime = currentDate();
  const currentDay = new Date().getDay();
  const findLottery = await LotteryModel.findOne({ lotteryDate: currentTime });
  if (findLottery) return;
  const allLottery = await LotteryModel.find({});
  if (currentDay === 0 || currentDay === 3) {
    const lotteryNumbers = { lotteryNumbers: createNumbers(), lotteryDate: currentTime, id: allLottery.length };
    await LotteryModel.create(lotteryNumbers);
  }
};
createTime();
