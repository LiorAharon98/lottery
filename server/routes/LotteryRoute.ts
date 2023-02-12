import express = require("express");
import LotteryModel = require("../models/LotteryModel");
const router = express.Router();
const createNumbers = () => {
  let tempArr: { number: number; special: boolean }[] = [];
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
const currentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
const createTime = async()=>{
  const currentTime = currentDate();
  const currentDay = new Date().getDay();
  const findLottery = await LotteryModel.findOne({ lotteryDate: currentTime });
  if (currentDay === 0 || (currentDay === 3 && !findLottery)) {
    const lotteryNumbers = { lotteryNumbers: createNumbers(), lotteryDate: currentTime };
    await LotteryModel.create(lotteryNumbers);
  }

}
createTime()
router.get("/lottery-page", async (req, res) => {
  const lastLottery = await LotteryModel.findOne({}).sort({ _id: -1 });

  res.json(lastLottery);
});
router.get("/latest-lottery", async(req,res)=>{
  const allLottery = await LotteryModel.find()
res.json(allLottery)
})

export default router;
