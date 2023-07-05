const express = require("express");
const LotteryModel = require("../models/LotteryModel");
const router = express.Router();

router.get("/latest-lottery", async (req, res) => {
  const lastLottery = await LotteryModel.findOne({}).sort({ _id: -1 });
  res.json(lastLottery);
});
router.get("/all-lottery", async (req, res) => {
  const allLottery = await LotteryModel.find({}).sort({ id: -1 });
  res.json(allLottery);
});

module.exports = router;
