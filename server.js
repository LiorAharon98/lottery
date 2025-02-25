
const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");
const LotteryRoute = require("./routes/LotteryRoute");
const app = express();
const serverConfig = require("./config");
mongoose.set("strictQuery", false);
mongoose.connect(
  (process.env.NODE = "development" ? process.env.LOCAL_MONGODB_URI : process.env.PRODUCTION_MONGODB_URI)
);
serverConfig(app, express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);
app.listen(process.env.PORT);

