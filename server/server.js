const express = require("express")
const mongoose = require("mongoose")
const UserRoute = require("./routes/UserRoute")
const LotteryRoute = require("./routes/LotteryRoute.js")
const app = express();
const serverConfig = require("./config.js")
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
serverConfig(app,express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);
app.listen(process.env.PORT);
