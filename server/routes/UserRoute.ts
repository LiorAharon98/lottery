import express = require("express");
import UserModal = require("../models/UserModel");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  const existUser = await UserModal.findOne({ username, password });
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
router.put("/create-user", async (req, res) => {
  const { arr, username } = req.body;
  const user = await UserModal.findOneAndUpdate({ username }, { $push: { lotteryNumbers: arr } }, { new: true });
  res.json(user);
});
router.put("/lottery-page", async (req, res) => {
  const { username, number } = req.body;
  const user = await UserModal.findOneAndUpdate({ username }, { $inc: { earned: number } }, { new: true });
  res.json(user);
});

export default router;
