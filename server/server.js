const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");
const LotteryRoute = require("./routes/LotteryRoute");
const createLottery = require("./createLottery");
const app = express();
app.get("/", (req, res) => {
    res.status(200).send("API is alive and healthy!");
});
const serverConfig = require("./config");
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.NODE_ENV === "production" ? process.env.PRODUCTION_MONGODB_URI : process.env.LOCAL_MONGODB_URI
);
serverConfig(app, express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);
createLottery();

app.listen(process.env.PORT,()=>{
  console.log('Server up, version 2.0!')
});
