const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");
const LotteryRoute = require("./routes/LotteryRoute");
const createLottery = require("./createLottery");
const app = express();
const serverConfig = require("./config");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
serverConfig(app, express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);

createLottery();

app.listen(process.env.PORT);
