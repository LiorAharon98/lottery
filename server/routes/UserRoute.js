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
      const userWithoutPassword = await UserModal.findOne({ username }, "-password");
      return res.json(userWithoutPassword);
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
  res.json(user.lotteryNumbers);
});
router.put("/lottery-page", async (req, res) => {
  const { username, number, date } = req.body;
  const user = await UserModal.findOneAndUpdate(
    { username },
    { $inc: { earned: number }, $set: { latestWin: { number, date } } },
    { new: true }
  );
  res.json({ earned: user.earned, latestWin: user.latestWin });
});
router.put("/user-setting", async (req, res) => {
  const { username, profilePicture } = req.body;
  const user = await UserModal.findOneAndUpdate({ username }, { profilePicture }, { new: true });
  res.json(user.profilePicture);
});

router.put("/user/bank", async (req, res) => {
  const { username } = req.body;
  const user = await UserModal.findOneAndUpdate({ username }, { $set: { bank: true } }, { new: true });
  res.json(user.bank);
});
router.post("/user-setting", async (req, res) => {
  const { username, passwordToChange } = req.body;
  const salt = await bcrypt.genSalt();
  const newPassword = await bcrypt.hash(passwordToChange, salt);
  await UserModal.findOneAndUpdate({ username }, { password: newPassword }, { new: true });
});

module.exports = router;
