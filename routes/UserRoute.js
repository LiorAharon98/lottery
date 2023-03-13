const UserModal = require("../models/UserModel.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/sign-up", async (req, res) => {
  const { username } = req.body;

  const existUser = await UserModal.findOne({ username });
  if (existUser) return res.json(false);
  const user = await UserModal.create(req.body);

  res.json(user);
});

router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModal.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return res.json(user);
    }
  }
  return res.json(null);
});
router.put("/create-user-lottery-numbers", async (req, res) => {
  const { arr, username } = req.body;
  const user = await UserModal.findOneAndUpdate(
    { username },
    { $set: { lotteryNumbers: { firstColumn: arr[0], secondColumn: arr[1] } } },
    { new: true }
  );
  res.json(user);
});
router.put("/lottery-page", async (req, res) => {
  const { username, number, date } = req.body;
  const user = await UserModal.findOneAndUpdate(
    { username },
    { $inc: { earned: number }, $set: { latestWin: { number, date } } },
    { new: true }
  );
  res.json(user);
});
router.put("/user-setting", async (req, res) => {
  const { username, profilePicture } = req.body;
  const user = await UserModal.findOneAndUpdate({ username }, { profilePicture }, { new: true });
  res.json(user);
});

module.exports = router;
