const express = require("express");
const LotteryModel = require("../models/LotteryModel");
const router = express.Router();

router.get("/lottery-page", async (req, res) => {
  const lastLottery = await LotteryModel.findOne({}).sort({ _id: -1 });
  res.json(lastLottery);
});
router.get("/latest-lottery", async (req, res) => {
  const allLottery = await LotteryModel.find({});
  res.json(allLottery);
});

module.exports = router;
