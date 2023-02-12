import express = require("express");
import mongoose = require("mongoose");
import UserRoute from "./routes/UserRoute"
import LotteryRoute from "./routes/LotteryRoute"
const app = express();
const serverConfig = require("./config");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
serverConfig(app,express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);
app.listen(process.env.PORT);
